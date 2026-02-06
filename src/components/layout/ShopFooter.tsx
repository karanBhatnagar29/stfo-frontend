"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export function ShopFooter() {
  return (
    <footer className="bg-foreground/98 text-white border-t border-foreground">
      <div className="container mx-auto px-6">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
            <p className="text-white/60 mb-6">Get exclusive access to new releases and travel tips</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-accent"
              />
              <button className="px-6 py-3 bg-accent text-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-sm font-bold">S</span>
              </div>
              <span className="text-xl font-bold">STFO</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Intelligent luggage for the modern traveler. Engineered in California, trusted worldwide.
            </p>
            <div className="flex gap-4 mt-6">
              {["x", "ig", "in", "yt"].map((social) => (
                <button key={social} className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-xs font-semibold">
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-3">
            <FooterColumn title="Shop">
              <FooterLink href="/products">All Products</FooterLink>
              <FooterLink href="/products/carry-on">Carry-On</FooterLink>
              <FooterLink href="/products/check-in">Check-In</FooterLink>
              <FooterLink href="/products/sps-system">SPS System</FooterLink>
            </FooterColumn>

            <FooterColumn title="About">
              <FooterLink href="/about">Our Story</FooterLink>
              <FooterLink href="/sustainability">Sustainability</FooterLink>
              <FooterLink href="/journal">Journal</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterColumn>

            <FooterColumn title="Support">
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/shipping">Shipping</FooterLink>
              <FooterLink href="/warranty">Warranty</FooterLink>
              <FooterLink href="/sps-guide">SPS Guide</FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 border-t border-white/10 gap-4 text-sm text-white/60">
          <p>
            © {new Date().getFullYear()} STFO Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/cookies">Cookie Settings</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-sm font-semibold tracking-tight text-foreground">{title}</h4>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function FooterLink({ href, children, small }: { href: string; children: React.ReactNode; small?: boolean }) {
  return (
    <Link
      href={href}
      className={`text-muted-foreground hover:text-foreground transition-colors ${
        small ? "text-xs" : "text-sm"
      }`}
    >
      {children}
    </Link>
  );
}
