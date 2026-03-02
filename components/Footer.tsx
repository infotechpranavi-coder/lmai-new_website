"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, Linkedin, Facebook, ArrowUp, Instagram, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';
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

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/dashboard')) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0b] text-white pt-24 pb-12 overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Top Section: Brand & Nav */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-10">
            <Link href="/" className="group block">
              <div className="relative w-40 h-32 transition-all duration-500 bg-white rounded-xl p-2">
                <Image
                  src="/LMAI-Logo-1-removebg-preview.png"
                  alt="LMAI Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
            </Link>
            <p className="text-sm font-medium text-white/40 leading-relaxed max-w-sm uppercase tracking-widest">
              Advancing the Indian label manufacturing industry through innovation, education, and global recognition since 2002.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Youtube, href: '#' }
              ].map((social, i) => (
                <a key={i} href={social.href} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300">
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div className="space-y-8">
              <h4 className="text-sm font-black uppercase tracking-[0.4em] text-primary">Association</h4>
              <ul className="space-y-4">
                {navItems.slice(0, 5).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-sm font-black uppercase tracking-[0.4em] text-primary">Resources</h4>
              <ul className="space-y-4">
                {navItems.slice(5).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-sm font-black uppercase tracking-[0.4em] text-primary">Contact Office</h4>
            <div className="space-y-6 text-sm font-bold text-white/40 uppercase tracking-[0.1em]">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <div className="space-y-4">
                  <div>
                    <span className="text-white block mb-1">Admin Office:</span>
                    <p>A418, Mayuresh Trade Center, Plot No 4, Sector 19, Vashi Turbhe Road, Navi Mumbai - 400703. (India)</p>
                  </div>
                  <div>
                    <span className="text-white block mb-1">Register Office:</span>
                    <p>A419, Mayuresh Trade Center, Plot No 4, Sector 19, Vashi Turbhe Road, Navi Mumbai - 400703. (India)</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <p>+91 8097333995</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <p>lmaiorg@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-white/5 mb-12" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-4">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/20 text-center md:text-left">
            © 2024 LMAI - Label Manufacturers Association of India. All rights reserved.
          </p>
          <div className="flex gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-white/20">
            <span>Powered by <a href="https://contact360marketing.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white transition-colors underline underline-offset-4">Contact360 Marketing</a></span>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    </footer>
  );
}
