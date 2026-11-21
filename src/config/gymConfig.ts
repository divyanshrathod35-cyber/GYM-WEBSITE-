/** Owner-controlled single source of truth. All demo-only fields are explicitly tagged. */
export type LocationId = 'anupam' | 'srishti';
export type Goal = 'Fat Loss' | 'Muscle & Strength' | 'Couple Fitness' | 'Power Yoga & Mobility' | 'Beginner Kickstart';
export type PlanType = 'individual' | 'couple';
export type Months = 1 | 3 | 6 | 12;
export const gymConfig = {
    brand: 'BODY TECH',
    displayName: 'Body Tech Gym',
    tagline: 'A STRONGER CITY STARTS HERE.',
    city: 'Rajnandgaon',
    pin: '491441',
    established: 2011,
    contact: {
        display: '+91 83493 44321',
        e164: '918349344321',
        tel: '+918349344321'
    },
    sourceUrls: {
        directory: 'https://www.justdial.com/Rajnandgaon/Body-Tech-Gym-In-Front-Of-Baba-Fateh-Hall-Anupam-Nagar/9999P7744-7744-170822123818-P5A7_BZDET',
        phone: 'https://magicpin.in/Rajnandgaon/Rajnandgaon/Fitness/Body-tech-Gym/store/9ca167'
    },
    locations: [
        { id: 'anupam' as LocationId, short: 'Anupam Nagar', label: '01 / ANUPAM NAGAR', landmark: 'Opposite Baba Fateh Hall', address: 'Anupam Nagar Road, Anupam Nagar, Rajnandgaon, Chhattisgarh 491441', accessibility: 'Contact team to confirm access details.', status: 'Publicly listed · confirm with owner' },
        { id: 'srishti' as LocationId, short: 'Srishti Colony', label: '02 / SRISHTI COLONY', landmark: 'Kamala College Road', address: 'Kamala College Road, Srishti Colony, Rajnandgaon, Chhattisgarh 491441', accessibility: 'Accessible entrance appears in public listings; confirm before visiting.', status: 'Publicly listed · confirm with owner' }
    ],
    firstOpening: '6:00 AM',
    hoursNotice: 'Daily opening, closing hours, Sunday operation and trainer-specific batches need owner confirmation. No live occupancy data is available.',
    trial: { days: 3, name: '3-Day Guided Introduction', ownerApproved: false, note: 'Concept offer only. The gym must confirm availability, price, eligibility and specific slots before any pass is honoured.' },
    goals: ['Fat Loss', 'Muscle & Strength', 'Couple Fitness', 'Power Yoga & Mobility', 'Beginner Kickstart'] as Goal[],
    slots: [
        { id: 'morning', label: 'Morning · from 6 AM (request)' },
        { id: 'midday', label: 'Midday · request availability' },
        { id: 'evening', label: 'Evening · request availability' }
    ],
    pricing: {
        isDemo: true,
        currency: 'INR',
        description: 'Illustrative membership amounts for demo use only. Not an offer or confirmed Body Tech tariff.',
        individual: { 1: 1499, 3: 3999, 6: 7499, 12: 13999 } as Record<Months, number>,
        couple: { 1: 2699, 3: 7299, 6: 13699, 12: 24999 } as Record<Months, number>,
        trainerMonthlyAddOn: 2499,
        daysByDuration: { 1: 30, 3: 91, 6: 182, 12: 365 } as Record<Months, number>
    },
    // AI-generated branded campaign concepts, NOT photographs of Body Tech Gym or actual members.
    media: {
        hero: '/media/hero-strength.webp',
        facility: '/media/strength-floor.webp',
        coaching: '/media/personal-coaching.webp',
        mobility: '/media/power-yoga.webp',
        couple: '/media/couple-training.webp',
        performance: '/media/performance-focus.webp'
    },
    reviewEvidence: {
        directoryName: 'Justdial',
        score: 4.5,
        count: 182,
        collectedLabel: 'Public directory snapshot, November 2026',
        themes: ['Equipment quality', 'Supportive trainers', 'Welcoming atmosphere', 'Yoga & aerobics options']
    },
    demoSchedule: [
        { time: '06:00', label: 'Morning floor opens', kind: 'listed', detail: 'Opening time is listed; check individual branch hours.' },
        { time: '07:30', label: 'Guided coaching enquiry window', kind: 'demo', detail: 'Illustrative window, not a confirmed trainer slot.' },
        { time: '11:00', label: 'Daytime floor enquiry', kind: 'demo', detail: 'Contact team for open floor and actual occupancy.' },
        { time: '17:30', label: 'After-work enquiry window', kind: 'demo', detail: 'May be busy. Real-time crowd data is not connected.' },
        { time: '19:00', label: 'Yoga / aerobics class enquiry', kind: 'demo', detail: 'Illustrative only; no class timetable confirmed.' }
    ]
} as const;

