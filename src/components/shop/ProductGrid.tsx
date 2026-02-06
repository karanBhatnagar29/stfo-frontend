"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const products = [
  {
    id: "carry-on",
    name: "The Carry-On",
    description: "Perfect for 3-5 days. Fits in the overhead bin.",
    price: "$295",
    color: "bg-[#e5e5e5]", // Neutral Light Gray
    link: "/products/carry-on",
    imagePlaceholder: "linear-gradient(to bottom right, #f5f5f5, #e0e0e0)"
  },
  {
    id: "check-in",
    name: "The Check-In",
    description: "For longer trips. Maximum capacity, minimum bulk.",
    price: "$395",
    color: "bg-[#27272a]", // Dark Gray
    textColor: "text-white",
    link: "/products/check-in",
    imagePlaceholder: "linear-gradient(to bottom right, #333, #111)"
  },
  {
    id: "sps-kit",
    name: "SPS™ Packing Kit",
    description: "The complete modular system. Fits both sizes.",
    price: "$95",
    color: "bg-[#f4f4f5]", // Off-white
    link: "/products/sps-system",
    imagePlaceholder: "linear-gradient(to bottom right, #fafafa, #f0f0f0)"
  }
];

export function ProductGrid() {
  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
                The Collection.
            </h2>
            <Link href="/products" className="hidden md:flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                View all products <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl aspect-[4/5] cursor-pointer"
            >
              <Link href={product.link} className="absolute inset-0 z-10">
                <span className="sr-only">View {product.name}</span>
              </Link>
              
              {/* Background */}
              <div 
                className={`absolute inset-0 transition-transform duration-700 group-hover:scale-105 ${product.color}`} 
                style={{ background: product.imagePlaceholder }}
              />

              {/* Texture/Noise overlay for premium feel */}
              <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
              
              <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                <div>
                    <h3 className={`text-2xl font-semibold tracking-tight ${product.textColor || 'text-foreground'}`}>
                        {product.name}
                    </h3>
                    <p className={`mt-2 text-sm font-medium opacity-70 ${product.textColor || 'text-foreground'}`}>
                        {product.description}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <span className={`text-base font-semibold ${product.textColor || 'text-foreground'}`}>
                        {product.price}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                         <ArrowRight className={`w-4 h-4 ${product.textColor || 'text-foreground'}`} />
                    </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
            <Link href="/products" className="inline-flex items-center text-sm font-medium text-foreground">
                View all products <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </div>
      </div>
    </section>
  );
}
