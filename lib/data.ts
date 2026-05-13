import dbConnect from './mongodb';
import { Event, Award, Banner, Member, Newsletter, Presentation } from './models';

// Serialization helper to convert Mongoose documents to plain objects
// This handles ObjectIDs and other non-serializable fields for Client Components
function serialize<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
}

export async function getBanners(page: string) {
    await dbConnect();
    const data = await Banner.find({ page: { $regex: `^${page}$`, $options: 'i' } })
        .sort({ _id: -1 })
        .lean();
    return serialize(data);
}

export async function getEvents() {
    await dbConnect();
    const data = await Event.find({}).sort({ _id: -1 }).lean();
    return serialize(data);
}

export async function getAwards() {
    await dbConnect();
    const data = await Award.find({}).sort({ _id: -1 }).lean();
    return serialize(data);
}

export async function getMembers() {
    await dbConnect();
    const data = await Member.find({}).sort({ _id: 1 }).lean();
    return serialize(data);
}

export async function getNewsletters() {
    await dbConnect();
    const data = await Newsletter.find({}).sort({ _id: -1 }).lean();
    return serialize(data);
}

export async function getPresentations() {
    await dbConnect();
    const data = await Presentation.find({}).sort({ _id: -1 }).lean();
    return serialize(data);
}

export async function getEventById(id: string) {
    await dbConnect();
    const data = await Event.findById(id).lean();
    return serialize(data);
}

export async function getAwardById(id: string) {
    await dbConnect();
    const data = await Award.findById(id).lean();
    return serialize(data);
}
