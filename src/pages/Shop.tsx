
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/providers/CartProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define product type
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  featured?: boolean;
  bestseller?: boolean;
};

// Mock product data
const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Classic Bamboo Brush",
    price: 24.99,
    image: "/images/brush1.jpg",
    category: "Brushes",
    description: "Traditional bamboo calligraphy brush with horsehair bristles for precise strokes.",
    featured: true,
  },
  {
    id: "2",
    name: "Premium Ink Set",
    price: 39.99,
    image: "/images/ink-set.jpg",
    category: "Inks",
    description: "Set of 5 premium calligraphy inks in rich, vibrant colors that flow smoothly.",
    featured: true,
    bestseller: true,
  },
  {
    id: "3",
    name: "Japanese Calligraphy Paper",
    price: 19.99,
    image: "/images/paper.jpg",
    category: "Paper",
    description: "High-quality absorbent paper specifically designed for calligraphy practice.",
    featured: true,
  },
  {
    id: "4",
    name: "Wooden Pen Holder",
    price: 15.99,
    image: "/images/holder.jpg",
    category: "Tools",
    description: "Elegant wooden pen holder with brass detailing for storing your calligraphy tools.",
  },
  {
    id: "5",
    name: "Modern Calligraphy Pen Set",
    price: 34.99,
    image: "/images/pen-set.jpg",
    category: "Pens",
    description: "Contemporary calligraphy pen set with multiple interchangeable nibs.",
    bestseller: true,
  },
  {
    id: "6",
    name: "Calligraphy Learning Guide",
    price: 29.99,
    image: "/images/guide.jpg",
    category: "Books",
    description: "Comprehensive step-by-step guide to mastering both traditional and modern calligraphy styles.",
  },
  {
    id: "7",
    name: "Artisanal Red Ink",
    price: 12.99,
    image: "/images/red-ink.jpg",
    category: "Inks",
    description: "Rich vermillion ink made using traditional methods for vibrant red calligraphy.",
  },
  {
    id: "8",
    name: "Handcrafted Wooden Box",
    price: 49.99,
    image: "/images/box.jpg",
    category: "Tools",
    description: "Beautifully crafted wooden box for storing your precious calligraphy supplies safely.",
  },
  {
    id: "9",
    name: "Fine-Tip Brush Pen Set",
    price: 22.99,
    image: "/images/brush-pen.jpg",
    category: "Pens",
    description: "Set of 6 brush pens with fine tips for delicate calligraphy work and illustrations.",
    bestseller: true,
  },
];

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const { addItem } = useCart();

  // Get unique categories for the filter
  const categories = ["all", ...new Set(PRODUCTS.map(p => p.category))];

  // Filter products based on search and category
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "featured":
      default:
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        if (a.bestseller && !b.bestseller) return -1;
        if (!a.bestseller && b.bestseller) return 1;
        return 0;
    }
  });

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="container py-10">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Shop</h1>
          <p className="text-muted-foreground">
            Browse our collection of premium calligraphy products
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 pb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="product-card group">
                <Link to={`/shop/${product.id}`} className="block">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    {product.bestseller && (
                      <Badge className="absolute top-2 right-2 bg-primary">Bestseller</Badge>
                    )}
                  </div>
                </Link>
                
                <div className="p-4 space-y-2">
                  <Link to={`/shop/${product.id}`} className="block">
                    <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-semibold">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl">No products found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setCategory("all");
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
