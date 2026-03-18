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

  const pastEvents = eventsData.filter((e: any) => e.type === 'past');

  return (
    <div className="w-full bg-background selection:bg-primary selection:text-white">

      {/* ──────────────────────────────────────────────────────────
          HERO SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="relative h-[180px] md:h-[650px] w-full overflow-hidden">
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
          <h1 className="text-3xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            Our <span className="text-primary italic">Events</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary mt-6 rounded-full" />
        </div>
      </section>



      {/* ──────────────────────────────────────────────────────────
          PAST EVENT HIGHLIGHTS
      ────────────────────────────────────────────────────────── */}
      <section className="py-32 px-4 sm:px-6 lg:px-24 bg-white text-foreground overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <EventsGallery pastEvents={pastEvents} />
        </div>
      </section>

    </div>
  );
}
