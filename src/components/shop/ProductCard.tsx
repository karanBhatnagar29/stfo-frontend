"use client";

import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  tagline: string;
}

export function ProductCard({ name, price, image, slug, tagline }: ProductCardProps) {
  return (
    <Link href={`/products/${slug}`} className="group block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative flex flex-col h-full rounded-xl overflow-hidden bg-white border border-border hover:border-accent/40 transition-all duration-500 hover:shadow-xl hover:shadow-accent/20"
      >
        {/* Image Area */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center">
          <img 
            src={image} 
            alt={name}
            crossOrigin="anonymous"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <button className="bg-white/95 hover:bg-white text-foreground px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all backdrop-blur-sm">
              <span>View Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
              <Check className="w-3 h-3" />
              Premium
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-accent transition-colors mb-1">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{tagline}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <span className="text-xl font-bold text-foreground">${price}</span>
            <motion.div
              whileHover={{ x: 4 }}
              className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent transition-all"
            >
              <ArrowUpRight className="w-4 h-4 text-accent group-hover:text-white transition-colors" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
