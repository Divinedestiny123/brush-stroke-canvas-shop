
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Map, Users, Award, Clock, MapPin, Mail, Phone } from "lucide-react";
import workShop from '../assets/workshop.jpeg';
import me from '../assets/divine.jpg';
import calligraph1 from '../assets/calligrapher1.jpeg';
import calligraph2 from '../assets/calligrapher2.jpeg';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-secondary/20 py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-primary brush-stroke">BrushStroke</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We're passionate about preserving and promoting the art of calligraphy
              in the digital age. Our mission is to provide high-quality tools and resources
              for calligraphers of all levels.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="mb-4">
                BrushStroke was founded in 2018 by a group of calligraphy enthusiasts who were 
                frustrated by the lack of quality tools and resources available to modern artists.
                What started as a small online shop has grown into a community of passionate 
                calligraphers, sharing knowledge and celebrating the beauty of written art.
              </p>
              <p className="mb-4">
                We believe that in a world dominated by digital communication, the art of
                beautiful handwriting is more important than ever. There's something deeply
                personal and meaningful about a handwritten letter, a hand-drawn card, or a
                piece of calligraphic art that no digital message can replicate.
              </p>
              <p>
                Our team personally tests and selects every product we sell, ensuring that
                we only offer tools that meet our high standards of quality and performance.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent blur-xl opacity-30 rounded-lg"></div>
              <img
                src={workShop}
                alt="Calligraphy workshop"
                className="rounded-lg relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center border">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We source the finest materials and work with skilled artisans to bring you exceptional products.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center border">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Community</h3>
              <p className="text-muted-foreground">
                We foster a supportive environment where calligraphers can learn, share, and grow together.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center border">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Tradition</h3>
              <p className="text-muted-foreground">
                We honor traditional techniques while embracing modern innovations in calligraphy.
              </p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-sm flex flex-col items-center text-center border">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Map className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to eco-friendly practices and responsibly sourced materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg overflow-hidden shadow-sm border">
              <img
                src={me}
                alt="Divine"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-xl">Divine-Destiny</h3>
                <p className="text-primary mb-2">Founder & Master Calligrapher</p>
                <p className="text-muted-foreground text-sm">
                  With over 15 years of experience in traditional East Asian calligraphy, 
                  Divine brings both expertise and passion to the BrushStroke community.
                </p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg overflow-hidden shadow-sm border">
              <img
                src={calligraph1}
                alt="Marcus Johnson"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-xl">Marcus Johnson</h3>
                <p className="text-primary mb-2">Creative Director</p>
                <p className="text-muted-foreground text-sm">
                  Marcus blends his background in graphic design with his love for modern 
                  calligraphy to curate our product selection and educational content.
                </p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg overflow-hidden shadow-sm border">
              <img
                src={calligraph2}
                alt="Leila Patel"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-xl">Leila Patel</h3>
                <p className="text-primary mb-2">Workshop Coordinator</p>
                <p className="text-muted-foreground text-sm">
                  Leila organizes our in-person and virtual workshops, bringing together 
                  talented artists to share their knowledge with our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-3xl font-bold mb-6">Visit Our Studio</h2>
              <p className="mb-6">
                We're more than just an online shop. Visit our studio in Portland to
                see our products in person, attend workshops, or just chat with fellow
                calligraphy enthusiasts.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">BrushStroke Studio</p>
                    <p className="text-muted-foreground">
                      21 Murtala Mohammed Highway<br />
                      calabar.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <p>hello@brushstroke.com</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <p>+234 814 513 6317</p>
                </div>
              </div>
              
              <Button asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
            
            <div className="h-[400px] bg-card rounded-lg overflow-hidden shadow-sm border relative">
              {/* Embed an iframe with a map here */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31797.66113598129!2d8.339236100939953!3d4.988158137188482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1saptech!5e0!3m2!1sen!2sng!4v1750252997302!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{border:0}}
                allowfullscreen
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Sign up for our newsletter to receive calligraphy tips, product updates,
            and special offers directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Button asChild size="lg" variant="secondary" className="flex-1">
              <Link to="/register">Sign Up</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="flex-1 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
