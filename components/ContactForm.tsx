"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

export function ContactForm() {
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

    if (status === 'success') {
        return (
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
        );
    }

    return (
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
    );
}
