import { ProductHero } from "@/components/shop/ProductHero";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { PackingVisualizer } from "@/components/sps/PackingVisualizer";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full">
        <ProductHero />
        <ProductGrid />
        <PackingVisualizer />
        
        {/* Simple Footer/CTA stub until full footer is implemented */}
        <div className="py-32 bg-foreground text-background text-center">
            <h2 className="text-4xl font-semibold mb-6">Ready to go?</h2>
            <Link href="/products" className="inline-block px-8 py-3 bg-background text-foreground rounded-full font-medium">
                Shop the Collection
            </Link>
        </div>
    </div>
  );
}
