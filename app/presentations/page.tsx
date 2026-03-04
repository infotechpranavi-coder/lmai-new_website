import { Button } from '@/components/ui/button';
import { Play, Calendar, ArrowRight, Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getBanners, getPresentations } from '@/lib/data';
import { getOptimizedUrl } from '@/lib/image-utils';

export const revalidate = 3600;

export default async function Presentations() {
  const [bannersData, presentations] = await Promise.all([
    getBanners('Presentations'),
    getPresentations()
  ]);

  const bannerImage = bannersData[0]?.image || 'https://images.unsplash.com/photo-1475721027785-f74dea327912';

  return (
    <div className="w-full bg-background selection:bg-primary selection:text-white">

      {/* ──────────────────────────────────────────────────────────
          HERO SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="relative h-[180px] md:h-[650px] w-full overflow-hidden">
        <Image
          src={getOptimizedUrl(bannerImage, { width: 1600 })}
          alt="LMAI Presentations"
          fill
          priority
          className="object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/ /</span>
            <span className="text-white">Presentations</span>
          </div>
          <h1 className="text-3xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            Expert <span className="text-primary italic">Sessions</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary mt-8 rounded-full" />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          VIDEO GRID SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="py-32 px-4 sm:px-6 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 space-y-4">
            <span className="text-primary text-xs font-black uppercase tracking-widest block">Video Archives</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none">
              Knowledge <span className="text-primary italic">Sharing</span>
            </h2>
            <p className="text-lg text-foreground/50 font-bold max-w-2xl mt-8 border-l-4 border-primary pl-6 py-2">
              Watch keynote speeches, technical presentations, and panel discussions from our global summits and workshops.
            </p>
          </div>

          {presentations.length === 0 ? (
            <div className="text-center py-24 bg-secondary/20 rounded-[3rem]">
              <p className="text-foreground/40 font-black uppercase tracking-[0.2em]">No presentations available in the archive yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {presentations.map((item: any, idx) => (
                <a href={item.link} target="_blank" rel="noopener noreferrer" key={item._id?.toString() || idx} className="group cursor-pointer">
                  <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] bg-[#0a0a0b] shadow-lg group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={getOptimizedUrl(item.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87", { width: 800 })}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                        <Play className="w-6 h-6 text-white ml-1 fill-white" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-2">
                    <div className="flex items-center justify-center gap-3">
                      <span className="text-[8px] font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-[8px] font-bold text-foreground/30 flex items-center gap-1 uppercase tracking-widest">
                        <Calendar className="w-3 h-3" /> {item.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors line-clamp-2 text-center">
                      {item.title}
                    </h3>
                    <p className="text-[10px] font-bold text-foreground/40 text-center uppercase tracking-widest">
                      By {item.speaker}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          CTA - WATCH ON YOUTUBE
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-24 bg-[#0a0a0b] text-white">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-secondary/5 border border-white/5 p-12 md:p-24 flex flex-col items-center text-center space-y-10 relative overflow-hidden group">
          {/* Abstract Decoration */}
          <div className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] group-hover:scale-110 transition-transform duration-1000" />

          <Video className="w-16 h-16 text-primary" />
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none relative z-10">
            SUBSCRIBE TO OUR <br /> <span className="text-primary italic">YOUTUBE CHANNEL.</span>
          </h2>
          <p className="text-lg font-bold text-white/50 max-w-2xl relative z-10">
            Get instant notifications for all our technical workshops, annual conferences, and exclusive industry leader interviews.
          </p>
          <Button className="rounded-full bg-primary hover:bg-white hover:text-black text-white font-black uppercase text-xs tracking-[0.3em] h-16 px-12 transition-all duration-500 relative z-10 flex items-center gap-4 group/btn">
            Explore Our Channel
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
          </Button>
        </div>
      </section>

    </div>
  );
}
