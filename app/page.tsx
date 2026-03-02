import Link from 'next/link';
import Image from 'next/image';
import HeroCarousel from '@/components/HeroCarousel';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Award,
  Users,
  Newspaper,
  Presentation,
  ArrowRight,
  TrendingUp,
  Zap,
  Star,
  Globe,
  CheckCircle2,
  ChevronRight,
  Play,
  Calendar,
  Loader2
} from 'lucide-react';
import { getBanners, getEvents, getAwards } from '@/lib/data';
import { getOptimizedUrl } from '@/lib/image-utils';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const [bannersData, eventsData, awardsData] = await Promise.all([
    getBanners('Home'),
    getEvents(),
    getAwards()
  ]);

  const homeBanners = bannersData.map((b: any) => ({
    id: b._id.toString(),
    image: b.image,
    tag: 'Official Update',
    title: b.title,
    subtitle: b.subtitle,
    cta: 'Learn More'
  }));

  const eventsCount = eventsData.length;
  const awardsCount = awardsData.length;
  const featuredEvents = eventsData.filter((e: any) => e.type === 'upcoming').slice(0, 3);

  return (
    <div className="w-full bg-background overflow-x-hidden">

      {/* ═══════════════════════════════════════════════
          HERO SECTION — full-width moving banner
      ═══════════════════════════════════════════════ */}
      <section className="w-full">
        <HeroCarousel initialSlides={homeBanners} />
      </section>

      {/* ═══════════════════════════════════════════════
          KEY STATS — glassy pill band
      ═══════════════════════════════════════════════ */}
      <section className="relative py-12">
        <div className="bg-primary mx-4 sm:mx-8 lg:mx-16 rounded-3xl shadow-xl shadow-primary/30 overflow-hidden">
          {/* Subtle shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-8 sm:px-12 py-12 relative">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20 gap-0">
              {[
                { stat: '1,000+', label: 'Active Members', icon: Users },
                { stat: `${eventsCount}+`, label: 'Total Events', icon: Zap },
                { stat: `${awardsCount}+`, label: 'Awards Won', icon: Award },
              ].map(({ stat, label, icon: Icon }, idx) => (
                <div key={idx} className="flex flex-col items-center justify-center py-4 sm:py-0 sm:px-12 text-center gap-2">
                  <Icon className="w-8 h-8 text-white/70 mb-1" />
                  <div className="text-4xl md:text-5xl font-bold text-white">{stat}</div>
                  <p className="text-primary-foreground/80 text-base font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          JOURNEY TRACK — 3 stages of formation
      ═══════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden">
        {/* Light dot-pattern background */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--color-primary) 1.5px, transparent 1.5px)',
            backgroundSize: '30px 30px',
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          {/* Section header */}
          <div className="text-center mb-20">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-3">
              How We Were Formed
            </h2>
            <p className="text-lg text-foreground/55 max-w-2xl mx-auto">
              Three defining stages that shaped our organisation into the thriving professional community it is today.
            </p>
          </div>

          {/* Track with 3 cards */}
          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-[72px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5 bg-gradient-to-r from-primary via-accent to-primary z-0" />

            {/* Animated moving dot on the line */}
            <div className="hidden md:block absolute top-[68px] left-[calc(16.67%+20px)] z-10">
              <div className="w-3 h-3 rounded-full bg-primary shadow-md shadow-primary/50 animate-bounce" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-stretch">
              {[
                {
                  stage: '01',
                  label: 'Formation',
                  year: '2002',
                  title: 'Formation of LMAI',
                  desc: 'Founded in 2002 duly initiated by Mr. Amit Sheth with a handful of Entrepreneurs to recognize and promote the Label manufacturers across India.',
                  color: 'from-primary/20 to-primary/5',
                  iconBg: 'bg-primary',
                  highlights: ['Narrow web production', 'Letterpress & flexo technology', 'Self adhesive label industry'],
                },
                {
                  stage: '02',
                  label: 'Recognition',
                  year: '2009',
                  title: 'Awards',
                  desc: 'LMAI has received three trophies from World Label Award 2009 which our following proud bonafied members have won in the last competition held at Brussels in September 2009.',
                  color: 'from-accent/20 to-accent/5',
                  iconBg: 'bg-accent',
                  highlights: ['3 trophies at World Label Award', 'Competition held in Brussels', 'September 2009'],
                },
                {
                  stage: '03',
                  label: 'Trust',
                  year: 'Policy',
                  title: 'Privacy Policy',
                  desc: 'We believe it is important that you know how we treat the information about you, we receive from you, on the Internet. Our privacy policy is straightforward.',
                  color: 'from-primary/20 to-accent/10',
                  iconBg: 'bg-gradient-to-br from-primary to-accent',
                  highlights: ['Transparent data handling', 'Your information protected', 'Straightforward policy'],
                },
              ].map((item, idx) => (
                <Link key={idx} href="/formation" className="flex flex-col items-center group cursor-pointer h-full">
                  {/* Step number circle */}
                  <div className={`relative w-16 h-16 rounded-full ${item.iconBg} flex items-center justify-center text-white text-xl font-black shadow-lg mb-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 z-20`}>
                    {item.stage}
                    {/* Pulse ring */}
                    <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping opacity-30" />
                  </div>

                  {/* Card */}
                  <div className="w-full flex-1 flex flex-col rounded-3xl border border-primary/15 p-8 transition-all duration-300 bg-primary/8 shadow-lg shadow-primary/10 group-hover:bg-primary group-hover:border-primary group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/40">
                    {/* Year chip */}
                    <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-bold mb-4 shadow-sm transition-colors duration-300 bg-primary text-white group-hover:bg-white group-hover:text-primary">
                      {item.year}
                    </span>

                    {/* Stage label */}
                    <p className="text-xs font-bold uppercase tracking-widest mb-1 transition-colors duration-300 text-primary group-hover:text-white/70">{item.label}</p>

                    {/* Title */}
                    <h3 className="text-2xl font-black mb-3 transition-colors duration-300 text-foreground group-hover:text-white">{item.title}</h3>

                    {/* Description */}
                    <p className="text-sm leading-relaxed mb-6 transition-colors duration-300 text-foreground/60 group-hover:text-white/80">{item.desc}</p>

                    {/* Highlights list */}
                    <ul className="space-y-2 mb-6">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm transition-colors duration-300 text-foreground/70 group-hover:text-white/85">
                          <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 bg-primary/20 border border-primary/40 group-hover:bg-white/20 group-hover:border-white/40">
                            <span className="w-1.5 h-1.5 rounded-full transition-colors duration-300 bg-primary group-hover:bg-white" />
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Read More link */}
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold transition-all duration-300 group-hover:gap-3 text-primary group-hover:text-white">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          FEATURED EVENTS SECTION
      ────────────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-secondary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                <Star className="w-3 h-3 fill-primary" />
                Special Events
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-foreground tracking-tight">
                Featured <span className="text-primary">Events</span>
              </h2>
              <p className="text-lg text-foreground/50 max-w-xl">
                Elevate your professional journey by attending our curated selection of high-impact gatherings and networking power-sessions.
              </p>
            </div>
            <Link href="/events">
              <Button variant="ghost" className="group self-start md:self-auto rounded-full text-primary font-bold hover:bg-primary/10 px-6">
                View All Events <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              <div className="md:col-span-8 group relative overflow-hidden rounded-[2.5rem] bg-card border border-border hover:border-primary/30 transition-all duration-500 shadow-xl shadow-primary/5 hover:shadow-primary/20">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[450px]">
                  <div className="relative overflow-hidden h-64 lg:h-auto">
                    <Image
                      src={getOptimizedUrl(featuredEvents[0].coverImage || "https://images.unsplash.com/photo-1540575467063-178a50c2df87", { width: 800 })}
                      alt={featuredEvents[0].title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-4 text-center shadow-2xl min-w-[70px]">
                      <p className="text-xs font-bold text-white uppercase tracking-tighter">Event</p>
                      <p className="text-2xl font-black text-white leading-none whitespace-nowrap">{featuredEvents[0].date?.split(',')[0].slice(0, 3) || 'TBA'}</p>
                    </div>
                  </div>

                  <div className="p-10 flex flex-col justify-between">
                    <div>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-6 inline-block">
                        {featuredEvents[0].category || 'Featured'}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                        {featuredEvents[0].title}
                      </h3>
                      <p className="text-foreground/60 leading-relaxed mb-8 line-clamp-3">
                        {featuredEvents[0].description}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center gap-2 text-sm text-foreground/50 bg-secondary/50 px-3 py-1.5 rounded-xl border border-border">
                          <Calendar className="w-4 h-4 text-primary" />
                          <span>{featuredEvents[0].date}</span>
                        </div>
                      </div>
                    </div>

                    <Link href={`/events/${featuredEvents[0]._id}`}>
                      <Button className="w-full lg:w-max px-8 py-6 rounded-2xl bg-primary text-primary-foreground font-bold hover:shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1 uppercase tracking-widest text-[10px]">
                        Details <ArrowUpRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col gap-8">
                {featuredEvents.slice(1, 3).map((event, i) => (
                  <Link key={event._id?.toString() || i} href={`/events/${event._id}`} className="flex-1 group relative overflow-hidden rounded-[2rem] border border-border bg-card hover:border-primary/30 transition-all duration-500 shadow-lg shadow-primary/5 hover:-translate-y-1">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={getOptimizedUrl(event.coverImage || "https://images.unsplash.com/photo-1515187029135-18ee286d815b", { width: 600 })}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-black text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">{event.title}</h4>
                      <p className="text-xs text-foreground/50 flex items-center gap-2 mb-4">
                        <Calendar className="w-3 h-3 text-primary" />
                        {event.date}
                      </p>
                      <span className="text-primary text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
                {featuredEvents.length < 3 && (
                  <div className="flex-1 rounded-[2rem] border-2 border-dashed border-border flex items-center justify-center p-8 text-center bg-secondary/5">
                    <p className="text-foreground/30 text-xs font-black uppercase tracking-widest">More events coming soon</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-24 bg-secondary/10 rounded-[3rem]">
              <p className="text-foreground/40 font-black uppercase tracking-[0.2em]">Check back later for upcoming highlights.</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          AWARDS & RECOGNITION — vibrant cards
      ═══════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-primary relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <span className="text-primary-foreground/70 text-sm font-bold uppercase tracking-widest">Celebrating Excellence</span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mt-2 mb-3">Recognition &amp; Awards</h2>
            <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto">
              Honouring outstanding achievements that shape the future of our industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Award, title: 'Total Awards Hosted', desc: 'Recognising forward-thinking solutions that push boundaries.', num: awardsCount },
              { icon: TrendingUp, title: 'Leadership Excellence', desc: 'Honouring visionary leaders who inspire transformation.', num: '8' },
              { icon: Users, title: 'Community Impact', desc: 'Celebrating collaborative achievements that uplift societies.', num: '20' },
            ].map(({ icon: Icon, title, desc, num }, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <div className="w-16 h-16 mx-auto mb-5 bg-white/20 rounded-2xl flex items-center justify-center group-hover:bg-white/30 transition-colors group-hover:scale-110 duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-black text-white mb-1">{`${num}+`}</div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/awards">
              <Button className="rounded-full bg-white text-primary hover:bg-black hover:text-white font-black uppercase text-[10px] tracking-widest h-14 px-10 transition-all duration-500">
                Explore Awards Gallery <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          LEADERSHIP — centered vision layout
      ═══════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--color-primary) 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="max-w-4xl mx-auto relative text-center">
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-6">
                <Users className="w-4 h-4" />
                Collective Excellence
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-[1.1] tracking-tight">
                Driven by a Visionary <span className="text-primary italic">Leadership</span> Board
              </h2>
              <p className="text-xl text-foreground/50 leading-relaxed max-w-2xl mx-auto">
                Our organisation is guided by a diverse panel of industry veterans, innovators, and strategic thinkers committed to the sustainable growth of our professional community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              {[
                {
                  title: 'Strategic Oversight',
                  desc: 'Navigating long-term industry trends with precision.',
                  icon: TrendingUp
                },
                {
                  title: 'Global Mentorship',
                  desc: 'Fostering the next generation of industry leaders.',
                  icon: Globe
                },
                {
                  title: 'Shared Innovation',
                  desc: 'Driving collaborative research and development.',
                  icon: Zap
                }
              ].map((item, idx) => (
                <div key={idx} className="group p-6 rounded-[2rem] bg-card border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Button asChild className="h-16 px-10 rounded-full bg-primary text-primary-foreground font-black text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all">
                <Link href="/management">
                  Meet the Full Board <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <p className="mt-6 text-sm text-foreground/40 font-medium uppercase tracking-widest">
                Professional directors contributing to our excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function ArrowUpRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}
