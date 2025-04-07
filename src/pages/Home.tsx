
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalligraphyCanvas } from "@/components/CalligraphyCanvas";
import { ArrowRight, ShoppingBag, Brush, Award } from "lucide-react";

export default function Home() {
  // Featured products to showcase on homepage
  const featuredProducts = [
    {
      id: "1",
      name: "Classic Bamboo Brush",
      price: 24.99,
      image: "/images/brush1.jpg",
    },
    {
      id: "2",
      name: "Premium Ink Set",
      price: 39.99,
      image: "/images/ink-set.jpg",
    },
    {
      id: "3",
      name: "Japanese Calligraphy Paper",
      price: 19.99,
      image: "/images/paper.jpg",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah L.",
      text: "The calligraphy tools I purchased here have totally transformed my practice. The quality is exceptional!",
      role: "Hobbyist Calligrapher",
    },
    {
      name: "Michael T.",
      text: "As a professional, I'm very selective about my materials. BrushStroke consistently delivers premium quality products.",
      role: "Professional Artist",
    },
    {
      name: "Jenna K.",
      text: "The interactive canvas feature helped me practice without wasting paper. I've improved so much!",
      role: "Art Student",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-secondary/20 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                The Art of Beautiful Writing
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Discover the Beauty of{" "}
                <span className="text-primary brush-stroke">Calligraphy</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Express yourself through the ancient art of calligraphy with our premium tools 
                and interactive learning experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="gap-2">
                  <Link to="/shop">
                    <ShoppingBag className="h-5 w-5" />
                    <span>Shop Now</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#try-calligraphy">
                    <Brush className="mr-2 h-5 w-5" />
                    Try It Now
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur-xl opacity-30 rounded-lg"></div>
              <img
                alt="Calligraphy art"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src="/images/hero.jpg"
                width="550"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button asChild variant="outline">
              <Link to="/shop" className="flex items-center gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/shop/${product.id}`}
                className="product-card group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-primary font-semibold">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Canvas */}
      <section id="try-calligraphy" className="py-16 bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Try Calligraphy Now</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Express your creativity with our interactive canvas. Practice your strokes, 
              explore different techniques, and discover the joy of digital calligraphy.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <CalligraphyCanvas />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <span className="inline-block">
              <Award className="h-10 w-10 text-primary mb-2 mx-auto" />
            </span>
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-lg shadow-sm border"
              >
                <p className="mb-4 italic text-muted-foreground">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Calligraphy Journey Today</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Browse our premium collection of handcrafted calligraphy tools and elevate your art.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/shop">Shop Our Collection</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
