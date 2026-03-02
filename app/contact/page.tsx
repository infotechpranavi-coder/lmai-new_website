"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock, ArrowRight, Send, CheckCircle2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useBanner } from '@/hooks/useBanner';

export default function Contact() {
  const bannerImage = useBanner('Contact', 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/dashboard/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error("Enquiry failed", err);
      setStatus('error');
    }
  };

  return (
    <div className="w-full bg-background selection:bg-primary selection:text-white">

      {/* ──────────────────────────────────────────────────────────
          HERO SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <Image
          src={bannerImage}
          alt="Contact LMAI"
          fill
          priority
          className="object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/ /</span>
            <span className="text-white">Contact</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
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

              {status === 'success' ? (
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-widest mb-2">Message Sent</h3>
                    <p className="text-sm text-white/50 font-bold uppercase tracking-widest leading-relaxed">Thank you for reaching out. The secretariat will contact you shortly.</p>
                  </div>
                  <Button onClick={() => setStatus('idle')} variant="outline" className="rounded-full border-white/20 text-white hover:bg-white hover:text-black font-black uppercase text-[10px] tracking-widest h-12 px-8">Send Another</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="ENTER YOUR NAME"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-primary transition-colors font-black text-xs tracking-widest placeholder:text-white/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="EMAIL@COMPANY.COM"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-primary transition-colors font-black text-xs tracking-widest placeholder:text-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Subject</label>
                      <input
                        required
                        type="text"
                        placeholder="INQUIRY TYPE"
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-primary transition-colors font-black text-xs tracking-widest placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="HOW CAN WE ASSIST YOU?"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-primary transition-colors font-black text-xs tracking-widest placeholder:text-white/30 resize-none"
                    />
                  </div>

                  <Button
                    disabled={status === 'loading'}
                    className="w-full h-16 rounded-full bg-white text-black hover:bg-primary hover:text-white font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-4 px-10 group/btn transition-all duration-500 shadow-xl shadow-black/20"
                  >
                    {status === 'loading' ? (
                      <>Processing... <Loader2 className="w-4 h-4 animate-spin" /></>
                    ) : (
                      <>Submit Inquiry <Send className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" /></>
                    )}
                  </Button>
                  {status === 'error' && (
                    <p className="text-primary text-[10px] font-black uppercase tracking-widest">Failed to send. Please try again.</p>
                  )}
                </form>
              )}
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
