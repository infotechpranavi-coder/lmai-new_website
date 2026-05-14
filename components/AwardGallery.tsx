'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getOptimizedUrl } from '@/lib/image-utils';
import Lightbox from './Lightbox';

interface AwardGalleryProps {
    images: string[];
    awardTitle: string;
    awardCategory: string;
}

export default function AwardGallery({ images, awardTitle, awardCategory }: AwardGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((photo: string, idx: number) => (
                    <div 
                        key={idx} 
                        className="relative aspect-video rounded-[2rem] overflow-hidden group cursor-pointer"
                        onClick={() => openLightbox(idx)}
                    >
                        <Image
                            src={getOptimizedUrl(photo, { width: 800 })}
                            alt={`${awardTitle} photo ${idx + 1}`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading={idx < 3 ? "eager" : "lazy"}
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-[10px] font-black uppercase tracking-[0.4em] border border-white/20 px-6 py-3 rounded-full backdrop-blur-sm">View Image</span>
                        </div>
                    </div>
                ))}
            </div>

            <Lightbox 
                images={images}
                currentIndex={currentIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
                onNavigate={setCurrentIndex}
            />
        </>
    );
}
