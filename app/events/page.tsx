import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getBanners, getEvents } from '@/lib/data';
import { getOptimizedUrl } from '@/lib/image-utils';
import EventsGallery from '@/components/EventsGallery';

export const revalidate = 3600;

export default async function Events() {
  const [bannersData, eventsData] = await Promise.all([
    getBanners('Events'),
    getEvents()
  ]);

  const bannerImage = bannersData[0]?.image || 'https://images.unsplash.com/photo-1511578314322-379afb476865';
  const upcomingEvents = eventsData.filter((e: any) => e.type === 'upcoming');
  const pastEvents = eventsData.filter((e: any) => e.type === 'past');

  return (
    <div className="w-full bg-background selection:bg-primary selection:text-white">

      {/* ──────────────────────────────────────────────────────────
          HERO SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="relative h-[500px] md:h-[650px] w-full overflow-hidden">
        <Image
          src={getOptimizedUrl(bannerImage, { width: 1600 })}
          alt="LMAI Events Banner"
          fill
          priority
          className="object-cover brightness-[0.6]"
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
                <Card key={event._id?.toString() || idx} className="group overflow-hidden rounded-[2.5rem] border-border shadow-sm hover:shadow-2xl transition-all duration-500 bg-white">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={getOptimizedUrl(event.coverImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87', { width: 800 })}
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
                    </div>

                    <div className="pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                      <Link href={`/events/${event._id}`} className="w-full sm:w-auto">
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
        <div className="max-w-7xl mx-auto">
          <EventsGallery pastEvents={pastEvents} />
        </div>
      </section>

    </div>
  );
}
