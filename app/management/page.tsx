"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { useBanner } from '@/hooks/useBanner';

export default function Management() {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const bannerImage = useBanner('Management', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80');

  useEffect(() => {
    fetch('/api/dashboard/members')
      .then(res => res.json())
      .then(data => {
        setMembers(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch members", err);
        setIsLoading(false);
      });
  }, []);

  const categorizedMembers = {
    boardOfDirectors: members.filter(m => m.category === 'boardOfDirectors'),
    lmaiForce: members.filter(m => m.category === 'lmaiForce'),
    pastPresidents: members.filter(m => m.category === 'pastPresidents'),
  };

  const SectionHeader = ({ subtitle, title }: { subtitle: string, title: string }) => (
    <div className="mb-20 space-y-4">
      <span className="text-primary text-xs font-black uppercase tracking-widest block">{subtitle}</span>
      <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none">
        {title.split(' ').map((word, i, arr) => (
          <span key={i} className={i === arr.length - 1 ? "text-primary italic" : ""}>{word} </span>
        ))}
      </h2>
    </div>
  );

  const MemberCard = ({ person }: { person: { name: string, title?: string, designation?: string, image: string } }) => (
    <div className="group block">
      <div className="overflow-hidden transition-all duration-500">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-lg group-hover:shadow-2xl transition-all duration-500">
          <Image
            src={person.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"}
            alt={person.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        <div className="py-6 px-1 space-y-1 text-center">
          <h3 className="text-lg font-black uppercase tracking-tighter group-hover:text-primary transition-colors leading-tight">
            {person.name}
          </h3>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/40">
            {person.title || person.designation}
          </p>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-sm font-black uppercase tracking-widest text-foreground/40">Loading Leadership...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-background selection:bg-primary selection:text-white">

      {/* ──────────────────────────────────────────────────────────
          HERO SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <Image
          src={bannerImage}
          alt="LMAI Leadership"
          fill
          priority
          className="object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/ /</span>
            <span className="text-white">Management</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            Our <span className="text-primary italic">Leadership</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary mt-8 rounded-full" />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          SECTION 1: BOARD OF DIRECTORS
      ────────────────────────────────────────────────────────── */}
      {categorizedMembers.boardOfDirectors.length > 0 && (
        <section className="py-32 px-4 sm:px-6 lg:px-24 bg-white">
          <div className="max-w-7xl mx-auto">
            <SectionHeader subtitle="Executive Governance" title="Board of Directors" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-10">
              {categorizedMembers.boardOfDirectors.map((person, idx) => (
                <MemberCard key={person._id || idx} person={person} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────
          SECTION 2: LMAI FORCE
      ────────────────────────────────────────────────────────── */}
      {categorizedMembers.lmaiForce.length > 0 && (
        <section className="py-32 px-4 sm:px-6 lg:px-24 bg-secondary/10">
          <div className="max-w-7xl mx-auto">
            <SectionHeader subtitle="Next Generation Leaders" title="LMAI Force" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-10">
              {categorizedMembers.lmaiForce.map((person, idx) => (
                <MemberCard key={person._id || idx} person={person} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────────────────
          SECTION 3: PAST PRESIDENTS
      ────────────────────────────────────────────────────────── */}
      {categorizedMembers.pastPresidents.length > 0 && (
        <section className="py-32 px-4 sm:px-6 lg:px-24 bg-white">
          <div className="max-w-7xl mx-auto">
            <SectionHeader subtitle="Legacy & Vision" title="Past Presidents" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 sm:gap-x-6 gap-y-10">
              {categorizedMembers.pastPresidents.map((person, idx) => (
                <MemberCard key={person._id || idx} person={person} />
              ))}
            </div>
          </div>
        </section>
      )}

      {members.length === 0 && (
        <section className="py-32 px-4 sm:px-6 lg:px-24 bg-white text-center">
          <div className="max-w-xl mx-auto py-24 bg-secondary/20 rounded-[3rem]">
            <p className="text-foreground/40 font-black uppercase tracking-[0.2em]">Leadership directory is currently being updated.</p>
          </div>
        </section>
      )}

    </div>
  );
}
