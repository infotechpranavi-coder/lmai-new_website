import dbConnect from './mongodb';
import { Event, Award, Banner, Member, Newsletter, Presentation } from './models';
import { cache } from 'react';

// Serialization helper to convert Mongoose documents to plain objects
// This handles ObjectIDs and other non-serializable fields for Client Components
function serialize<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}

export const getBanners = cache(async (page: string) => {
    await dbConnect();
    const data = await Banner.find({ page: { $regex: `^${page}$`, $options: 'i' } })
        .sort({ _id: -1 })
        .lean();
    return serialize(data);
});

export const getEvents = cache(async () => {
    await dbConnect();
    const data = await Event.find({}).sort({ _id: -1 }).lean();
    return serialize(data);
});

export const getAwards = cache(async () => {
    await dbConnect();
    const data = await Award.find({}).sort({ _id: -1 }).lean();
    return serialize(data);
});

export const getMembers = cache(async () => {
    await dbConnect();
    const data = await Member.find({}).sort({ _id: 1 }).lean();
    return serialize(data);
});

export const getNewsletters = cache(async () => {
    await dbConnect();
    const data = await Newsletter.find({}).sort({ _id: -1 }).lean();
    return serialize(data);
});

export const getPresentations = cache(async () => {
    await dbConnect();
    const data = await Presentation.find({}).sort({ _id: -1 }).lean();
    return serialize(data);
});

export const getEventById = cache(async (id: string) => {
    await dbConnect();
    try {
        const data = await Event.findById(id).lean();
        return serialize(data);
    } catch (e) {
        return null;
    }
});

export const getAwardById = cache(async (id: string) => {
    await dbConnect();
    try {
        const data = await Award.findById(id).lean();
        return serialize(data);
    } catch (e) {
        return null;
    }
});
