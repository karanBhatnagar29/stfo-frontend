import { ShopNavbar } from "@/components/layout/ShopNavbar";
import { ShopFooter } from "@/components/layout/ShopFooter";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased text-foreground selection:bg-foreground selection:text-background">
      <ShopNavbar />
      <main className="flex-1 w-full flex flex-col pt-20">
        {children}
      </main>
      <ShopFooter />
    </div>
  );
}
