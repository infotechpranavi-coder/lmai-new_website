"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  CheckCircle2,
  Download,
  Users,
  TrendingUp,
  Globe,
  Zap,
  ShieldCheck,
  Database,
  Search,
  BookOpen,
  BaggageClaim,
  MessageSquare,
  Award,
  Cpu,
  GraduationCap,
  Building2,
  Handshake
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useBanner } from '@/hooks/useBanner';

export default function Membership() {
  const bannerImage = useBanner('Membership', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&q=80');
  const membershipTypes = [
    {
      title: "ORDINARY membership",
      subtitle: "(Printers and Converters only - Roll to Roll)",
      icon: <Users className="w-8 h-8" />,
      color: "bg-primary/5"
    },
    {
      title: "ASSOCIATE membership",
      subtitle: "(Machine and Material suppliers - supplier to the Label industry)",
      icon: <Handshake className="w-8 h-8" />,
      color: "bg-primary/5"
    },
    {
      title: "HONORARY membership",
      subtitle: "(Founder)",
      icon: <Award className="w-8 h-8" />,
      color: "bg-primary/5"
    }
  ];

  const benefits = [
    { text: "Insights on Industry Trends", icon: <TrendingUp className="w-5 h-5" /> },
    { text: "Visibility and exposure", icon: <Globe className="w-5 h-5" /> },
    { text: "Be a part of MSME schemes", icon: <ShieldCheck className="w-5 h-5" /> },
    { text: "Participation in national and international forums", icon: <MessageSquare className="w-5 h-5" /> },
    { text: "Focus on emerging competitiveness", icon: <Zap className="w-5 h-5" /> },
    { text: "Opportunities to enhance visibility", icon: <Search className="w-5 h-5" /> },
    { text: "Opportunity to network, build and share best practices", icon: <Users className="w-5 h-5" /> },
    { text: "Industry Forums", icon: <Building2 className="w-5 h-5" /> },
    { text: "Global Trade Development", icon: <Globe className="w-5 h-5" /> },
    { text: "Policy Advocacy", icon: <Database className="w-5 h-5" /> },
    { text: "Focus on Emerging companies", icon: <TrendingUp className="w-5 h-5" /> },
    { text: "Work for the development of the Domestic Market", icon: <BaggageClaim className="w-5 h-5" /> },
    { text: "Education and Talent Development", icon: <GraduationCap className="w-5 h-5" /> },
    { text: "Partner with LMAI for various activities", icon: <Handshake className="w-5 h-5" /> },
    { text: "Technical workshops and seminars", icon: <Cpu className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full bg-background selection:bg-primary selection:text-white">

      {/* ──────────────────────────────────────────────────────────
          HERO SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
        <Image
          src={bannerImage}
          alt="LMAI Membership Banner"
          fill
          priority
          className="object-cover brightness-[0.3]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/ /</span>
            <span className="text-white">Membership</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
            Membership
          </h1>
          <div className="w-24 h-1.5 bg-primary mt-6 rounded-full" />
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          SECTION 1: HOW TO BECOME A MEMBER
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 space-y-4">
            <span className="text-primary text-xs font-black uppercase tracking-widest">Enrollment Process</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter leading-none">How To <span className="text-primary italic">Become</span> A Member</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            <div className="lg:col-span-12 space-y-8 text-xl text-foreground/70 leading-relaxed font-bold italic">
              <p className="border-l-4 border-primary pl-8">
                If your company is manufacturing self-adhesive labels and related products, or supplying raw materials, or equipment used in the manufacturing of self-adhesive labels and related products, you are eligible for an LMAI membership.
              </p>
              <p className="text-lg font-medium not-italic text-foreground/50">
                The only thing you need to do is to fill in the application form which you can download from section and return it to the LMAI secretariat or you can fill up our online form to apply for Membership.
              </p>
            </div>

            <div className="lg:col-span-12">
              <div className="mb-10 text-primary text-[10px] font-black uppercase tracking-[0.4em]">Membership Types</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {membershipTypes.map((type, i) => (
                  <Card key={i} className="p-10 rounded-[3rem] border-none bg-primary/5 flex flex-col justify-between group hover:bg-primary hover:-translate-y-2 transition-all duration-500 shadow-sm hover:shadow-2xl cursor-pointer">
                    <div className="mb-8 p-4 rounded-2xl bg-white w-fit shadow-sm group-hover:bg-white/10 group-hover:backdrop-blur-md transition-all duration-500">
                      <div className="text-primary group-hover:text-white transition-colors duration-500">
                        {type.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-foreground uppercase tracking-tight mb-4 group-hover:text-white transition-colors duration-500">
                        {type.title}
                      </h4>
                      <p className="text-xs font-bold text-foreground/40 leading-relaxed italic group-hover:text-white/60 transition-colors duration-500">
                        {type.subtitle}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
              <p className="mt-10 text-[10px] text-foreground/30 font-bold uppercase tracking-widest text-center">
                For details you can verify article of association available on request from LMAI secretariat
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          SECTION 2: BENEFITS
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-24 bg-foreground text-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-primary/10 -skew-x-12 translate-x-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <div className="mb-20 space-y-4">
            <span className="text-primary text-xs font-black uppercase tracking-widest">Industry Advantage</span>
            <h3 className="text-4xl md:text-6xl font-black text-background uppercase tracking-tighter leading-none italic">Benefits</h3>
          </div>

          <div className="mb-20 space-y-8 text-xl md:text-2xl font-black text-background/70 tracking-tight leading-tight">
            <p className="border-l-8 border-primary pl-8 text-balance">
              LMAI Membership provides a unique opportunity for an organisation and its professionals to engage and drive thought leadership in activities, forums and industry groups.
            </p>
            <p className="text-lg font-medium text-background/40 tracking-normal leading-relaxed">
              LMAI members address current challenges, build strategies for the future and share best practices, with the overall objective of building a growth-led competitive and sustainable industry.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 h-full">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-4 group h-full">
                <div className="p-3 rounded-xl bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 h-full">
                  {benefit.icon}
                </div>
                <p className="text-sm md:text-base font-black uppercase tracking-tight text-background/60 group-hover:text-primary transition-colors duration-300 h-full">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <Button
              className="h-16 w-full max-w-xl rounded-full bg-primary text-white font-black uppercase text-xs tracking-[0.3em] transition-all duration-500 hover:bg-white hover:text-black hover:-translate-y-1 shadow-xl hover:shadow-primary/40 flex items-center gap-4 group/btn border-2 border-transparent hover:border-white"
              asChild
            >
              <a href="/forms/membership-enrollment.pdf" download>
                Download Membership Form
                <Download className="w-5 h-5 group-hover/btn:translate-y-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </section>



    </div>
  );
}
