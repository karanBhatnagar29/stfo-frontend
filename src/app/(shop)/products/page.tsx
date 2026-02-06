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
    <div className="min-h-screen pb-32">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-28 pb-20 border-b border-border">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance">
            The Complete Collection
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Every HELIOS suitcase is engineered with our Smart Packing System™. Select your size and color based on your journey, knowing intelligent organization comes standard.
          </p>
        </div>

        {/* Filter/Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {PRODUCTS.length} products
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:border-accent hover:text-accent transition-colors">
              Size
            </button>
            <button className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:border-accent hover:text-accent transition-colors">
              Price
            </button>
            <button className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:border-accent hover:text-accent transition-colors">
              Popularity
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-32 py-20 bg-secondary/50 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Can't decide?
          </h2>
          <p className="text-muted-foreground mb-8">
            Take our quick questionnaire to find your perfect HELIOS
          </p>
          <button className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
            Find Your Size
          </button>
        </div>
      </div>
    </div>
  );
}
