import { Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getBanners } from '@/lib/data';
import { getOptimizedUrl } from '@/lib/image-utils';
import { ContactForm } from '@/components/ContactForm';
import { Button } from '@/components/ui/button';

export const revalidate = 3600;

export default async function Contact() {
  const bannersData = await getBanners('Contact');
  const bannerImage = bannersData[0]?.image || 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a';

  return (
    <div className="w-full bg-background selection:bg-primary selection:text-white">

      {/* ──────────────────────────────────────────────────────────
          HERO SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="relative h-[180px] md:h-[650px] w-full overflow-hidden">
        <Image
          src={getOptimizedUrl(bannerImage, { width: 1600 })}
          alt="Contact LMAI"
          fill
          priority
          className="object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/ /</span>
            <span className="text-white">Contact</span>
          </div>
          <h1 className="text-3xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            Get In <span className="text-primary italic">Touch</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary mt-8 rounded-full" />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          CONTACT INFO & FORM SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="py-32 px-4 sm:px-6 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">

            {/* Left Side: Info & Presence */}
            <div className="space-y-16">
              <div className="space-y-4">
                <span className="text-primary text-xs font-black uppercase tracking-widest block">Connect With Us</span>
                <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-[0.9]">
                  Let's Start A <br /> <span className="text-primary italic">Conversation.</span>
                </h2>
                <p className="text-lg text-foreground/50 font-bold max-w-md mt-8 border-l-4 border-primary pl-6 py-2 uppercase tracking-wider">
                  Contact the LMAI secretariat for any inquiries regarding membership, events, or industry regulations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Our Office</span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-primary text-[8px] font-black uppercase">Admin Office</span>
                      <p className="text-sm font-bold text-foreground/60 leading-relaxed uppercase tracking-widest">
                        A418, Mayuresh Trade Center, Plot No 4, Sector 19, Vashi Turbhe Road, Navi Mumbai - 400703. (India)
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-primary text-[8px] font-black uppercase">Register Office</span>
                      <p className="text-sm font-bold text-foreground/60 leading-relaxed uppercase tracking-widest">
                        A419, Mayuresh Trade Center, Plot No 4, Sector 19, Vashi Turbhe Road, Navi Mumbai - 400703. (India)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Email Us</span>
                  </div>
                  <p className="text-sm font-bold text-foreground/60 leading-relaxed uppercase tracking-widest text-[#CB3133]">
                    lmaiorg@gmail.com
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Call Us</span>
                  </div>
                  <p className="text-sm font-bold text-foreground/60 leading-relaxed uppercase tracking-widest">
                    +91 8097333995<br />
                    Mon - Sat: 10:00 - 6:00
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secretariat</span>
                  </div>
                  <p className="text-sm font-bold text-foreground/60 leading-relaxed uppercase tracking-widest text-[#CB3133]">
                    Central Hub<br />
                    Member Support
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Professional Form */}
            <div className="bg-[#0a0a0b] rounded-[3rem] p-12 md:p-16 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] group-hover:bg-primary/30 transition-colors" />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          MAP SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-24 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl group grayscale hover:grayscale-0 transition-all duration-1000 border border-border/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8033706037!2d73.0061!3d19.0725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c139ce6b23b1%3A0xe5110d93540e70b2!2sMayuresh%20Trade%20Center!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>

            <div className="absolute bottom-10 right-10 z-10">
              <Button className="rounded-full bg-white text-black hover:bg-black hover:text-white font-black uppercase text-[10px] tracking-widest px-8 h-12 flex items-center gap-3 transition-all">
                Open in Maps
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
