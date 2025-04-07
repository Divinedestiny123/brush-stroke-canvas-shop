
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal, itemCount, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + shippingCost + tax;
  
  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code");
      return;
    }
    
    toast.error("Invalid coupon code");
    setCouponCode("");
  };
  
  const handleCheckout = () => {
    // In a real app, this would redirect to a payment processor
    toast.success("Proceeding to checkout...");
    // For demo purposes, we'll just clear the cart after 2 seconds
    setTimeout(() => {
      clearCart();
      toast.success("Thank you for your purchase!");
    }, 2000);
  };
  
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      
      {items.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-6 border-b">
                <Link to={`/shop/${item.id}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </Link>
                
                <div className="flex-grow space-y-1">
                  <Link to={`/shop/${item.id}`} className="hover:text-primary">
                    <h3 className="font-medium">{item.name}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">Item #{item.id}</p>
                  <p className="font-semibold">${item.price.toFixed(2)}</p>
                </div>
                
                <div>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 mt-2"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link to="/shop" className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
              
              <Button
                variant="outline"
                className="text-red-500"
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear your cart?")) {
                    clearCart();
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="bg-card p-6 rounded-lg border h-fit sticky top-20">
            <h2 className="font-semibold text-xl mb-4">Order Summary</h2>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Items ({itemCount}):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-green-500">FREE</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="pt-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyCoupon}>
                    Apply
                  </Button>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <Button
                className="w-full mt-4 flex items-center gap-2"
                onClick={handleCheckout}
              >
                <CreditCard className="h-4 w-4" />
                Proceed to Checkout
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-2">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-semibold mt-4">Your cart is empty</h2>
          <p className="text-muted-foreground mt-2">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button asChild className="mt-6">
            <Link to="/shop" className="flex items-center gap-2">
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
