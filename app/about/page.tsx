import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Building2,
  Globe,
  Zap,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import Image from 'next/image';
import { getBanners } from '@/lib/data';
import { getOptimizedUrl } from '@/lib/image-utils';

export const revalidate = 3600;

export default async function About() {
  const bannersData = await getBanners('About');
  const bannerImage = bannersData[0]?.image || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174';

  const founders = [
    "Mr. Amit Sheth", "Mr. Surender Kapur", "Mr. Bhavin Kothari", "Mr. Vivek Kapoor",
    "Mr. Sandeep Zaveri", "Mr. Kuldip Goel", "Mr. Rajesh Chadha", "Mr. Manish Desai"
  ];

  return (
    <div className="w-full bg-background selection:bg-primary selection:text-white pb-20">

      {/* ──────────────────────────────────────────────────────────
          HERO SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="relative h-[500px] md:h-[650px] w-full overflow-hidden">
        <Image
          src={getOptimizedUrl(bannerImage, { width: 1600 })}
          alt="LMAI Banner"
          fill
          priority
          className="object-cover brightness-[0.7]"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
              About <span className="text-primary italic">LMAI</span>
            </h1>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
            <p className="text-white/70 text-lg md:text-xl font-bold uppercase tracking-widest">The Soul of Label Manufacturing in India</p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          SECTION 1: OVERVIEW
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4 block">Institutional History</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none mb-10">Overview</h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-8 space-y-8 text-xl text-foreground/70 leading-relaxed font-bold">
                <p>
                  LMAI – Label Manufacturers Association Of India – is a central body incorporated to promote the Label manufacturers and their suppliers across India. Founded in 2002 duly initiated by <strong className="text-primary">Mr. Amit Sheth</strong> with handful of Entrepreneurs who together instrumented which includes captains of Industry like <strong className="text-foreground">Mr.Surender Kapur, Mr.Bhavin Kothari, Mr.Vivek Kapoor, Mr.Sandeep Zaveri, Mr.Kuldip Goel, Mr.Rajesh Chadha and Mr.Manish Desai</strong> which has its success script till date worth reckoning.
                </p>
                <p>
                  It boasts of over 270 profound members. LMAI is proud to have its Administrative and Registered office in <strong className="text-foreground">Navi Mumbai</strong>. The association is blessed with the support of highly experienced professional team on the board who keep on organising technical Seminars / Workshops and has organized their annual Conference on alternate years along with <strong className="text-primary">LMAI Label Awards & Competition</strong> on Top class international quality where the Winners are not only recognized nationally but further supported to compete in World Label Competition where the forum itself is huge and received the accolades in their stride.
                </p>
                <p>
                  LMAI is proudly associated with Global Forums like <strong className="text-foreground">FINAT, L9 , WLA</strong> . LMAI is also a bonafide listed in <strong className="text-foreground">Ministry of MSME , Govt.of India</strong>. LMAI is a hub where individual manufacturers confer to emerge with better governance techniques, foreign investment decisions, laws, technology and management strategies.
                </p>
                <p className="italic text-foreground/40 text-lg font-black uppercase border-l-4 border-primary pl-6">
                  "The agenda is to be a par with the global giants. With competition & opportunity both rising at a zooming pace, the challenge is to be smart and rise every moment."
                </p>
              </div>

              {/* Highlight Cards for Overview */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-8 rounded-[2.5rem] bg-secondary/50 border border-border">
                  <h4 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-6">Founding Board</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {founders.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs font-black uppercase text-foreground/60 tracking-tight">
                        <CheckCircle2 className="w-4 h-4 text-primary" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 rounded-[3rem] bg-primary text-white shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 transition-transform duration-700">
                    <Building2 className="w-16 h-16" />
                  </div>
                  <div className="text-4xl font-black mb-1">270+</div>
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Profound Members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          SECTION 2: GENERAL VIEW — Cards beneath the text
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-24 bg-secondary/10 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4">
            <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4 block">Market Dynamics</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none">General View Towards <br /> the <span className="text-primary italic">Label Industry</span></h2>
          </div>

          {/* Primary Text Narrative */}
          <div className="max-w-5xl space-y-10 text-xl font-bold text-foreground/60 leading-relaxed mb-20 italic">
            <p>
              With modernization of the Indian economy coming in the big way, the demand for modern packaging and labels has been rising extraordinary in the past years, Since the opening up of the Indian market, the label industry has been growing with around 24% annually.
            </p>
            <p>
              A host of printing companies have entered the market and offer labels for food, beverages, cosmetics and other consumer goods labeled with modern stocks and customer-oriented design. Competition from foreign companies together with a change in consumer behavior are forcing Indian manufacturers of consumer goods to modernize their products and understand the Importance of a labels to be produced locally in the Nation, and expect the same quality and service standards available in developed nations.
            </p>
            <p>
              This throws up a lot of challenges to the Indian label. Industry, beginning from evaluating and implementing cutting edge, research to make world class labels, high investment and increasing costs make profit more challenging.
            </p>
          </div>

          {/* IMPACT CARDS - BENEATH THE TEXT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-10 rounded-[3rem] bg-white border border-border shadow-xl shadow-primary/5 group hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="text-6xl font-black text-primary mb-4 italic tracking-tighter">24%</div>
              <h4 className="text-sm font-black uppercase tracking-widest text-foreground mb-4">Annual Growth</h4>
              <p className="text-xs text-foreground/50 font-bold leading-relaxed">Rising extraordinary demand for modern packaging since the market opened up.</p>
            </div>

            <div className="p-10 rounded-[3rem] bg-white border border-border shadow-xl shadow-primary/5 group hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 rounded-3xl bg-secondary flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tighter">Global Standards</h4>
              <p className="text-xs text-foreground/50 font-bold leading-relaxed">Expecting the same quality and service standards available in developed nations across food, beverage, and cosmetics.</p>
            </div>

            <div className="p-10 rounded-[3rem] bg-foreground text-background shadow-2xl group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden flex flex-col justify-start">
              <Zap className="w-20 h-20 absolute -bottom-4 -right-4 opacity-10 group-hover:scale-125 transition-transform" />
              <h4 className="text-2xl font-black mb-6 uppercase tracking-tighter">The Challenge</h4>
              <p className="text-xs text-background/50 font-bold leading-relaxed mb-6 italic">
                "The Indian Label Industry, has risen well to the challenge, but has a long way to go to be internationally recognized for quality and infrastructure and to compete globally."
              </p>
              <div className="text-[10px] font-black uppercase text-primary tracking-widest mt-auto">Infrastructure & Quality Focus</div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          SECTION 3: VISION INDIA
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 space-y-4">
            <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4 block">National Ambition</span>
            <h2 className="text-4xl md:text-6xl font-black text-foreground uppercase tracking-tighter leading-none">Vision <span className="text-primary italic">India</span></h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 text-xl font-bold text-foreground/70 leading-relaxed">
              <p className="text-3xl font-black text-foreground leading-[1.1] tracking-tighter italic border-l-8 border-primary pl-8">
                "India is a land of passionate individuals. Be it in any sector, any place in the world, Indians & India are booming."
              </p>
              <p>
                While the world is down with recession, India has slowly and steadily dreamt for more, India attitude is at a new high. The label industry has played a crucial role in India's success story. Today, LMAI is proud to represent <strong className="text-foreground underline decoration-primary lg:text-3xl text-balance">over 150 label manufacturers</strong> spread across India.
              </p>
              <p>
                Thanks to the right attitude shown towards global technology, quality, regulations, ethics and competition, most of the label manufacturers cater to international clients. The LMAI members are confidently participating in the exhibitions globally and are winning awards & accolades for quality & service.
              </p>
              <h3 className="text-4xl font-black text-primary uppercase tracking-tighter leading-none">
                India vision is to keep growing. <br /> <span className="text-foreground/30 italic">Yes its every Indian's vision too.</span>
              </h3>
            </div>

            <div className="relative">
              <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative aspect-square max-w-[500px] mx-auto rounded-[5rem] overflow-hidden border-8 border-secondary group hover:rotate-2 transition-transform duration-1000">
                <Image
                  src={getOptimizedUrl("https://images.unsplash.com/photo-1532375810709-75b1da00537c", { width: 800 })}
                  alt="Vision India Growth"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-black to-transparent">
                  <div className="text-6xl mb-4 grayscale group-hover:grayscale-0 transition-all">🇮🇳</div>
                  <p className="text-white font-black uppercase tracking-[0.3em] text-xs">A Land of Passionate Professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          SECTION 4: TECHNOLOGY ADOPTION
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-24 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">Transformation Strategy</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-12">
              Technology <span className="text-primary italic">Adoption</span>
            </h2>

            <div className="space-y-16">
              <p className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tighter italic text-primary">
                An American entrepreneur once said, "Innovation distinguishes between a leader and a follower". Inspired by it, we at LMAI believe it's the cutting-edge technology that will empower us to deliver cutting-edge label solutions.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10 text-base md:text-lg font-medium text-white/50 leading-relaxed">
                <div className="space-y-6">
                  <p>
                    Our working approach is very structured. We regularly conduct a <strong className="text-white">detailed study</strong> of the label users requirements in different parts of the world – the product features, the shelf life, distribution, handling and storage operations, the data capture opportunities, the counterfeiting issues etc.
                  </p>
                </div>
                <div className="space-y-6">
                  <p>
                    We actively monitor the technology & product developments, and the environmental & regulatory issues. Our association with premier technical institutes has empowered our members with futuristic technical skills. We invest in encyclopedias and international journals.
                  </p>
                  <p>
                    Our monthly newsletters & meetings share information about the latest IT Systems related to marketing & supply chain management. We motivate our members to participate in international label shows organized by <strong className="text-primary uppercase font-black">FINAT & GIPEA</strong>.
                  </p>
                </div>
              </div>

              <div className="pt-10">
                <div className="p-10 rounded-3xl bg-white/5 border border-white/10 inline-block">
                  <h4 className="text-3xl font-black text-primary uppercase tracking-tighter leading-none mb-4 italic">Our agenda is to win.</h4>
                  <p className="text-xs uppercase font-black tracking-widest text-white/30">
                    Continuously transforming our members into creative and techno savvy professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
