import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Banner } from '@/lib/models';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ page: string }> }
) {
    try {
        const { page } = await params;
        await dbConnect();
        // Find the most recently added banner for this page (case-insensitive)
        const banner = await Banner.findOne({ page: { $regex: `^${page}$`, $options: 'i' } }).sort({ _id: -1 }).lean() as any;
        if (!banner) return NextResponse.json({ image: null });
        return NextResponse.json({ image: banner.image, title: banner.title, subtitle: banner.subtitle });
    } catch (error) {
        console.error('Banner fetch error:', error);
        return NextResponse.json({ image: null });
    }
}
