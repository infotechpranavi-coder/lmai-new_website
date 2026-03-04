'use client';

import { useCallback, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AUTOPLAY_INTERVAL = 4500;

export default function HeroCarousel({ initialSlides }: { initialSlides?: any[] }) {
  const [slides, setSlides] = useState<any[]>(initialSlides || []);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchBanners = useCallback(async () => {
    if (initialSlides && initialSlides.length > 0) return;
    try {
      const res = await fetch('/api/dashboard/banners');
      const data = await res.json();
      const homeBanners = data
        .filter((b: any) => b.page === 'Home')
        .map((b: any) => ({
          id: b._id || b.id,
          image: b.image,
          tag: 'Official Update',
          title: b.title,
          subtitle: b.subtitle,
          cta: 'Learn More'
        }));

      if (homeBanners.length > 0) {
        setSlides(homeBanners);
      } else {
        // Fallback to one slide if none exists
        setSlides([{
          id: 'fallback',
          image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80',
          tag: 'Welcome to LMAI',
          title: 'Label Manufacturers\nAssociation of India',
          subtitle: 'Innovation & Excellence since 2002',
          cta: 'About Us'
        }]);
      }
    } catch (err) {
      console.error("Failed to fetch banners", err);
    }
  }, [initialSlides]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const clearTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const goTo = useCallback((index: number, dir: 'next' | 'prev' = 'next') => {
    if (animating || slides.length === 0) return;
    setAnimating(true);
    setDirection(dir);
    setProgress(0);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 600);
  }, [animating, slides.length]);

  const goNext = useCallback(() => {
    if (slides.length === 0) return;
    goTo((current + 1) % slides.length, 'next');
  }, [current, goTo, slides.length]);

  const goPrev = useCallback(() => {
    if (slides.length === 0) return;
    goTo((current - 1 + slides.length) % slides.length, 'prev');
  }, [current, goTo, slides.length]);

  const startAutoplay = useCallback(() => {
    if (slides.length === 0) return;
    clearTimers();
    setProgress(0);
    // progress bar ticker
    const step = 100 / (AUTOPLAY_INTERVAL / 50);
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + step, 100));
    }, 50);
    // slide advance
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        setDirection('next');
        setAnimating(true);
        setTimeout(() => setAnimating(false), 600);
        setProgress(0);
        return (c + 1) % slides.length;
      });
    }, AUTOPLAY_INTERVAL);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length > 0) {
      startAutoplay();
    }
    return clearTimers;
  }, [startAutoplay, slides.length]);

  const handleManualNav = (fn: () => void) => {
    clearTimers();
    fn();
    startAutoplay();
  };

  if (slides.length === 0) return (
    <div className="w-full h-[88vh] bg-gray-950 flex items-center justify-center animate-pulse">
      <div className="text-white/20 font-black uppercase tracking-[0.5em] text-2xl">Syncing Banners...</div>
    </div>
  );

  const slide = slides[current];

  return (
    <div className="relative w-full h-[40vh] md:h-[88vh] min-h-[300px] md:min-h-[600px] overflow-hidden bg-gray-900 select-none">
      {/* ── Slides ── */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={[
            'absolute inset-0 transition-all duration-700 ease-in-out',
            i === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0',
          ].join(' ')}
        >
          <Image
            src={s.image}
            alt={s.title || 'LMAI Banner'}
            fill
            className="object-cover object-center"
            priority={i === 0}
          />
          {s.title?.trim() && (
            <>
              {/* Dark gradient overlay — heavier at bottom for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              {/* Left-side blue accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary via-accent to-primary opacity-80" />
            </>
          )}
        </div>
      ))}

      {/* ── Text Content ── */}
      {slide.title?.trim() && (
        <div className="absolute inset-0 z-20 flex items-end pb-12 md:pb-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
            <div
              key={current}
              className={[
                'transition-all duration-700',
                animating
                  ? direction === 'next'
                    ? 'opacity-0 translate-y-6'
                    : 'opacity-0 -translate-y-6'
                  : 'opacity-100 translate-y-0',
              ].join(' ')}
            >
              {/* Tag pill */}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground text-[10px] font-bold uppercase tracking-widest mb-3 border border-primary/50 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {slide.tag}
              </span>

              {/* Headline */}
              <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.0] mb-3 drop-shadow-2xl whitespace-pre-line">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <div className="text-lg md:text-xl text-white/75 max-w-xl mb-8 leading-relaxed">
                {slide.subtitle}
              </div>

              {/* CTA */}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-5 text-base font-bold shadow-xl shadow-primary/40 hover:shadow-primary/60 hover:-translate-y-0.5 transition-all duration-300">
                {slide.cta} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {slides.length > 1 && (
        <>
          {/* ── Arrow Navigation ── */}
          <button
            onClick={() => handleManualNav(goPrev)}
            aria-label="Previous slide"
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-primary border border-white/20 hover:border-primary text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/40"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleManualNav(goNext)}
            aria-label="Next slide"
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-primary border border-white/20 hover:border-primary text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/40"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* ── Bottom Dots + Progress Bar ── */}
          <div className="absolute bottom-8 left-0 right-0 z-30">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center gap-4">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => handleManualNav(() => goTo(i, i > current ? 'next' : 'prev'))}
                  aria-label={`Go to slide ${i + 1}`}
                  className="flex flex-col items-start gap-1.5 group"
                >
                  <div
                    className={[
                      'h-1 rounded-full transition-all duration-300',
                      i === current
                        ? 'w-16 bg-primary'
                        : 'w-6 bg-white/30 group-hover:bg-white/60',
                    ].join(' ')}
                  >
                    {i === current && (
                      <div
                        className="h-full bg-white rounded-full transition-none"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
