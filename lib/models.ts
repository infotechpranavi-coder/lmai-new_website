import mongoose, { Schema, model, models } from 'mongoose';

// Banner Schema
const BannerSchema = new Schema({
    page: { type: String, default: '', index: true },
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    image: { type: String, default: '' },
});

// Event Schema
const EventSchema = new Schema({
    title: { type: String, default: '' },
    date: { type: String, default: '' },
    description: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    gallery: [{ type: String }],
    type: { type: String, enum: ['upcoming', 'past'], default: 'upcoming', index: true },
});

// Award Schema
const AwardSchema = new Schema({
    title: { type: String, default: '' },
    category: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    gallery: [{ type: String }],
});

// Newsletter Schema
const NewsletterSchema = new Schema({
    title: { type: String, default: '' },
    category: { type: String, default: 'Monthly Digest' },
    date: { type: String, default: '' },
    description: { type: String, default: '' },
    writer: { type: String, default: '' },
    fileSize: { type: String, default: '' },
    image: { type: String, default: '' },
    file: { type: String, default: '' }, // link url
});

// Presentation Schema
const PresentationSchema = new Schema({
    title: { type: String, default: '' },
    speaker: { type: String, default: '' },
    date: { type: String, default: '' },
    description: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    category: { type: String, default: 'Webinar' },
    youtubeLink: { type: String, default: '' },
});

// Member Schema
const MemberSchema = new Schema({
    name: { type: String, default: '' },
    title: { type: String, default: '' },
    image: { type: String, default: '' },
    category: { type: String, enum: ['boardOfDirectors', 'lmaiForce', 'pastPresidents'], default: 'boardOfDirectors' },
});

// Enquiry Schema
const EnquirySchema = new Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    subject: { type: String, default: '' },
    message: { type: String, default: '' },
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
