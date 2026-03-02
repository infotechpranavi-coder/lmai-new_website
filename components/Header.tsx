'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Membership', href: '/membership' },
  { name: 'Events', href: '/events' },
  { name: 'Awards', href: '/awards' },
  { name: 'Newsletters', href: '/newsletters' },
  { name: 'Presentations', href: '/presentations' },
  { name: 'Management', href: '/management' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname.startsWith('/dashboard')) return null;

  return (
    <header className={cn(
      "sticky top-0 z-[100] w-full transition-all duration-500",
      isScrolled ? "bg-white/90 backdrop-blur-xl shadow-[0_2px_20px_-10px_rgba(0,0,0,0.1)] py-2" : "bg-white py-4"
    )}>
      <nav className="max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group z-[110]">
          <div className="relative w-28 h-20 md:w-32 md:h-24 transition-all duration-500">
            <Image
              src="/LMAI-Logo-1-removebg-preview.png"
              alt="LMAI Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 group',
                  isActive ? 'text-primary' : 'text-foreground/60 hover:text-primary'
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                )}
                {!isActive && (
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary/20 transition-all duration-300 group-hover:left-4 group-hover:right-4 group-hover:w-[calc(100%-2rem)] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Action Button (Desktop) */}
        <div className="hidden xl:block">
          <Link href="/membership">
            <button className="h-10 px-6 rounded-full bg-primary text-white text-xs font-black uppercase tracking-widest hover:bg-black transition-colors shadow-lg shadow-primary/20">
              Join Association
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden z-[110] p-2 text-foreground hover:bg-secondary rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={cn(
          "fixed inset-0 bg-white z-[100] xl:hidden flex flex-col p-8 transition-all duration-700 ease-in-out",
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}>
          <div className="flex flex-col gap-3 mt-24">
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'relative text-xs font-black uppercase tracking-[0.15em] py-3 border-b border-border/30 hover:text-primary transition-all flex items-center justify-between group',
                  pathname === item.href ? 'text-primary' : 'text-foreground/70'
                )}
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                <span>{item.name}</span>
                {pathname === item.href && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </Link>
            ))}
          </div>

          <div className="mt-auto pb-12 space-y-8">
            <div className="flex flex-col gap-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Quick Action</p>
              <Link href="/membership" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full h-12 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs hover:bg-black transition-all">
                  Become A Member
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

