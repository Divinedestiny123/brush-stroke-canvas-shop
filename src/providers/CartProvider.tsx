
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// Define the CartContext
const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("calligraphy-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse saved cart", e);
      }
    }
  }, []);
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("calligraphy-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (newItem) => {
    setItems((prevItems) => {
      // Check if item already exists
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      
      if (existingItem) {
        // Increment quantity if item already exists
        toast.success(`Added another ${newItem.name} to cart`);
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        toast.success(`Added ${newItem.name} to cart`);
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeItem = (id) => {
    const itemToRemove = items.find(item => item.id === id);
    if (itemToRemove) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      toast.success(`Removed ${itemToRemove.name} from cart`);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success("Cart cleared");
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
