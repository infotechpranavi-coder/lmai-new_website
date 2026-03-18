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
      isScrolled ? "bg-white/90 backdrop-blur-xl shadow-[0_2px_20px_-10px_rgba(0,0,0,0.1)] py-0.5" : "bg-white py-1"
    )}>
      <nav className="max-w-[1600px] mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group z-[110]">
          <div className="relative w-36 h-24 md:w-48 md:h-32 transition-all duration-500">
            <Image
              src="/LMAI-Logo-1-removebg-preview.png"
              alt="LMAI Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        <div className="hidden xl:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full',
                  'bg-[#007db7] text-white shadow-lg shadow-[#007db7]/20 hover:shadow-[#007db7]/40 hover:-translate-y-0.5',
                  isActive && 'ring-2 ring-[#007db7] ring-offset-2 ring-offset-white'
                )}
              >
                {item.name}
              </Link>
            );
          })}
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
          "fixed inset-0 bg-white/98 backdrop-blur-2xl z-[100] xl:hidden flex flex-col p-8 transition-all duration-700 ease-in-out",
          isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}>
          <div className="flex flex-col gap-3 mt-24">
            {navItems.map((item, idx) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'text-lg font-bold py-4 border-b border-black/10 transition-all flex items-center justify-between',
                  pathname === item.href ? 'text-[#007db7]' : 'text-foreground/80'
                )}
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                <span>{item.name}</span>
                {pathname === item.href && (
                  <span className="w-2 h-2 rounded-full bg-[#007db7]" />
                )}
              </Link>
            ))}
          </div>


        </div>
      </nav>
    </header>
  );
}

