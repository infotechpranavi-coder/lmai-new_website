'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Download } from 'lucide-react';

interface LightboxProps {
    images: string[];
    currentIndex: number;
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (index: number) => void;
}

export default function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handlePrevious = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        const nextIndex = (currentIndex - 1 + images.length) % images.length;
        onNavigate(nextIndex);
    }, [currentIndex, images.length, onNavigate]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        const nextIndex = (currentIndex + 1) % images.length;
        onNavigate(nextIndex);
    }, [currentIndex, images.length, onNavigate]);

    const toggleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') handlePrevious();
            if (e.key === 'ArrowRight') handleNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose, handlePrevious, handleNext]);

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center select-none animate-in fade-in duration-300"
            onClick={onClose}
        >
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-8 right-8 z-[110] p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/10"
            >
                <X className="w-6 h-6" />
            </button>

            <div className="absolute top-8 left-8 z-[110] flex gap-4">
                <button 
                    onClick={toggleFullscreen}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all border border-white/10"
                >
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
                <a 
                    href={images[currentIndex].includes('res.cloudinary.com') ? images[currentIndex].replace('/upload/', '/upload/fl_attachment/') : images[currentIndex]}
                    download={`lmai-photo-${currentIndex + 1}.jpg`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 rounded-full bg-white/5 hover:bg-primary hover:text-white text-white/50 transition-all border border-white/10"
                    title="Download Image"
                >
                    <Download className="w-5 h-5" />
                </a>
                <div className="px-6 py-3 rounded-full bg-white/5 text-white/50 border border-white/10 text-xs font-black uppercase tracking-widest flex items-center">
                    {currentIndex + 1} <span className="mx-2 text-white/20">/</span> {images.length}
                </div>
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
                <>
                    <button 
                        onClick={handlePrevious}
                        className="absolute left-8 p-6 rounded-full bg-white/5 hover:bg-primary hover:text-white text-white/50 transition-all border border-white/10 group z-[110]"
                    >
                        <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button 
                        onClick={handleNext}
                        className="absolute right-8 p-6 rounded-full bg-white/5 hover:bg-primary hover:text-white text-white/50 transition-all border border-white/10 group z-[110]"
                    >
                        <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                    </button>
                </>
            )}

            {/* Main Image Container */}
            <div 
                className="relative w-[90vw] h-[80vh] flex items-center justify-center animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt="Lightbox Image"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* Thumbnails Strip */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 p-3 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md max-w-[80vw] overflow-x-auto no-scrollbar">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={(e) => {
                            e.stopPropagation();
                            onNavigate(idx);
                        }}
                        className={`relative w-16 h-12 rounded-xl overflow-hidden transition-all flex-shrink-0 ${
                            currentIndex === idx ? 'ring-2 ring-primary scale-110' : 'opacity-40 hover:opacity-100'
                        }`}
                    >
                        <Image src={img} alt="Thumb" fill className="object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
