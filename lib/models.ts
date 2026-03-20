import mongoose, { Schema, model, models } from 'mongoose';

// Banner Schema
const BannerSchema = new Schema({
    page: { type: String, required: true },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    image: { type: String, required: true },
});

// Event Schema
const EventSchema = new Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    type: { type: String, enum: ['upcoming', 'past'], default: 'upcoming' },
});

// Award Schema
const AwardSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    gallery: [{ type: String }],
});

// Newsletter Schema
const NewsletterSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, default: 'Monthly Digest' },
    date: { type: String, default: '' },
    description: { type: String, default: '' },
    writer: { type: String, default: '' },
    fileSize: { type: String, default: '' },
    image: { type: String, default: '' },
    file: { type: String, required: true }, // link url
});

// Presentation Schema
const PresentationSchema = new Schema({
    title: { type: String, required: true },
    speaker: { type: String, default: '' },
    date: { type: String, default: '' },
    description: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    category: { type: String, default: 'Webinar' },
    youtubeLink: { type: String, required: true },
});

// Member Schema
const MemberSchema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, enum: ['boardOfDirectors', 'lmaiForce', 'pastPresidents'], required: true },
});

// Enquiry Schema
const EnquirySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) },
    status: { type: String, enum: ['Unread', 'Read', 'In Discussion'], default: 'Unread' },
});

export const Banner = models.Banner || model('Banner', BannerSchema);
export const Event = models.Event || model('Event', EventSchema);
export const Award = models.Award || model('Award', AwardSchema);
export const Newsletter = models.Newsletter || model('Newsletter', NewsletterSchema);
export const Presentation = models.Presentation || model('Presentation', PresentationSchema);
export const Member = models.Member || model('Member', MemberSchema);
export const Enquiry = models.Enquiry || model('Enquiry', EnquirySchema);
