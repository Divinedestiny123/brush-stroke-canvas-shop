
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  ChevronLeft,
  Minus,
  Plus,
  Heart,
  Share2,
  Star,
  Package,
  Truck,
  RefreshCcw,
} from "lucide-react";
import { toast } from "sonner";

// Mock product data - same as in Shop.tsx
const PRODUCTS = [
  {
    id: "1",
    name: "Classic Bamboo Brush",
    price: 24.99,
    image: "/images/brush1.jpg",
    category: "Brushes",
    description: "Traditional bamboo calligraphy brush with horsehair bristles for precise strokes.",
    longDescription: "This beautifully crafted bamboo brush features authentic horsehair bristles that provide excellent ink retention and stroke control. The lightweight bamboo handle offers perfect balance for both beginners and experienced calligraphers. Each brush is handmade by skilled artisans using traditional techniques passed down through generations.",
    rating: 4.8,
    reviews: 124,
    stock: 35,
  },
  {
    id: "2",
    name: "Premium Ink Set",
    price: 39.99,
    image: "/images/ink-set.jpg",
    category: "Inks",
    description: "Set of 5 premium calligraphy inks in rich, vibrant colors that flow smoothly.",
    longDescription: "Elevate your calligraphy with this set of five premium inks. Each ink is carefully formulated to provide consistent flow and exceptional color saturation. The set includes classic black, deep blue, rich burgundy, forest green, and royal purple. Our inks are water-resistant once dry and suitable for archival purposes.",
    rating: 4.9,
    reviews: 89,
    stock: 20,
  },
  // More products...
  {
    id: "3",
    name: "Japanese Calligraphy Paper",
    price: 19.99,
    image: "/images/paper.jpg",
    category: "Paper",
    description: "High-quality absorbent paper specifically designed for calligraphy practice.",
    longDescription: "This authentic Japanese calligraphy paper provides the ideal surface for both Western and Eastern calligraphy styles. The carefully balanced absorbency prevents ink from bleeding while allowing for crisp, clean lines. Each sheet is acid-free and made from sustainable materials, ensuring your artwork will stand the test of time.",
    rating: 4.7,
    reviews: 56,
    stock: 100,
  },
  {
    id: "4",
    name: "Wooden Pen Holder",
    price: 15.99,
    image: "/images/holder.jpg",
    category: "Tools",
    description: "Elegant wooden pen holder with brass detailing for storing your calligraphy tools.",
    longDescription: "This beautifully crafted wooden pen holder features elegant brass detailing and multiple compartments designed specifically for organizing your calligraphy tools. The rich walnut finish adds a touch of sophistication to your workspace while the non-slip base ensures stability. A perfect addition to any calligrapher's collection.",
    rating: 4.6,
    reviews: 42,
    stock: 15,
  },
  {
    id: "5",
    name: "Modern Calligraphy Pen Set",
    price: 34.99,
    image: "/images/pen-set.jpg",
    category: "Pens",
    description: "Contemporary calligraphy pen set with multiple interchangeable nibs.",
    longDescription: "Our modern calligraphy pen set includes one premium pen holder and six interchangeable nibs designed for various calligraphy styles. The ergonomic grip ensures comfort during extended use while the high-quality steel nibs offer exceptional flexibility and control. Perfect for beginners and professionals alike seeking versatility in their calligraphy.",
    rating: 4.9,
    reviews: 78,
    stock: 25,
  },
];

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product by ID
  const product = PRODUCTS.find(p => p.id === productId);
  
  // If product not found, redirect to shop
  if (!product) {
    navigate("/shop");
    return null;
  }
  
  const incrementQuantity = () => {
    if (quantity < (product.stock || 10)) {
      setQuantity(quantity + 1);
    } else {
      toast.warning(`Sorry, only ${product.stock} items available`);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };
  
  return (
    <div className="container py-10">
      <Button
        variant="ghost"
        className="mb-6 flex items-center gap-2"
        onClick={() => navigate("/shop")}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Shop
      </Button>
      
      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-xl border bg-card">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-3xl font-semibold">${product.price.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {product.stock > 10 ? "In Stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of Stock"}
            </p>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-muted-foreground">
              {product.longDescription || product.description}
            </p>
          </div>
          
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={incrementQuantity}
                disabled={quantity >= (product.stock || 10)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              onClick={handleAddToCart}
              className="flex-1 flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Product Features */}
          <div className="border-t pt-6 mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4">
              <Package className="h-6 w-6 text-primary mb-2" />
              <h4 className="font-medium">Premium Quality</h4>
              <p className="text-xs text-muted-foreground">
                Authentic materials and craftsmanship
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <Truck className="h-6 w-6 text-primary mb-2" />
              <h4 className="font-medium">Fast Shipping</h4>
              <p className="text-xs text-muted-foreground">
                Free shipping on orders over $50
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <RefreshCcw className="h-6 w-6 text-primary mb-2" />
              <h4 className="font-medium">30-Day Returns</h4>
              <p className="text-xs text-muted-foreground">
                Satisfaction guaranteed or money back
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
