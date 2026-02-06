"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: {
    exterior: string[];
    interior: string[];
  };
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [viewMode, setViewMode] = useState<"exterior" | "interior">("exterior");
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentImages = images[viewMode];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % currentImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] bg-secondary/10 flex flex-col group overflow-hidden">
      
      {/* View Mode Switcher (Floating) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-background/90 backdrop-blur border border-border rounded-full p-1 flex shadow-lg">
        <button
          onClick={() => { setViewMode("exterior"); setCurrentIndex(0); }}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
            viewMode === "exterior" 
              ? "bg-foreground text-background shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Eye className="w-4 h-4" />
          Exterior
        </button>
        <button
          onClick={() => { setViewMode("interior"); setCurrentIndex(0); }}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
            viewMode === "interior" 
              ? "bg-foreground text-background shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Layers className="w-4 h-4" />
          Interior (SPS)
        </button>
      </div>

      {/* Main Image Area */}
      <div className="flex-1 relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${currentIndex}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full flex items-center justify-center p-8 md:p-16"
          >
            {/* Actual Image */}
            <div className="w-full h-full flex items-center justify-center rounded-lg overflow-hidden shadow-2xl">
               <img 
                 src={currentImages[currentIndex]} 
                 alt={`${viewMode} view ${currentIndex + 1}`}
                 className="w-full h-full object-cover"
               />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 hover:bg-background border border-border opacity-0 group-hover:opacity-100 transition-opacity"
        >
            <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 hover:bg-background border border-border opacity-0 group-hover:opacity-100 transition-opacity"
        >
            <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {currentImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              idx === currentIndex ? "bg-foreground w-6" : "bg-foreground/20 hover:bg-foreground/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
