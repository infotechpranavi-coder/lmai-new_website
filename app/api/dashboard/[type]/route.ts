import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Banner, Event, Award, Newsletter, Presentation, Member, Enquiry } from '@/lib/models';
import { revalidatePath } from 'next/cache';

const models: any = {
    banners: Banner,
    events: Event,
    awards: Award,
    newsletters: Newsletter,
    presentations: Presentation,
    members: Member,
    enquiries: Enquiry,
};

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ type: string }> }
) {
    try {
        const { type } = await params;
        await dbConnect();
        const Model = models[type];
        if (!Model) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

        const data = await Model.find({}).sort({ _id: -1 });
        return NextResponse.json(data);
    } catch (error) {
        console.error("GET Error [type]:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ type: string }> }
) {
    const { type } = await params;
    try {
        await dbConnect();
        const Model = models[type];
        if (!Model) return NextResponse.json({ error: 'Invalid type' }, { status: 400 });

        const body = await req.json();

        // Ensure defaults for critical fields to bypass Mongoose strictness in some environments
        if (type === 'banners') {
            body.title = body.title || ' ';
            body.subtitle = body.subtitle || ' ';
        } else if (type === 'events') {
            body.title = body.title || 'New Event';
            body.date = body.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            body.coverImage = body.coverImage || '';
            body.description = body.description || 'Official LMAI Event Update';
        } else if (type === 'awards') {
            body.title = body.title || '';
            body.category = body.category || '';
            body.image = body.image || '';
            body.description = body.description || 'Official LMAI Award Recognition';
        }

        const newItem = await Model.create(body);

        // Revalidate the entire site or specific paths to reflect new data
        revalidatePath('/');
        revalidatePath(`/${type === 'members' ? 'management' : type}`);
        
        return NextResponse.json(newItem);
    } catch (error: any) {
        console.error(`POST Error [${type}]:`, error);
        return NextResponse.json({ 
            error: 'Internal server error', 
            details: error.message || 'Unknown error' 
        }, { status: 500 });
    }
}

