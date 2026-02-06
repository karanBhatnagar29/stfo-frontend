import { ProductCard } from "@/components/shop/ProductCard";

const PRODUCTS = [
  {
    id: "1",
    name: "Carry-On Pro",
    slug: "carry-on-pro",
    price: 395,
    tagline: "For 3-7 day global travel.",
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    name: "Check-In Large",
    slug: "check-in-large",
    price: 645,
    tagline: "Maximum capacity. Zero chaos.",
    image: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    name: "The Trunk",
    slug: "the-trunk",
    price: 725,
    tagline: "For extended expeditions.",
    image: "https://images.unsplash.com/photo-1595185984262-63025287be12?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "4",
    name: "Carry-On Plus",
    slug: "carry-on-plus",
    price: 425,
    tagline: "Maximized domestic sizing.",
    image: "https://images.unsplash.com/photo-1543301385-27a3d3c78208?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "5",
    name: "The Diplomat",
    slug: "diplomat-edition",
    price: 950,
    tagline: "Aluminum edition. Limited run.",
    image: "https://images.unsplash.com/photo-1473631970222-19a9ef9c2d15?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "6",
    name: "Weekender SPS",
    slug: "weekender-sps",
    price: 295,
    tagline: "Soft-shell flexibility. Hard-shell logic.",
    image: "https://images.unsplash.com/photo-1473186578169-2148412679f2?auto=format&fit=crop&q=80&w=800"
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen pb-24">
      <div className="container mx-auto px-6 pt-24 pb-16">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          The Collection.
        </h1>
        <p className="max-w-xl text-xl text-muted-foreground leading-relaxed">
          Every piece is integrated with our Smart Packing System™. 
          Choose your vessel based on your journey, not just dimensions.
        </p>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
