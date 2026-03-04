import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getBanners, getNewsletters } from '@/lib/data';
import { getOptimizedUrl } from '@/lib/image-utils';

export const revalidate = 3600;

export default async function Newsletters() {
  const [bannersData, newsletters] = await Promise.all([
    getBanners('Newsletters'),
    getNewsletters()
  ]);

  const bannerImage = bannersData[0]?.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c';

  return (
    <div className="w-full bg-background selection:bg-primary selection:text-white">

      {/* ──────────────────────────────────────────────────────────
          HERO SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="relative h-[180px] md:h-[650px] w-full overflow-hidden">
        <Image
          src={getOptimizedUrl(bannerImage, { width: 1600 })}
          alt="LMAI Newsletters"
          fill
          priority
          className="object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/ /</span>
            <span className="text-white">Newsletters</span>
          </div>
          <h1 className="text-3xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            Digital <span className="text-primary italic">Archives</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary mt-8 rounded-full" />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          MAIN CONTENT - CLEAN DOCUMENT LIST
      ────────────────────────────────────────────────────────── */}
      <section className="py-32 px-4 sm:px-6 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 space-y-4">
            <span className="text-primary text-xs font-black uppercase tracking-widest block">Resource Center</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none">
              Official <span className="text-primary italic">Publications</span>
            </h2>
            <p className="text-lg text-foreground/50 font-bold max-w-2xl mt-8 border-l-4 border-primary pl-6 py-2">
              Access our complete library of technical reports, monthly digests, and special edition publications. Available for direct PDF download.
            </p>
          </div>

          {newsletters.length === 0 ? (
            <div className="text-center py-24 bg-secondary/20 rounded-[3rem]">
              <p className="text-foreground/40 font-black uppercase tracking-[0.2em]">No publications available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {newsletters.map((item: any, idx) => (
                <div key={item._id?.toString() || idx} className="group relative flex flex-col sm:flex-row gap-8 items-start p-2 hover:bg-secondary/10 rounded-3xl transition-colors duration-500">
                  {/* Visual Placeholder for Document */}
                  <div className="relative w-full sm:w-48 aspect-[3/4] shrink-0 overflow-hidden rounded-2xl bg-[#0a0a0b] flex flex-col items-center justify-center group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] transition-all duration-500">
                    <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                    {item.image ? (
                      <Image src={getOptimizedUrl(item.image, { width: 400 })} alt={item.title} fill className="object-cover opacity-50 group-hover:opacity-80 transition-opacity" />
                    ) : (
                      <FileText className="w-16 h-16 text-white/20 group-hover:text-primary transition-colors duration-500" />
                    )}
                    <div className="absolute bottom-4 text-white/80 text-[10px] font-black uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">PDF DOCUMENT</div>

                    {/* Abstract Visual Lines */}
                    <div className="absolute top-20 left-6 right-6 h-1 bg-white/5" />
                    <div className="absolute top-24 left-6 right-12 h-1 bg-white/5" />
                    <div className="absolute top-28 left-6 right-8 h-1 bg-white/5" />
                  </div>

                  <div className="flex-1 flex flex-col h-full justify-between py-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-bold text-foreground/30 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {item.date}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-foreground/50 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-8 flex items-center gap-6">
                      <a href={item.file} target="_blank" rel="noopener noreferrer">
                        <Button className="rounded-full bg-[#0a0a0b] hover:bg-primary text-white font-black uppercase text-[10px] tracking-[0.2em] h-12 px-8 flex items-center gap-2 transition-all duration-500 group-hover:translate-x-1 shadow-lg shadow-black/10">
                          <Download className="w-3 h-3" /> Download PDF
                        </Button>
                      </a>
                      <span className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">
                        {item.fileSize || 'PDF'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          INSTITUTIONAL FOOTER / CTA
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-24 bg-[#0a0a0b] text-white">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-primary p-12 md:p-24 overflow-hidden relative group">
          {/* Abstract Background Decoration */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/20 rounded-full blur-[80px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Mail className="w-10 h-10" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Secretariat Updates</span>
              </div>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
                JOIN THE <br /> <span className="italic text-black">NETWORK.</span>
              </h2>
              <p className="text-lg font-bold text-white/70 max-w-md">
                Subscribe to receive our latest newsletters and technical briefs directly in your inbox as soon as they are published.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="ENTER YOUR CORPORATE EMAIL"
                  className="bg-white/10 border border-white/20 rounded-full h-16 px-10 text-white placeholder:text-white/40 font-black text-[10px] tracking-[0.3em] outline-none focus:ring-2 focus:ring-black/20 transition-all"
                />
                <Button className="h-16 rounded-full bg-black text-white hover:bg-white hover:text-black font-black uppercase text-xs tracking-[0.3em] flex items-center justify-between px-10 group/btn transition-all duration-500">
                  Subscribe Now
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                </Button>
              </div>
              <p className="text-[10px] font-black text-white/50 uppercase tracking-widest text-center lg:text-left">
                * We value your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
