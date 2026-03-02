'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getOptimizedUrl } from '@/lib/image-utils';

export default function EventsGallery({ pastEvents }: { pastEvents: any[] }) {
    const [isGridView, setIsGridView] = useState(false);

    if (pastEvents.length === 0) {
        return (
            <div className="text-center py-20 bg-white/5 rounded-[3rem]">
                <p className="text-white/50 font-black uppercase tracking-widest">No past events to display.</p>
            </div>
        );
    }

    return (
        <>
            <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
                <div className="max-w-2xl space-y-4">
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.4em] block">Gallery Archives</span>
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                        Past <span className="text-primary italic">Highlights</span>
                    </h2>
                </div>
                <Button
                    variant="outline"
                    onClick={() => setIsGridView(!isGridView)}
                    className="rounded-full bg-transparent border-white/20 text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest text-xs h-12 px-8"
                >
                    {isGridView ? 'View As Slider' : 'View Full Gallery'}
                </Button>
            </div>

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

            {isGridView ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 w-full">
                    {pastEvents.map((photo, idx) => (
                        <Link href={`/events/${photo._id}`} key={photo._id?.toString() || idx} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden group cursor-pointer block border border-white/10">
                            <Image
                                src={getOptimizedUrl(photo.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865', { width: 500 })}
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
                        {[...pastEvents, ...pastEvents].map((photo, idx) => (
                            <Link href={`/events/${photo._id}`} key={`${photo._id}-${idx}`} className="relative w-[300px] md:w-[400px] aspect-[4/5] flex-shrink-0 rounded-[2rem] overflow-hidden group cursor-pointer block border border-white/10">
                                <Image
                                    src={getOptimizedUrl(photo.coverImage || 'https://images.unsplash.com/photo-1511578314322-379afb476865', { width: 600 })}
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
        </>
    );
}
