"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Users, ArrowRight, ArrowUpRight, Clock, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useBanner } from '@/hooks/useBanner';

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [isGridView, setIsGridView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const bannerImage = useBanner('Events', 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=80');

  useEffect(() => {
    fetch('/api/dashboard/events')
      .then(res => res.json())
      .then(data => {
        const upcoming = data.filter((e: any) => e.type === 'upcoming');
        const past = data.filter((e: any) => e.type === 'past');
        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch events", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-sm font-black uppercase tracking-widest text-foreground/40">Loading Events...</p>
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
          alt="LMAI Events Banner"
          fill
          priority
          className="object-cover brightness-[0.2]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/ /</span>
            <span className="text-white">Events</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            Our <span className="text-primary italic">Events</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary mt-6 rounded-full" />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          UPCOMING EVENTS - PROFESSIONAL GRID LAYOUT
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 space-y-4">
            <span className="text-primary text-xs font-black uppercase tracking-widest block">Event Calendar</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none">Upcoming <span className="text-primary italic">Gatherings</span></h2>
            <p className="text-lg text-foreground/50 font-bold max-w-2xl mt-6">
              Join LMAI in shaping the future of the label industry. Participate in our technical seminars, workshops, and annual conferences.
            </p>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-20 bg-secondary/20 rounded-[3rem]">
              <p className="text-foreground/50 font-black uppercase tracking-widest">No upcoming events scheduled at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {upcomingEvents.map((event, idx) => (
                <Card key={event._id || idx} className="group overflow-hidden rounded-[2.5rem] border-border shadow-sm hover:shadow-2xl transition-all duration-500 bg-white">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={event.coverImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                      {event.category || 'Event'}
                    </div>
                  </div>

                  <div className="p-10">
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm font-medium text-foreground/60 mb-8 line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-4 mb-10">
                      <div className="flex items-center gap-3 text-xs font-bold text-foreground/70 uppercase tracking-wide">
                        <Calendar className="w-4 h-4 text-primary" />
                        {event.date}
                      </div>
                      {/* Omit Time and Location if they are not stored in the dynamic DB schema, or implement fallbacks */}
                    </div>

                    <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                      <Link href={`/events/${event._id || event.slug}`} className="w-full sm:w-auto">
                        <Button className="rounded-full w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-primary/20 text-[10px] uppercase tracking-widest">
                          View Details <ArrowUpRight className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          PAST EVENT HIGHLIGHTS
      ────────────────────────────────────────────────────────── */}
      <section className="py-32 px-4 sm:px-6 lg:px-24 bg-[#0a0a0b] text-white overflow-hidden relative">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes slideGallery {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-gallery-slide {
            display: flex;
            width: max-content;
            animation: slideGallery 25s linear infinite;
          }
          .animate-gallery-slide:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
            <div className="max-w-2xl space-y-4">
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] block">Gallery Archives</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                Past <span className="text-primary italic">Highlights</span>
              </h2>
            </div>
            {pastEvents.length > 0 && (
              <Button
                variant="outline"
                onClick={() => setIsGridView(!isGridView)}
                className="rounded-full bg-transparent border-white/20 text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-xs h-12 px-8"
              >
                {isGridView ? 'View As Slider' : 'View Full Gallery'}
              </Button>
            )}
          </div>

          {pastEvents.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-[3rem]">
              <p className="text-white/50 font-black uppercase tracking-widest">No past events to display.</p>
            </div>
          ) : isGridView ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 w-full">
              {pastEvents.map((photo, idx) => (
                <Link href={`/events/${photo._id}`} key={photo._id || idx} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group cursor-pointer block border border-white/10">
                  <Image
                    src={photo.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80'}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-110 group-hover:blur-sm transition-all duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <h4 className="text-xl font-black uppercase tracking-tight mb-4">{photo.title}</h4>
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full relative z-10 overflow-hidden">
              <div className="animate-gallery-slide gap-6 pb-12">
                {/* Double the array to allow for a seamless infinite loop */}
                {[...pastEvents, ...pastEvents].map((photo, idx) => (
                  <Link href={`/events/${photo._id}`} key={`${photo._id}-${idx}`} className="relative w-[300px] md:w-[400px] aspect-[4/5] flex-shrink-0 rounded-[2rem] overflow-hidden group cursor-pointer block border border-white/10">
                    <Image
                      src={photo.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80'}
                      alt={photo.title}
                      fill
                      className="object-cover group-hover:scale-110 group-hover:blur-sm transition-all duration-700 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <h4 className="text-xl font-black uppercase tracking-tight mb-4">{photo.title}</h4>
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
