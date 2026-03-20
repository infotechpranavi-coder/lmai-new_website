"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    BarChart3,
    Users,
    Newspaper,
    Calendar,
    Settings,
    LogOut,
    LayoutDashboard,
    ShieldCheck,
    Lock,
    User,
    ArrowRight,
    ImagePlus,
    Trash2,
    Plus,
    Edit,
    Images,
    ExternalLink,
    ChevronLeft,
    Upload,
    Link as LinkIcon,
    Trophy,
    FileUp,
    Download,
    Video,
    Shield,
    Mail,
    CheckCircle2,
    Clock3,
    Search,
    Filter,
    Loader2
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { initialBanners, initialEvents, initialAwards, initialNewsletters, initialPresentations, initialManagement, initialEnquiries } from './data';

export default function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedPage, setSelectedPage] = useState('Home');
    const [eventCategory, setEventCategory] = useState<'upcoming' | 'past'>('upcoming');
    const [managementCategory, setManagementCategory] = useState<'boardOfDirectors' | 'lmaiForce' | 'pastPresidents'>('boardOfDirectors');


    // UI States for Forms
    const [isEditingEvent, setIsEditingEvent] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<any>(null);
    const [isAddingBanner, setIsAddingBanner] = useState(false);
    const [bannerForm, setBannerForm] = useState({ title: '', subtitle: '', image: '', method: 'link' as 'link' | 'file' });
    const [isEditingAward, setIsEditingAward] = useState(false);
    const [currentAward, setCurrentAward] = useState<any>(null);
    const [isEditingNewsletter, setIsEditingNewsletter] = useState(false);
    const [currentNewsletter, setCurrentNewsletter] = useState<any>(null);
    const [isEditingPresentation, setIsEditingPresentation] = useState(false);
    const [currentPresentation, setCurrentPresentation] = useState<any>(null);
    const [isEditingMember, setIsEditingMember] = useState(false);
    const [currentMember, setCurrentMember] = useState<any>(null);


    const fileInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);
    const pdfInputRef = useRef<HTMLInputElement>(null);

    // States with Imported Initial Data
    const [banners, setBanners] = useState(initialBanners);
    const [eventsData, setEventsData] = useState(initialEvents);
    const [awardsData, setAwardsData] = useState(initialAwards);
    const [newslettersData, setNewslettersData] = useState(initialNewsletters);
    const [presentationsData, setPresentationsData] = useState(initialPresentations);
    const [managementData, setManagementData] = useState(initialManagement);
    const [enquiriesData, setEnquiriesData] = useState(initialEnquiries);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Fetch Data on Component Mount
    useEffect(() => {
        if (isLoggedIn) {
            fetchAllData();
        }
    }, [isLoggedIn]);

    const fetchAllData = async () => {
        setIsLoading(true);
        try {
            const [b, e, a, n, p, m, enq] = await Promise.all([
                fetch('/api/dashboard/banners').then(res => res.json()),
                fetch('/api/dashboard/events').then(res => res.json()),
                fetch('/api/dashboard/awards').then(res => res.json()),
                fetch('/api/dashboard/newsletters').then(res => res.json()),
                fetch('/api/dashboard/presentations').then(res => res.json()),
                fetch('/api/dashboard/members').then(res => res.json()),
                fetch('/api/dashboard/enquiries').then(res => res.json()),
            ]);

            // Transform banners back to page-grouped object
            const groupedBanners: any = {
                'Home': [], 'About': [], 'Membership': [], 'Events': [],
                'Awards': [], 'Newsletters': [], 'Presentations': [],
                'Management': [], 'Contact': []
            };
            b.forEach((banner: any) => {
                if (groupedBanners[banner.page]) {
                    groupedBanners[banner.page].push(banner);
                }
            });
            setBanners(groupedBanners);

            // Transform events to upcoming/past
            const groupedEvents: any = { upcoming: [], past: [] };
            e.forEach((event: any) => {
                if (event.type === 'upcoming') groupedEvents.upcoming.push(event);
                else groupedEvents.past.push(event);
            });
            setEventsData(groupedEvents);

            setAwardsData(a);
            setNewslettersData(n);
            setPresentationsData(p);

            // Transform members back to category-grouped object
            const groupedMembers: any = { boardOfDirectors: [], lmaiForce: [], pastPresidents: [] };
            m.forEach((member: any) => {
                if (groupedMembers[member.category]) groupedMembers[member.category].push(member);
            });
            setManagementData(groupedMembers);

            setEnquiriesData(enq);
        } catch (err) {
            toast.error("Failed to sync with database");
        } finally {
            setIsLoading(false);
        }
    };



    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (userId === 'admin' && password === 'admin123') {
            setIsLoggedIn(true);
            setError('');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserId('');
        setPassword('');
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            toast.error("File exceeds 10MB limit. Please compress or provide an external URL.");
            e.target.value = '';
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.url) {
                callback(data.url);
                toast.success("Image uploaded successfully");
            } else {
                toast.error("Upload failed");
            }
        } catch (err) {
            toast.error("Cloudinary connection error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || !currentEvent) return;

        const largeFiles = Array.from(files).filter(f => f.size > 10 * 1024 * 1024);
        if (largeFiles.length > 0) {
            toast.error("One or more files exceed the 10MB limit.");
            e.target.value = '';
            return;
        }

        setIsLoading(true);
        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                const data = await res.json();
                return data.url;
            });

            const newUrls = await Promise.all(uploadPromises);
            setCurrentEvent({
                ...currentEvent,
                gallery: [...(currentEvent.gallery || []), ...newUrls.filter(u => u)]
            });
            toast.success(`${newUrls.length} images added to gallery`);
        } catch (err) {
            toast.error("Gallery upload failed");
        } finally {
            setIsLoading(false);
        }
    };

    const genericSave = async (type: string, data: any, id?: string) => {
        setIsLoading(true);
        try {
            const url = id ? `/api/dashboard/${type}/${id}` : `/api/dashboard/${type}`;
            const method = id ? 'PATCH' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                toast.success(`${type.slice(0, -1)} saved successfully`);
                fetchAllData();
                return true;
            }
            throw new Error();
        } catch (err) {
            toast.error(`Failed to save ${type}`);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const genericDelete = async (type: string, id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/dashboard/${type}/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Item removed');
                fetchAllData();
            } else {
                throw new Error();
            }
        } catch (err) {
            toast.error('Deletion failed');
        } finally {
            setIsLoading(false);
        }
    };


    if (!isLoggedIn) {
        return (
            <div className="min-h-screen w-full bg-[#0a0a0b] flex items-center justify-center p-4 selection:bg-primary selection:text-white">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
                </div>
                <Card className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border-white/10 p-12 rounded-[3rem] shadow-2xl relative z-10">
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-primary/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-primary/20">
                            <ShieldCheck className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Admin <span className="text-primary italic">Portal</span></h1>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">LMAI - Label Manufacturers Association of India</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">User ID</label>
                            <div className="relative">
                                <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                <input
                                    type="text"
                                    value={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    placeholder="USERNAME"
                                    className="w-full bg-transparent border-b border-white/10 pl-8 py-4 outline-none focus:border-primary transition-colors font-black text-xs tracking-widest placeholder:text-white/10 text-white"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-transparent border-b border-white/10 pl-8 py-4 outline-none focus:border-primary transition-colors font-black text-xs tracking-widest placeholder:text-white/10 text-white"
                                    required
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center animate-pulse">{error}</p>}
                        <Button type="submit" className="w-full h-16 rounded-full bg-white text-black hover:bg-primary hover:text-white font-black uppercase text-xs tracking-[0.3em] transition-all duration-500 flex items-center justify-between px-10 group shadow-xl">
                            Enter Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </form>
                </Card>
            </div>
        );
    }

    return (
        <div className="h-screen overflow-hidden bg-gray-50 flex flex-col md:flex-row selection:bg-primary selection:text-white">

            {/* Sidebar Navigation */}
            <aside className="h-full w-full md:w-80 bg-[#0a0a0b] text-white p-8 flex flex-col items-center md:items-start shrink-0 z-20 overflow-hidden border-r border-white/5">
                <div className="mb-16 flex flex-col items-center md:items-start shrink-0">
                    <span className="text-2xl font-black text-primary uppercase tracking-tighter leading-none mb-1">
                        LMAI <span className="text-white">Admin</span>
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/40">Console Panel v1.0</span>
                </div>

                <div className="w-full flex-grow overflow-y-auto no-scrollbar mb-8 pr-2">
                    <nav className="w-full space-y-2">
                        {[
                            { id: 'overview', name: 'Overview', icon: LayoutDashboard },
                            { id: 'banners', name: 'Banner Management', icon: ImagePlus },
                            { id: 'events', name: 'Manage Events', icon: Calendar },
                            { id: 'awards', name: 'Awards Archive', icon: Trophy },
                            { id: 'newsletters', name: 'Newsletters', icon: Newspaper },
                            { id: 'presentations', name: 'Presentations', icon: Video },
                            { id: 'members', name: 'Member List', icon: Users },
                            { id: 'enquiries', name: 'Member Enquiries', icon: Mail },
                            { id: 'settings', name: 'Settings', icon: Settings },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setIsEditingEvent(false);
                                    setIsAddingBanner(false);
                                    setIsEditingAward(false);
                                    setIsEditingNewsletter(false);
                                    setIsEditingPresentation(false);
                                    setIsEditingMember(false);
                                }}
                                className={cn(
                                    "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300",
                                    activeTab === item.id
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-white/40 hover:text-white hover:bg-white/5'
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="w-full pt-4 border-t border-white/5 shrink-0">
                    <button onClick={handleLogout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/10 transition-all">
                        <LogOut className="w-4 h-4" /> Log Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="h-full flex-grow p-6 md:p-12 overflow-y-auto relative bg-[#fcfcfd]">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter leading-none">
                            {activeTab === 'events' && isEditingEvent ? 'Event Edit' : (activeTab === 'banners' && isAddingBanner ? 'Add Banner' : activeTab)} <span className="text-primary italic">Panel</span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black uppercase tracking-widest text-foreground">Sandeep Zaveri</p>
                            <p className="text-[8px] font-bold text-primary uppercase tracking-widest">LMAI PRESIDENT</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-border p-1">
                            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="P" width={100} height={100} className="rounded-xl object-cover grayscale" />
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">

                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Total Members', value: '1,248', delta: '+12%', icon: Users },
                                { label: 'Live Events', value: '04', delta: 'This Month', icon: Calendar },
                                { label: 'Newsletter Opens', value: '3.2k', delta: '+5%', icon: Newspaper },
                                { label: 'Pending Apps', value: '18', delta: 'Requires Action', icon: BarChart3 },
                            ].map((stat, i) => (
                                <Card key={i} className="p-8 rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                            <stat.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">{stat.delta}</span>
                                    </div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-2">{stat.label}</h4>
                                    <p className="text-4xl font-black text-foreground uppercase tracking-tighter">{stat.value}</p>
                                </Card>
                            ))}
                        </div>
                    )}

                    {activeTab === 'banners' && (
                        <div className="space-y-12">
                            {isAddingBanner ? (
                                <div className="animate-in slide-in-from-right-8 duration-500">
                                    <button onClick={() => setIsAddingBanner(false)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-primary transition-colors mb-8">
                                        <ChevronLeft className="w-4 h-4" /> Back to Assets
                                    </button>
                                    <Card className="p-12 md:p-16 rounded-[3rem] border-none shadow-xl bg-white space-y-12">
                                        <div className="max-w-xl">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black uppercase text-foreground/30">Banner Media</label>
                                                <div className="flex gap-2 p-1 bg-gray-100 rounded-full w-fit">
                                                    <button onClick={() => setBannerForm({ ...bannerForm, method: 'link' })} className={cn("px-6 py-2 rounded-full text-[8px] font-black uppercase tracking-widest transition-all", bannerForm.method === 'link' ? 'bg-primary text-white shadow-md' : 'text-foreground/40')}>URL Link</button>
                                                    <button onClick={() => setBannerForm({ ...bannerForm, method: 'file' })} className={cn("px-6 py-2 rounded-full text-[8px] font-black uppercase tracking-widest transition-all", bannerForm.method === 'file' ? 'bg-primary text-white shadow-md' : 'text-foreground/40')}>Local File</button>
                                                </div>
                                                {bannerForm.method === 'link' ? (
                                                    <div key="link-input" className="relative">
                                                        <input type="text" placeholder="HTTPS://UNSPLASH.COM/PHOTO..." className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all font-black text-xs tracking-widest pr-16" value={bannerForm.image || ''} onChange={e => setBannerForm({ ...bannerForm, image: e.target.value })} />
                                                        <LinkIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                                                    </div>
                                                ) : (
                                                    <div key="file-input" onClick={() => fileInputRef.current?.click()} className="w-full h-32 rounded-2xl border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group relative">
                                                        <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={e => handleFileUpload(e, (url) => setBannerForm({ ...bannerForm, image: url }))} />
                                                        {bannerForm.image ? (
                                                            <div className="relative w-full h-full p-2">
                                                                <Image src={bannerForm.image} alt="prev" fill className="object-cover rounded-xl" />
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <Upload className="w-6 h-6 text-foreground/20 group-hover:text-primary transition-colors mb-2" />
                                                                <span className="text-[8px] font-black uppercase tracking-widest text-foreground/40">Drop or Click to Upload</span>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-4 pt-8 border-t border-gray-100 font-black">
                                            <Button onClick={() => setIsAddingBanner(false)} variant="outline" className="rounded-full h-12 px-10 text-[10px] tracking-widest border-2 uppercase">Cancel</Button>
                                            <Button onClick={async () => {
                                                const success = await genericSave('banners', { ...bannerForm, page: selectedPage });
                                                if (success) {
                                                    setIsAddingBanner(false);
                                                    setBannerForm({ title: '', subtitle: '', image: '', method: 'link' });
                                                }
                                            }} className="rounded-full h-12 px-12 bg-primary text-white text-[10px] tracking-widest uppercase shadow-lg shadow-primary/20">Install Banner</Button>
                                        </div>
                                    </Card>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-wrap gap-2 p-2 bg-white rounded-[2rem] shadow-sm border border-border/50">
                                        {Object.keys(banners).map((page) => (
                                            <button key={page} onClick={() => setSelectedPage(page)} className={cn("px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] transition-all", selectedPage === page ? 'bg-[#0a0a0b] text-white shadow-xl' : 'text-foreground/40 hover:text-foreground hover:bg-gray-50')}>
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="xl:col-span-12">
                                        <div className="flex items-center justify-between my-8">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Active Banners for {selectedPage}</h3>
                                            <Button onClick={() => { setBannerForm({ title: '', subtitle: '', image: '', method: 'link' }); setIsAddingBanner(true); }} className="rounded-full bg-primary text-white h-10 px-6 text-[10px] font-black uppercase tracking-widest group flex items-center gap-2">
                                                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add New Banner
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {banners[selectedPage as keyof typeof banners]?.map((banner: any) => (
                                                <Card key={banner._id || banner.id} className="overflow-hidden rounded-[2.5rem] border-none shadow-sm hover:shadow-2xl transition-all duration-500 group relative bg-white">
                                                    <div className="aspect-[16/9] relative">
                                                        <Image src={banner.image || 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=1600&q=80'} alt={banner.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                                        <div className="absolute inset-0 p-8 flex flex-col justify-end text-white text-left">
                                                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary mb-2">Slide {banner.id || banner._id?.slice(-4)}</span>
                                                            <h4 className="text-xl font-black uppercase tracking-tighter leading-none mb-2">{banner.title}</h4>
                                                            <p className="text-[10px] font-medium text-white/60 tracking-widest uppercase italic">{banner.subtitle}</p>
                                                        </div>
                                                        <div className="absolute top-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                                            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all flex items-center justify-center"><Settings className="w-4 h-4" /></button>
                                                            <button onClick={() => genericDelete('banners', banner._id || banner.id)} className="w-10 h-10 rounded-full bg-red-500/20 backdrop-blur-md text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
                                                        </div>
                                                    </div>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === 'events' && (
                        <div className="space-y-12">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex p-1.5 bg-white rounded-full shadow-sm border border-border/10">
                                    <button onClick={() => { setEventCategory('upcoming'); setIsEditingEvent(false); }} className={cn("px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all", eventCategory === 'upcoming' ? 'bg-primary text-white shadow-lg' : 'text-foreground/40')}>Upcoming</button>
                                    <button onClick={() => { setEventCategory('past'); setIsEditingEvent(false); }} className={cn("px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all", eventCategory === 'past' ? 'bg-[#0a0a0b] text-white shadow-lg' : 'text-foreground/40')}>Past Highlights</button>
                                </div>
                                {!isEditingEvent && (
                                    <Button onClick={() => { setIsEditingEvent(true); setCurrentEvent({ gallery: [] }); }} className="rounded-full bg-primary text-white h-12 px-8 text-[10px] font-black uppercase tracking-widest">Create New Event</Button>
                                )}
                            </div>

                            {isEditingEvent ? (
                                <div className="animate-in slide-in-from-right-8 duration-500">
                                    <button onClick={() => setIsEditingEvent(false)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-primary mb-8 transition-colors"><ChevronLeft className="w-4 h-4" /> Back to Events</button>
                                    <Card className="p-12 md:p-16 rounded-[3rem] shadow-xl bg-white space-y-12">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                            <div className="space-y-8">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-foreground/30 text-left block">Event Title</label>
                                                    <input type="text" placeholder="NAME OF THE SUMMIT" value={currentEvent?.title || ''} onChange={e => setCurrentEvent({ ...currentEvent, title: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all font-black text-xs tracking-widest" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-foreground/30 text-left block">Release Date / Highlight Year</label>
                                                    <input type="text" placeholder="JULY 15-18, 2024" value={currentEvent?.date || ''} onChange={e => setCurrentEvent({ ...currentEvent, date: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all font-black text-xs tracking-widest" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase text-foreground/30 text-left block">Description</label>
                                                    <textarea rows={4} placeholder="BRIEF SUMMARY..." value={currentEvent?.description || ''} onChange={e => setCurrentEvent({ ...currentEvent, description: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all font-black text-xs tracking-widest resize-none" />
                                                </div>
                                            </div>
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black uppercase text-foreground/30 text-left block">Cover Asset</label>
                                                    <div className="flex gap-4 text-left">
                                                        <div className="flex-grow space-y-2">
                                                            <div className="relative">
                                                                <input type="text" placeholder="IMAGE URL" value={currentEvent?.coverImage || ''} onChange={e => setCurrentEvent({ ...currentEvent, coverImage: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all font-black text-xs tracking-widest pr-12" />
                                                                <LinkIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                                                            </div>
                                                        </div>
                                                        <div className="w-fit">
                                                            <button onClick={() => fileInputRef.current?.click()} className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-primary/20"><Upload className="w-5 h-5" /></button>
                                                            <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={e => handleFileUpload(e, (url) => setCurrentEvent({ ...currentEvent, coverImage: url }))} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <label className="text-[10px] font-black uppercase text-foreground/30 text-left block">Gallery Assets ({currentEvent?.gallery?.length || 0})</label>
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Add Image URL"
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        const input = e.currentTarget;
                                                                        if (input.value) {
                                                                            setCurrentEvent({ ...currentEvent, gallery: [...(currentEvent.gallery || []), input.value] });
                                                                            input.value = '';
                                                                        }
                                                                    }
                                                                }}
                                                                className="bg-gray-50 rounded-lg px-3 py-1 outline-none border border-transparent focus:border-primary transition-all text-[8px] font-black uppercase tracking-widest w-32"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-4 gap-4">
                                                        {currentEvent?.gallery?.map((img: string, idx: number) => (
                                                            <div key={idx} className="aspect-square rounded-xl overflow-hidden relative group">
                                                                <Image src={img} alt="gal" fill className="object-cover" />
                                                                <button onClick={() => setCurrentEvent({ ...currentEvent, gallery: currentEvent.gallery.filter((_: any, i: number) => i !== idx) })} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
                                                            </div>
                                                        ))}
                                                        <button onClick={() => galleryInputRef.current?.click()} className="aspect-square rounded-xl border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center text-foreground/20 hover:border-primary hover:text-primary transition-all bg-gray-50">
                                                            <Plus className="w-6 h-6 mb-1" />
                                                            <span className="text-[8px] font-black uppercase">Upload</span>
                                                        </button>
                                                        <input type="file" hidden multiple ref={galleryInputRef} accept="image/*" onChange={handleGalleryUpload} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-4 pt-8 border-t border-gray-100 font-black">
                                            <Button onClick={() => setIsEditingEvent(false)} variant="outline" className="rounded-full h-12 px-10 text-xs tracking-widest border-2 uppercase">Discard Changes</Button>
                                            <Button onClick={async () => {
                                                const success = await genericSave('events', { ...currentEvent, type: eventCategory }, currentEvent._id || currentEvent.id);
                                                if (success) setIsEditingEvent(false);
                                            }} className="rounded-full h-12 px-12 bg-primary text-white text-xs tracking-widest uppercase shadow-lg shadow-primary/20">Push to Archive</Button>
                                        </div>
                                    </Card>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {eventsData[eventCategory]?.map((ev: any) => (
                                        <Card key={ev._id || ev.id} className="overflow-hidden rounded-[2.5rem] bg-white group hover:shadow-2xl transition-all duration-500 flex flex-col text-left">
                                            <div className="aspect-[16/10] relative overflow-hidden">
                                                <Image src={ev.coverImage || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&q=80'} alt={ev.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                                                <div className="absolute top-6 left-6"><span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest border border-white/20">{ev.date}</span></div>
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <div className="flex gap-3">
                                                        <button onClick={() => { setIsEditingEvent(true); setCurrentEvent(ev); }} className="w-12 h-12 rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-xl"><Edit className="w-5 h-5" /></button>
                                                        <button onClick={() => genericDelete('events', ev._id || ev.id)} className="w-12 h-12 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-xl"><Trash2 className="w-5 h-5" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-10 flex flex-col flex-grow">
                                                <h4 className="text-xl font-black uppercase tracking-tighter leading-none mb-4 group-hover:text-primary transition-colors">{ev.title}</h4>
                                                <p className="text-xs font-bold text-foreground/40 leading-relaxed uppercase tracking-widest line-clamp-2 mb-8">{ev.description}</p>
                                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
                                                    <div className="flex items-center gap-2">
                                                        <Images className="w-4 h-4 text-primary" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">{ev.gallery.length} Images</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'awards' && (
                        <div className="space-y-12">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Award Archive</h3>
                                {!isEditingAward && (
                                    <Button onClick={() => { setIsEditingAward(true); setCurrentAward({ gallery: [] }); }} className="rounded-full bg-primary text-white h-12 px-8 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group">
                                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-all" /> Add New Award
                                    </Button>
                                )}
                            </div>
                            {isEditingAward ? (
                                <div className="animate-in slide-in-from-right-8 duration-500">
                                    <button onClick={() => setIsEditingAward(false)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-primary mb-8 transition-colors"><ChevronLeft className="w-4 h-4" /> Back to Awards</button>
                                    <Card className="p-12 md:p-16 rounded-[3rem] shadow-xl bg-white space-y-12">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                            <div className="space-y-8">
                                                <div className="space-y-2 text-left">
                                                    <label className="text-[10px] font-black uppercase text-foreground/30">Award Title</label>
                                                    <input type="text" placeholder="EX: LABEL AWARDS 2024" value={currentAward?.title || ''} onChange={e => setCurrentAward({ ...currentAward, title: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all font-black text-xs tracking-widest" />
                                                </div>
                                                <div className="space-y-2 text-left">
                                                    <label className="text-[10px] font-black uppercase text-foreground/30">Category</label>
                                                    <input type="text" placeholder="EX: TECHNICAL EXCELLENCE" value={currentAward?.category || ''} onChange={e => setCurrentAward({ ...currentAward, category: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all font-black text-xs tracking-widest" />
                                                </div>
                                                <div className="space-y-2 text-left">
                                                    <label className="text-[10px] font-black uppercase text-foreground/30">Description</label>
                                                    <textarea rows={4} placeholder="BRIEF SUMMARY..." value={currentAward?.description || ''} onChange={e => setCurrentAward({ ...currentAward, description: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all font-black text-xs tracking-widest resize-none" />
                                                </div>
                                            </div>
                                            <div className="space-y-8">
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black uppercase text-foreground/30 text-left block">Award Cover</label>
                                                    <div className="flex gap-4 text-left">
                                                        <div className="flex-grow space-y-2">
                                                            <div className="relative">
                                                                <input type="text" placeholder="IMAGE URL" value={currentAward?.image || ''} onChange={e => setCurrentAward({ ...currentAward, image: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all font-black text-xs tracking-widest pr-12" />
                                                                <LinkIcon className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                                                            </div>
                                                        </div>
                                                        <div className="w-fit">
                                                            <button onClick={() => fileInputRef.current?.click()} className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-primary/20"><Upload className="w-5 h-5" /></button>
                                                            <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={e => handleFileUpload(e, (url) => setCurrentAward({ ...currentAward, image: url }))} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <label className="text-[10px] font-black uppercase text-foreground/30 text-left block">Gallery Assets ({currentAward?.gallery?.length || 0})</label>
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                placeholder="Add Image URL"
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        const input = e.currentTarget;
                                                                        if (input.value) {
                                                                            setCurrentAward({ ...currentAward, gallery: [...(currentAward.gallery || []), input.value] });
                                                                            input.value = '';
                                                                        }
                                                                    }
                                                                }}
                                                                className="bg-gray-50 rounded-lg px-3 py-1 outline-none border border-transparent focus:border-primary transition-all text-[8px] font-black uppercase tracking-widest w-32"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-4 gap-4">
                                                        {currentAward?.gallery?.map((img: string, idx: number) => (
                                                            <div key={idx} className="aspect-square rounded-xl overflow-hidden relative group">
                                                                <Image src={img} alt="gal" fill className="object-cover" />
                                                                <button onClick={() => setCurrentAward({ ...currentAward, gallery: currentAward.gallery.filter((_: any, i: number) => i !== idx) })} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
                                                            </div>
                                                        ))}
                                                        <button onClick={() => galleryInputRef.current?.click()} className="aspect-square rounded-xl border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center text-foreground/20 hover:border-primary hover:text-primary transition-all bg-gray-50">
                                                            <Plus className="w-6 h-6 mb-1" />
                                                            <span className="text-[8px] font-black uppercase">Upload</span>
                                                        </button>
                                                        <input type="file" hidden multiple ref={galleryInputRef} accept="image/*" onChange={async (e) => {
                                                            const files = e.target.files;
                                                            if (!files || !currentAward) return;

                                                            const largeFiles = Array.from(files).filter(f => f.size > 10 * 1024 * 1024);
                                                            if (largeFiles.length > 0) {
                                                                toast.error("One or more files exceed the 10MB limit.");
                                                                e.target.value = '';
                                                                return;
                                                            }

                                                            setIsLoading(true);
                                                            try {
                                                                const uploadPromises = Array.from(files).map(async (file) => {
                                                                    const formData = new FormData();
                                                                    formData.append('file', file);
                                                                    const res = await fetch('/api/upload', { method: 'POST', body: formData });
                                                                    const data = await res.json();
                                                                    return data.url;
                                                                });
                                                                const newUrls = await Promise.all(uploadPromises);
                                                                setCurrentAward({
                                                                    ...currentAward,
                                                                    gallery: [...(currentAward.gallery || []), ...newUrls.filter(u => u)]
                                                                });
                                                                toast.success(`${newUrls.length} images added to gallery`);
                                                            } catch (err) {
                                                                toast.error("Gallery upload failed");
                                                            } finally {
                                                                setIsLoading(false);
                                                            }
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-4 pt-8 border-t border-gray-100 font-black">
                                            <Button onClick={() => setIsEditingAward(false)} variant="outline" className="rounded-full h-12 px-10 text-xs tracking-widest border-2 uppercase">Discard</Button>
                                            <Button onClick={async () => {
                                                const success = await genericSave('awards', currentAward, currentAward._id || currentAward.id);
                                                if (success) setIsEditingAward(false);
                                            }} className="rounded-full h-12 px-12 bg-primary text-white text-xs tracking-widest uppercase shadow-xl shadow-primary/20">Publish Award</Button>
                                        </div>
                                    </Card>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                                    {awardsData.map((award: any) => (
                                        <Card key={award._id || award.id} className="overflow-hidden rounded-[2.5rem] bg-white group hover:shadow-2xl transition-all duration-500 flex flex-col">
                                            <div className="aspect-[16/10] relative overflow-hidden">
                                                <Image src={award.image || 'https://images.unsplash.com/photo-1578262825743-a4e402caab09?w=1600&q=80'} alt={award.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                    <div className="flex gap-3">
                                                        <button onClick={() => { setIsEditingAward(true); setCurrentAward(award); }} className="w-12 h-12 rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-xl"><Edit className="w-5 h-5" /></button>
                                                        <button onClick={() => genericDelete('awards', award._id || award.id)} className="w-12 h-12 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-xl"><Trash2 className="w-5 h-5" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-10 flex flex-col flex-grow">
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2 italic">{award.category}</span>
                                                <h4 className="text-xl font-black uppercase tracking-tighter leading-none mb-4 group-hover:text-primary transition-colors">{award.title}</h4>
                                                <p className="text-xs font-bold text-foreground/40 leading-relaxed uppercase tracking-widest line-clamp-2 mb-8">{award.description}</p>
                                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
                                                    <div className="flex items-center gap-2">
                                                        <Images className="w-4 h-4 text-primary" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/60">{award.gallery?.length || 0} Images</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'newsletters' && (
                        <div className="space-y-12">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Newsletter Distribution</h3>
                                {!isEditingNewsletter && (
                                    <Button onClick={() => { setIsEditingNewsletter(true); setCurrentNewsletter({ file: '', category: 'Monthly Digest' }); }} className="rounded-full bg-[#0a0a0b] text-white h-12 px-8 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group shadow-xl hover:bg-primary transition-all">
                                        <FileUp className="w-4 h-4" /> Upload Edition
                                    </Button>
                                )}
                            </div>
                            {isEditingNewsletter ? (
                                <div className="animate-in slide-in-from-right-8 duration-500">
                                    <button onClick={() => setIsEditingNewsletter(false)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-primary mb-8 transition-colors"><ChevronLeft className="w-4 h-4" /> Back to Library</button>
                                    <Card className="p-12 md:p-16 rounded-[3rem] shadow-xl bg-white space-y-12 border border-border/10">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 font-black">
                                            <div className="space-y-8">
                                                <div className="space-y-2 text-left">
                                                    <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Newsletter Title</label>
                                                    <input type="text" placeholder="EX: LMAI MONTHLY DIGEST - MARCH 2024" value={currentNewsletter?.title || ''} onChange={e => setCurrentNewsletter({ ...currentNewsletter, title: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest" />
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Release Date (Optional)</label>
                                                        <input type="text" placeholder="MARCH 1, 2024" value={currentNewsletter?.date || ''} onChange={e => setCurrentNewsletter({ ...currentNewsletter, date: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Writer/Author (Optional)</label>
                                                        <input type="text" placeholder="EX: JOHN DOE" value={currentNewsletter?.writer || ''} onChange={e => setCurrentNewsletter({ ...currentNewsletter, writer: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2 text-left">
                                                    <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Category (Optional)</label>
                                                    <select value={currentNewsletter?.category || 'Monthly Digest'} onChange={e => setCurrentNewsletter({ ...currentNewsletter, category: e.target.value })} className="w-full h-[52px] bg-gray-50 rounded-2xl px-6 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest appearance-none">
                                                        <option>Monthly Digest</option>
                                                        <option>Special Edition</option>
                                                        <option>Technical Report</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2 text-left">
                                                    <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Description (Optional)</label>
                                                    <textarea rows={3} placeholder="SUMMARIZE THE CONTENT..." value={currentNewsletter?.description || ''} onChange={e => setCurrentNewsletter({ ...currentNewsletter, description: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest resize-none" />
                                                </div>
                                            </div>
                                            <div className="space-y-8">
                                                <div className="space-y-4 text-left font-black">
                                                    <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Edition PDF URL / File Link</label>
                                                    <div className="flex gap-4">
                                                        <div className="flex-grow">
                                                            <input type="text" placeholder="FILE PATH OR URL" value={currentNewsletter?.file || ''} onChange={e => setCurrentNewsletter({ ...currentNewsletter, file: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest pr-12" />
                                                        </div>
                                                        <button onClick={() => pdfInputRef.current?.click()} className="h-14 w-14 rounded-2xl bg-[#0a0a0b]/10 text-black flex items-center justify-center hover:bg-[#0a0a0b] hover:text-white transition-all border border-black/10"><FileUp className="w-5 h-5" /></button>
                                                        <input type="file" hidden ref={pdfInputRef} accept=".pdf" onChange={e => handleFileUpload(e, (url) => setCurrentNewsletter({ ...currentNewsletter, file: url }))} />
                                                    </div>
                                                </div>
                                                <div className="space-y-2 text-left">
                                                    <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Custom Cover Image URL (Optional)</label>
                                                    <input type="text" placeholder="EX: https://site.com/image.jpg" value={currentNewsletter?.image || ''} onChange={e => setCurrentNewsletter({ ...currentNewsletter, image: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-4 pt-8 border-t border-gray-100 font-black">
                                            <Button onClick={() => setIsEditingNewsletter(false)} variant="outline" className="rounded-full h-12 px-10 text-xs tracking-widest border-2 uppercase">Cancel</Button>
                                            <Button onClick={async () => {
                                                const success = await genericSave('newsletters', currentNewsletter, currentNewsletter._id || currentNewsletter.id);
                                                if (success) setIsEditingNewsletter(false);
                                            }} className="rounded-full h-12 px-12 bg-primary text-white text-xs tracking-widest uppercase shadow-xl shadow-primary/20">Distribute Edition</Button>
                                        </div>
                                    </Card>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {newslettersData.map((nl: any) => (
                                        <Card key={nl._id || nl.id} className="overflow-hidden rounded-[2.5rem] bg-white group hover:shadow-2xl transition-all duration-500 border border-border/50 flex flex-col text-left">
                                            <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                                                <Image src={nl.image || 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1600&q=80'} alt={nl.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                                <div className="absolute inset-x-8 bottom-8 z-10">
                                                    <span className="text-[8px] font-black underline underline-offset-4 decoration-primary text-white tracking-widest uppercase mb-1 block">{nl.category}</span>
                                                    <h4 className="text-lg font-black uppercase tracking-tighter text-white leading-tight group-hover:text-primary transition-colors">{nl.title}</h4>
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                                                    <div className="flex gap-3">
                                                        <button onClick={() => { setIsEditingNewsletter(true); setCurrentNewsletter(nl); }} className="w-12 h-12 rounded-full bg-white text-black hover:bg-black hover:text-white transition-all flex items-center justify-center shadow-xl"><Edit className="w-5 h-5" /></button>
                                                        <button onClick={() => genericDelete('newsletters', nl._id || nl.id)} className="w-12 h-12 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-xl"><Trash2 className="w-5 h-5" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-8 border-t border-gray-50 mt-auto">
                                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-foreground/40">
                                                    <span>{nl.date}</span>
                                                    <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {nl.fileSize}</span>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                    <div onClick={() => { setIsEditingNewsletter(true); setCurrentNewsletter({ file: '', category: 'Monthly Digest' }); }} className="aspect-[4/5] rounded-[2.5rem] border-4 border-dashed border-foreground/5 bg-gray-50 flex flex-col items-center justify-center text-foreground/20 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer group">
                                        <FileUp className="w-12 h-12 mb-4 group-hover:-translate-y-2 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Add Edition</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'presentations' && (
                        <div className="space-y-12">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Keynote & Session Library</h3>
                                {!isEditingPresentation && (
                                    <Button onClick={() => { setIsEditingPresentation(true); setCurrentPresentation({ category: 'Keynote' }); }} className="rounded-full bg-primary text-white h-12 px-8 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group">
                                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-all" /> Add Session
                                    </Button>
                                )}
                            </div>
                            {isEditingPresentation ? (
                                <div className="animate-in slide-in-from-right-8 duration-500">
                                    <button onClick={() => setIsEditingPresentation(false)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-primary mb-8 transition-colors"><ChevronLeft className="w-4 h-4" /> Back to Library</button>
                                    <Card className="p-12 md:p-16 rounded-[3rem] shadow-xl bg-white space-y-12 border border-border/10">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                            <div className="space-y-8">
                                                <div className="space-y-2 text-left">
                                                    <label className="text-[10px] font-black uppercase text-foreground/30">Session Title</label>
                                                    <input type="text" placeholder="EX: THE FUTURE OF PRINTING" value={currentPresentation?.title || ''} onChange={e => setCurrentPresentation({ ...currentPresentation, title: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 text-left">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase text-foreground/30">Speaker (Optional)</label>
                                                        <input type="text" placeholder="NAME" value={currentPresentation?.speaker || ''} onChange={e => setCurrentPresentation({ ...currentPresentation, speaker: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black uppercase text-foreground/30">Date (Optional)</label>
                                                        <input type="text" placeholder="MARCH 2024" value={currentPresentation?.date || ''} onChange={e => setCurrentPresentation({ ...currentPresentation, date: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2 text-left">
                                                    <label className="text-[10px] font-black uppercase text-foreground/30">Description (Optional)</label>
                                                    <textarea rows={3} placeholder="BRIEF SUMMARY..." value={currentPresentation?.description || ''} onChange={e => setCurrentPresentation({ ...currentPresentation, description: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest resize-none" />
                                                </div>
                                            </div>
                                            <div className="space-y-8">
                                                <div className="space-y-4 text-left font-black">
                                                    <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">YouTube Link</label>
                                                    <div className="relative">
                                                        <input type="text" placeholder="https://youtube.com/..." value={currentPresentation?.youtubeLink || ''} onChange={e => setCurrentPresentation({ ...currentPresentation, youtubeLink: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest pr-12" />
                                                        <ExternalLink className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                                                    </div>
                                                </div>
                                                <div className="space-y-4 text-left font-black">
                                                    <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/30">Custom Thumbnail (Optional)</label>
                                                    <div className="flex gap-4">
                                                        <div className="flex-grow">
                                                            <input type="text" placeholder="IMAGE URL" value={currentPresentation?.thumbnail || ''} onChange={e => setCurrentPresentation({ ...currentPresentation, thumbnail: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest pr-12" />
                                                        </div>
                                                        <button onClick={() => fileInputRef.current?.click()} className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all border border-primary/20"><ImagePlus className="w-5 h-5" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-4 pt-8 border-t border-gray-100 font-black">
                                            <Button onClick={() => setIsEditingPresentation(false)} variant="outline" className="rounded-full h-12 px-10 text-xs tracking-widest border-2 uppercase">Discard</Button>
                                            <Button onClick={async () => {
                                                const success = await genericSave('presentations', currentPresentation, currentPresentation._id || currentPresentation.id);
                                                if (success) setIsEditingPresentation(false);
                                            }} className="rounded-full h-12 px-12 bg-primary text-white text-xs tracking-widest uppercase shadow-xl shadow-primary/20">Save Session</Button>
                                        </div>
                                    </Card>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {presentationsData.map((pres: any) => (
                                        <Card key={pres._id || pres.id} className="overflow-hidden rounded-[2.5rem] bg-white group hover:shadow-2xl transition-all duration-500 flex flex-col text-left">
                                            <div className="aspect-video relative overflow-hidden bg-black">
                                                <Image src={pres.thumbnail || 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80'} alt={pres.title} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-primary transition-all"><ExternalLink className="w-5 h-5 text-white" /></div>
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 bg-black/40">
                                                    <div className="flex gap-3">
                                                        <button onClick={() => { setIsEditingPresentation(true); setCurrentPresentation(pres); }} className="w-10 h-10 rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-xl"><Edit className="w-4 h-4" /></button>
                                                        <button onClick={() => genericDelete('presentations', pres._id || pres.id)} className="w-10 h-10 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-xl"><Trash2 className="w-4 h-4" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-8 space-y-4">
                                                <h4 className="text-lg font-black uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors line-clamp-2">{pres.title}</h4>
                                                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-foreground/40">
                                                    <span>{pres.speaker}</span>
                                                    <span>{pres.date}</span>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                    <div onClick={() => { setIsEditingPresentation(true); setCurrentPresentation({ category: 'Keynote' }); }} className="aspect-video rounded-[2.5rem] border-4 border-dashed border-foreground/5 bg-gray-50 flex flex-col items-center justify-center text-foreground/20 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer group">
                                        <Plus className="w-12 h-12 mb-2 group-hover:rotate-90 transition-transform" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Add Session</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'members' && (
                        <div className="space-y-12">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-8">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Management Roster</h3>
                                    <div className="flex bg-gray-100 p-1.5 rounded-full">
                                        {(['boardOfDirectors', 'lmaiForce', 'pastPresidents'] as const).map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setManagementCategory(cat)}
                                                className={cn(
                                                    "px-6 py-2 rounded-full text-[8px] font-black uppercase tracking-widest transition-all",
                                                    managementCategory === cat ? "bg-white text-primary shadow-sm" : "text-foreground/40 hover:text-foreground"
                                                )}
                                            >
                                                {cat.replace(/([A-Z])/g, ' $1')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {!isEditingMember && (
                                    <Button onClick={() => { setIsEditingMember(true); setCurrentMember(null); }} className="rounded-full bg-primary text-white h-12 px-8 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group">
                                        <Plus className="w-4 h-4 group-hover:rotate-90 transition-all" /> Add Member
                                    </Button>
                                )}
                            </div>

                            {isEditingMember ? (
                                <div className="animate-in slide-in-from-right-8 duration-500">
                                    <button onClick={() => setIsEditingMember(false)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-foreground/40 hover:text-primary mb-8 transition-colors"><ChevronLeft className="w-4 h-4" /> Back to Roster</button>
                                    <Card className="max-w-4xl mx-auto p-12 md:p-16 rounded-[3rem] shadow-xl bg-white space-y-12 border border-border/10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="space-y-6">
                                                <div className="space-y-2 text-left">
                                                    <label className="text-[10px] font-black uppercase text-foreground/30">Member Full Name</label>
                                                    <input type="text" placeholder="SANDEEP ZAVERI" value={currentMember?.name || ''} onChange={e => setCurrentMember({ ...currentMember, name: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest" />
                                                </div>
                                                <div className="space-y-2 text-left">
                                                    <label className="text-[10px] font-black uppercase text-foreground/30">Post / Designation</label>
                                                    <input type="text" placeholder="HONORARY SECRETARY" value={currentMember?.title || ''} onChange={e => setCurrentMember({ ...currentMember, title: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest" />
                                                </div>
                                                <div className="space-y-6 text-left">
                                                    <label className="text-[10px] font-black uppercase text-foreground/30">Profile Image</label>
                                                    <div className="flex gap-4">
                                                        <div className="flex-grow">
                                                            <input type="text" placeholder="IMAGE URL" value={currentMember?.image || ''} onChange={e => setCurrentMember({ ...currentMember, image: e.target.value })} className="w-full bg-gray-50 rounded-2xl px-6 py-4 outline-none border border-transparent focus:border-primary transition-all text-xs tracking-widest pr-12" />
                                                        </div>
                                                        <button onClick={() => fileInputRef.current?.click()} className="h-14 w-14 rounded-2xl bg-secondary/20 text-black flex items-center justify-center hover:bg-secondary hover:text-black transition-all border border-black/5"><ImagePlus className="w-5 h-5" /></button>
                                                        <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={e => handleFileUpload(e, (url) => setCurrentMember({ ...currentMember, image: url }))} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <div className="w-64 aspect-[4/5] rounded-[2rem] bg-gray-50 border-2 border-dashed border-gray-100 relative overflow-hidden group">
                                                    {currentMember?.image ? (
                                                        <Image src={currentMember.image} alt="preview" fill className="object-cover" />
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center h-full text-foreground/20">
                                                            <User className="w-12 h-12 mb-2" />
                                                            <span className="text-[8px] font-black uppercase tracking-widest">No Image</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-4 pt-8 border-t border-gray-100 font-black">
                                            <Button onClick={() => setIsEditingMember(false)} variant="outline" className="rounded-full h-12 px-10 text-xs tracking-widest border-2 uppercase">Cancel</Button>
                                            <Button onClick={async () => {
                                                const success = await genericSave('members', { ...currentMember, category: managementCategory }, currentMember?._id || currentMember?.id);
                                                if (success) setIsEditingMember(false);
                                            }} className="rounded-full h-12 px-12 bg-primary text-white text-xs tracking-widest uppercase shadow-xl shadow-primary/20">Confirm Member</Button>
                                        </div>
                                    </Card>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                                    {managementData[managementCategory].map((member: any) => (
                                        <Card key={member._id || member.id} className="overflow-hidden rounded-[2rem] bg-white group hover:shadow-xl transition-all duration-500 border border-border/10 flex flex-col text-center p-6">
                                            <div className="aspect-[4/5] relative overflow-hidden rounded-2xl mb-6 bg-gray-100">
                                                <Image src={member.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
                                                    <div className="flex gap-2">
                                                        <button onClick={() => { setIsEditingMember(true); setCurrentMember(member); }} className="w-10 h-10 rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all flex items-center justify-center shadow-xl"><Edit className="w-4 h-4" /></button>
                                                        <button onClick={() => genericDelete('members', member._id || member.id)} className="w-10 h-10 rounded-full bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-xl"><Trash2 className="w-4 h-4" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-black uppercase tracking-tighter group-hover:text-primary transition-colors line-clamp-1">{member.name}</h4>
                                                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-foreground/40 line-clamp-1">{member.title}</p>
                                            </div>
                                        </Card>
                                    ))}
                                    <div onClick={() => { setIsEditingMember(true); setCurrentMember(null); }} className="aspect-[4/5] rounded-[2rem] border-4 border-dashed border-foreground/5 bg-gray-50 flex flex-col items-center justify-center text-foreground/20 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer group">
                                        <Plus className="w-10 h-10 mb-2 group-hover:rotate-90 transition-transform" />
                                        <span className="text-[8px] font-black uppercase tracking-widest">Add Member</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'enquiries' && (
                        <div className="space-y-12">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-8 text-left">
                                <div className="space-y-1">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Inquiry Response Center</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Managing website form submissions and leads</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                                        <input
                                            type="text"
                                            placeholder="Search inquiries..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="bg-white border border-border/50 rounded-full px-12 py-3 outline-none focus:border-primary transition-all text-[10px] font-black uppercase tracking-widest w-64"
                                        />
                                    </div>
                                    <Button variant="outline" className="rounded-full h-12 px-6 flex items-center gap-2 border-border/50 text-[10px] font-black uppercase tracking-widest">
                                        <Filter className="w-4 h-4" /> Filter
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {enquiriesData.filter(enq => enq.name.toLowerCase().includes(searchQuery.toLowerCase()) || enq.subject.toLowerCase().includes(searchQuery.toLowerCase())).map((enq: any) => (
                                    <Card key={enq._id || enq.id} className="p-8 rounded-[2rem] bg-white border border-border/10 hover:shadow-xl transition-all duration-500 group text-left">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                            <div className="flex items-start gap-6 flex-grow">
                                                <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                                                    <Mail className="w-6 h-6 text-primary" />
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-4">
                                                        <h4 className="text-lg font-black uppercase tracking-tighter">{enq.subject}</h4>
                                                        <span className={cn(
                                                            "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest",
                                                            enq.status === 'Unread' ? "bg-red-100 text-red-500" :
                                                                enq.status === 'In Discussion' ? "bg-blue-100 text-blue-500" :
                                                                    "bg-green-100 text-green-500"
                                                        )}>
                                                            {enq.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                                                        <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {enq.name}</span>
                                                        <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> {enq.email}</span>
                                                        <span className="flex items-center gap-1.5"><Clock3 className="w-3 h-3" /> {enq.date}</span>
                                                    </div>
                                                    <p className="text-xs font-bold text-foreground/60 leading-relaxed max-w-3xl border-l-2 border-primary/20 pl-4 py-1">
                                                        "{enq.message}"
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 shrink-0">
                                                <Button size="sm" variant="outline" className="rounded-full h-10 px-6 text-[8px] font-black uppercase tracking-widest bg-gray-50 border-none hover:bg-primary hover:text-white transition-all">Reply via Email</Button>
                                                <button
                                                    onClick={() => genericSave('enquiries', { ...enq, status: 'Read' }, enq._id || enq.id)}
                                                    className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                                    title="Mark as Read"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => genericDelete('enquiries', enq._id || enq.id)}
                                                    className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}

                                {enquiriesData.length === 0 && (
                                    <div className="py-32 flex flex-col items-center text-center space-y-4">
                                        <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-foreground/10">
                                            <Mail className="w-10 h-10" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black uppercase tracking-tighter">No Inquiries Found</h3>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-foreground/20">Website submissions will appear here once received</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (

                        <div className="space-y-12 text-left">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Secretariat Configuration</h3>
                            </div>
                            <Card className="p-24 rounded-[3rem] border-none border shadow-sm flex flex-col items-center text-center space-y-6">
                                <Shield className="w-24 h-24 text-primary opacity-20" />
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">System <span className="text-primary">Control Center</span></h3>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">Security and API keys management coming soon</p>
                                </div>
                            </Card>
                        </div>
                    )}

                </section>
            </main>
        </div>
    );
}
