"use client";

import Link from "next/link";

export function ShopFooter() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-xl font-bold tracking-tighter text-foreground">
                STFO.
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Engineered travel gear for the modern strategist.
              <br />
              Designed in California.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-3">
            <FooterColumn title="Shop">
              <FooterLink href="/products">All Suitcases</FooterLink>
              <FooterLink href="/products/carry-on">Carry-On</FooterLink>
              <FooterLink href="/products/check-in">Check-In</FooterLink>
              <FooterLink href="/accessories">Accessories</FooterLink>
            </FooterColumn>

            <FooterColumn title="Company">
              <FooterLink href="/about">Philosophy</FooterLink>
              <FooterLink href="/journal">Journal</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterColumn>

            <FooterColumn title="Support">
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/shipping">Shipping & Returns</FooterLink>
              <FooterLink href="/warranty">Warranty</FooterLink>
              <FooterLink href="/sps-guide">SPS Guide</FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50 gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} STFO Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <FooterLink href="/privacy" small>Privacy</FooterLink>
            <FooterLink href="/terms" small>Terms</FooterLink>
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
