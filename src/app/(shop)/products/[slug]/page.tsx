import { ProductGallery } from "@/components/shop/ProductGallery";
import { PackingConfidence } from "@/components/sps/PackingConfidence";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function ProductPage({ params }: { params: { slug: string } }) {
  // Mock Data
  const product = {
    name: "The Carry-On Pro",
    price: 395,
    description: "Built with aerospace-grade polycarbonate and our signature Smart Packing System™ (SPS). Designed to fit 99% of airline sizers globally.",
    colors: ["Obsidian Black", "Slate Grey", "Nebula White"],
    specs: [
        { label: "Weight", value: "7.1 lbs" },
        { label: "Capacity", value: "39L" },
        { label: "Dimensions", value: "21.7 x 13.7 x 9 in" },
    ]
  };

  const images = {
    exterior: [
        `https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&q=80&w=800`,
        `https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=800`,
        `https://images.unsplash.com/photo-1595185984262-63025287be12?auto=format&fit=crop&q=80&w=800`
    ],
    interior: [
        `https://images.unsplash.com/photo-1581553680321-f8659d646b5a?auto=format&fit=crop&q=80&w=800`,
        `https://images.unsplash.com/photo-1628148873092-233edc8cb81d?auto=format&fit=crop&q=80&w=800`
    ]
  };

  return (
    <div className="min-h-screen">
       {/* Breadcrumb / Back */}
       <div className="container mx-auto px-6 py-4">
           <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
               <ArrowLeft className="w-4 h-4 mr-2" />
               Back to Collection
           </Link>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-12 lg:pr-12">
           
           {/* Left: Gallery (Sticky on Desktop) */}
           <div className="lg:col-span-8 bg-secondary/5">
                <div className="sticky top-24">
                    <ProductGallery images={images} />
                </div>
           </div>

           {/* Right: Details */}
           <div className="lg:col-span-4 py-12 px-6 lg:px-0 flex flex-col gap-10">
               
               {/* Title & Price */}
               <div className="space-y-4 border-b border-border pb-8">
                   <div className="flex justify-between items-start">
                       <div>
                            <span className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2 block">Series One</span>
                            <h1 className="text-4xl font-black tracking-tight">{product.name}</h1>
                       </div>
                       <span className="text-2xl font-light">${product.price}</span>
                   </div>
                   <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>
               </div>

               {/* Color Selection */}
               <div>
                   <label className="text-xs font-bold tracking-widest uppercase mb-4 block">Select Finish</label>
                   <div className="flex gap-4">
                       {product.colors.map((color, i) => (
                           <button key={i} className="group relative">
                               <div className={`w-12 h-12 rounded-full border-2 border-transparent transition-all hover:scale-105 ${i === 0 ? 'bg-black' : i === 1 ? 'bg-slate-500' : 'bg-gray-100 border-gray-300'}`} />
                               <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                   {color}
                               </span>
                           </button>
                       ))}
                   </div>
               </div>

               {/* Actions */}
               <div className="flex flex-col gap-4">
                   <button className="w-full h-14 bg-foreground text-background font-bold text-lg rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                       <ShoppingBag className="w-5 h-5" />
                       Add to Cart
                   </button>
                   <p className="text-center text-xs text-muted-foreground">Free shipping & 100-day trial included.</p>
               </div>

               {/* Confidence Logic */}
               <PackingConfidence />

               {/* Specs */}
               <div className="bg-secondary/20 rounded-xl p-6">
                   <h3 className="font-bold text-sm mb-4">Technical Specifications</h3>
                   <div className="space-y-3">
                       {product.specs.map((spec, i) => (
                           <div key={i} className="flex justify-between text-sm border-b border-border/50 pb-2 last:border-0 last:pb-0">
                               <span className="text-muted-foreground">{spec.label}</span>
                               <span className="font-medium">{spec.value}</span>
                           </div>
                       ))}
                   </div>
               </div>

           </div>
       </div>
    </div>
  );
}
