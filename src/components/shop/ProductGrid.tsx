"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: "carry-on",
    name: "HELIOS Carry-On",
    description: "3-5 day trips with smart organization",
    price: "$295",
    specs: "22\" x 14\" x 9\" | 8.2 lbs",
    color: "bg-gradient-to-br from-slate-300 to-slate-400",
    link: "/products/carry-on",
  },
  {
    id: "check-in",
    name: "HELIOS Check-In",
    description: "Extended travel with premium durability",
    price: "$395",
    specs: "28\" x 18\" x 11\" | 9.8 lbs",
    color: "bg-gradient-to-br from-amber-700 to-amber-900",
    textColor: "text-white",
    link: "/products/check-in",
  },
  {
    id: "sps-kit",
    name: "SPS™ Packing Kit",
    description: "Complete modular system for both sizes",
    price: "$95",
    specs: "9 Intelligent Packing Modules",
    color: "bg-gradient-to-br from-slate-100 to-slate-200",
    link: "/products/sps-system",
  }
];

export function ProductGrid() {
  return (
    <section className="py-24 md:py-40 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-3 text-balance">
                  Premium Luggage, Engineered Smart.
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Each piece designed for travelers who value intelligence and style.
              </p>
            </div>
            <Link href="/products" className="hidden md:inline-flex items-center gap-2 px-6 py-3 border border-foreground/20 rounded-lg hover:border-foreground/40 transition-colors">
                <span className="text-sm font-medium">All Products</span>
                <ArrowRight className="w-4 h-4" />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              className="group relative flex flex-col h-full rounded-xl overflow-hidden bg-white border border-border hover:border-border/80 transition-all duration-500 hover:shadow-xl"
            >
              {/* Product Image Area */}
              <div className={`relative aspect-[3/4] overflow-hidden ${product.color} flex items-center justify-center`}>
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent)]" />
                
                {/* Minimalist product silhouette */}
                <div className="relative w-32 h-48 rounded-lg border-2 border-white/30 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white/40 text-4xl font-light">▢</span>
                </div>

                {/* Product badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-block px-3 py-1 bg-white/90 text-foreground text-xs font-semibold rounded-full">
                    Best Seller
                  </span>
                </div>

                {/* Hover overlay with CTA */}
                <Link href={product.link} className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 bg-black/20">
                  <button className="px-6 py-3 bg-white text-foreground font-semibold rounded-lg hover:bg-white/90 transition-colors w-full">
                    View Details
                  </button>
                </Link>
              </div>

              {/* Product Info */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className={`text-xl font-bold tracking-tight mb-2 ${product.textColor || 'text-foreground'}`}>
                    {product.name}
                  </h3>
                  <p className={`text-sm mb-4 ${product.textColor ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {product.description}
                  </p>
                  <p className={`text-xs font-medium tracking-wide ${product.textColor ? 'text-white/60' : 'text-muted-foreground/60'}`}>
                    {product.specs}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <span className={`text-2xl font-bold ${product.textColor || 'text-foreground'}`}>
                    {product.price}
                  </span>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all"
                  >
                    <ArrowRight className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center md:hidden">
            <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-lg font-semibold hover:bg-foreground/90 transition-colors">
                View all products <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
      </div>
    </section>
  );
}
