"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ShopNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border/50 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <span className="text-xl font-bold tracking-tighter text-foreground group-hover:opacity-80 transition-opacity">
            STFO.
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/products">Suitcases</NavLink>
          <NavLink href="/products/sps-system">The System</NavLink>
          <NavLink href="/about">Philosophy</NavLink>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="hidden md:block">
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Account
            </span>
          </Link>
          
          <button className="relative p-2 text-foreground hover:bg-secondary rounded-full transition-colors group">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              <MobileNavLink href="/products">Suitcases</MobileNavLink>
              <MobileNavLink href="/products/sps-system">The System</MobileNavLink>
              <MobileNavLink href="/about">Philosophy</MobileNavLink>
              <hr className="border-border my-2" />
              <MobileNavLink href="/dashboard">Account</MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-foreground/80",
        "text-foreground/60"
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-lg font-medium text-foreground py-2 block hover:translate-x-1 transition-transform"
    >
      {children}
    </Link>
  );
}
