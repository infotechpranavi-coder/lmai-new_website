import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dbConnect from '@/lib/mongodb';
import { Event } from '@/lib/models';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    await dbConnect();
    const event: any = await Event.findById(resolvedParams.slug).lean();
    if (!event) return { title: 'Event Not Found | LMAI' };

    return {
        title: `${event.title} | LMAI Events`,
        description: event.description,
    };
}

export default async function EventDetail({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    await dbConnect();

    let event: any = null;
    try {
        event = await Event.findById(resolvedParams.slug).lean();
    } catch (err) {
        // Handle invalid Object IDs gracefully
    }

    if (!event) {
        notFound();
    }

    return (
        <div className="w-full bg-background selection:bg-primary selection:text-white">
            {/* ──────────────────────────────────────────────────────────
          HERO SECTION
      ────────────────────────────────────────────────────────── */}
            <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
                <Image
                    src={event.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1600&q=80'}
                    alt={event.title}
                    fill
                    priority
                    className="object-cover brightness-[0.2]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                    <div className="flex items-center gap-2 text-primary text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] mb-6 flex-wrap justify-center">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/ /</span>
                        <Link href="/events?view=gallery" className="hover:text-white transition-colors">Events</Link>
                        <span>/ /</span>
                        <span className="text-white">{event.title}</span>
                    </div>
                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none max-w-5xl">
                        {event.title.split(' ').map((word: string, i: number, arr: string[]) => (
                            <span key={i} className={i === arr.length - 1 ? "text-primary italic" : ""}>
                                {word}{" "}
                            </span>
                        ))}
                    </h1>
                    <div className="w-24 h-1.5 bg-primary mt-8 rounded-full" />
                </div>
            </section>




            {/* ──────────────────────────────────────────────────────────
          PHOTO GALLERY
      ────────────────────────────────────────────────────────── */}
            {event.gallery && event.gallery.length > 0 && (
                <section className="py-24 px-4 sm:px-6 lg:px-24 bg-[#0a0a0b] text-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-20 text-left">
                            <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] block mb-4">
                                Visual Records
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none flex justify-between items-baseline gap-4 w-full">
                                <span>Event <span className="text-primary italic">Gallery</span></span>
                                <span className="text-sm md:text-lg text-white/30 font-black uppercase tracking-[0.3em]">{event.date}</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {event.gallery.map((photo: string, idx: number) => (
                                <div key={idx} className="relative aspect-video rounded-[2rem] overflow-hidden group">
                                    <Image
                                        src={photo}
                                        alt={`${event.title} photo ${idx + 1}`}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>
                            ))}
                        </div>

                        <div className="mt-24 text-center">
                            <Button variant="outline" asChild className="rounded-full bg-white border-none text-black hover:bg-primary hover:text-white font-bold uppercase tracking-widest text-xs h-14 px-10 shadow-lg">
                                <Link href="/events?view=gallery">
                                    Back to All Events
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            )}

        </div>
    );
}
