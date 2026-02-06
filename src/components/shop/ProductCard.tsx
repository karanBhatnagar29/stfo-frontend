"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
    <Link href={`/products/${slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary/10 mb-4">
        {/* Image Placeholder */}
        <div className="absolute inset-0 bg-secondary/20 transition-transform duration-700 ease-out group-hover:scale-105">
           <img 
             src={image} 
             alt={name} 
             className="w-full h-full object-cover"
           />
        </div>
        
        {/* Overlay Action */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-background/80 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-2 border border-border/50">
                <span className="text-sm font-medium">View SPS Logic</span>
                <ArrowUpRight className="w-4 h-4" />
            </div>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold tracking-tight group-hover:underline underline-offset-4 decoration-1">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{tagline}</p>
        </div>
        <span className="text-sm font-medium">${price}</span>
      </div>
    </Link>
  );
}
