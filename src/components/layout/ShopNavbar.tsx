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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b",
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-border/40 py-3 shadow-sm"
          : "bg-background/50 backdrop-blur-md border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
            <span className="text-sm font-bold text-accent">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground group-hover:opacity-80 transition-opacity hidden sm:inline">
            STFO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <NavLink href="/products">Shop</NavLink>
          <NavLink href="/products/sps-system">SPS System</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/dashboard" className="hidden md:inline-flex">
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-secondary/50">
              Account
            </span>
          </Link>
          
          <button className="relative p-2.5 text-foreground hover:bg-secondary/50 rounded-lg transition-colors group">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full" />
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
