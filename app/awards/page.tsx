"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, ArrowUpRight, Star, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useBanner } from '@/hooks/useBanner';

export default function Awards() {
  const [awards, setAwards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const bannerImage = useBanner('Awards', 'https://images.unsplash.com/photo-1516323087525-4b3627f794de?w=1600&q=80');

  useEffect(() => {
    fetch('/api/dashboard/awards')
      .then(res => res.json())
      .then(data => {
        setAwards(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch awards", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-sm font-black uppercase tracking-widest text-foreground/40">Loading Awards...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-background selection:bg-primary selection:text-white">

      {/* ──────────────────────────────────────────────────────────
          HERO SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="relative h-[350px] md:h-[450px] w-full overflow-hidden">
        <Image
          src={bannerImage}
          alt="LMAI Awards"
          fill
          priority
          className="object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/ /</span>
            <span className="text-white">Awards</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            Award <span className="text-primary italic">Winners</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary mt-6 rounded-full" />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          SIMPLE GRID LAYOUT FOR AWARDS
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4">
            <span className="text-primary text-xs font-black uppercase tracking-widest block">Institutional Recognition</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none">The <span className="text-primary italic">Gallery</span></h2>
            <p className="text-lg text-foreground/50 font-bold max-w-2xl mt-6 uppercase tracking-wider">
              Recognizing top class international quality in label manufacturing. Click on any award to view detailed highlights and galleries.
            </p>
          </div>

          {awards.length === 0 ? (
            <div className="text-center py-24 bg-secondary/20 rounded-[3rem]">
              <p className="text-foreground/40 font-black uppercase tracking-[0.2em]">No awards recorded in the gallery yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {awards.map((award, idx) => (
                <Link href={`/awards/${award._id}`} key={award._id || idx} className="block group">
                  <div className="overflow-hidden transition-all duration-500">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
                      <Image
                        src={award.image}
                        alt={award.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    </div>

                    <div className="py-6 px-2">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {award.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-primary transition-colors leading-tight line-clamp-2 text-center">
                        {award.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
