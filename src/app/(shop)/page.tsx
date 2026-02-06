import { ProductHero } from "@/components/shop/ProductHero";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { PackingVisualizer } from "@/components/sps/PackingVisualizer";
import Link from "next/link";
import { Check, Truck, Shield, RotateCcw } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
        <ProductHero />
        <ProductGrid />
        
        {/* Trust & Benefits Section */}
        <section className="py-24 md:py-32 bg-secondary/30">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16 text-balance">
              Why Choose HELIOS?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: Check, title: "Premium Quality", desc: "Aircraft-grade aluminum with precision engineering" },
                { icon: Truck, title: "Free Shipping", desc: "On all orders over $200 worldwide" },
                { icon: Shield, title: "Lifetime Warranty", desc: "Complete coverage against manufacturing defects" },
                { icon: RotateCcw, title: "100-Day Returns", desc: "Risk-free trial period for your peace of mind" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PackingVisualizer />
        
        {/* Premium CTA Section */}
        <section className="py-32 bg-gradient-to-b from-accent/5 to-background">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Experience Intelligent Travel
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Join thousands of travelers who've upgraded to the world's first smart suitcase. 
              Packed with innovation, designed for simplicity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/products" 
                className="px-8 py-4 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-all hover:shadow-lg"
              >
                Shop Now
              </Link>
              <Link 
                href="/products/sps-system" 
                className="px-8 py-4 border-2 border-foreground text-foreground font-semibold rounded-lg hover:bg-foreground/5 transition-all"
              >
                Learn the System
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-16 pt-12 border-t border-border">
              <p className="text-sm text-muted-foreground mb-6">Trusted by travelers worldwide</p>
              <div className="flex justify-center items-center gap-8 flex-wrap">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">50K+</p>
                  <p className="text-xs text-muted-foreground">Happy Travelers</p>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">4.9★</p>
                  <p className="text-xs text-muted-foreground">Average Rating</p>
                </div>
                <div className="w-px h-12 bg-border"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">195</p>
                  <p className="text-xs text-muted-foreground">Countries Shipped</p>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
