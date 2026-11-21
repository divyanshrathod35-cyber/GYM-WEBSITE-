import { gymConfig, type Goal, type LocationId, type Months, type PlanType } from '../config/gymConfig';
export const inr = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
export const safeText = (value: string, max = 80) => value.normalize('NFKC').replace(/[\u0000-\u001F\u007F<>\\{}]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
export const validFullName = (value: string) => [...safeText(value, 50).matchAll(/[\p{L}]/gu)].length >= 2;
export const validIndianMobile = (value: string) => /^[6-9]\d{9}$/.test(value.trim());
export const waLink = (message: string) => `https://wa.me/${gymConfig.contact.e164}?text=${encodeURIComponent(message)}`;
export const directionsUrl = (locationId: LocationId) => {
    const loc = gymConfig.locations.find(item => item.id === locationId) ?? gymConfig.locations[0];
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${gymConfig.displayName}, ${loc.address}`)}`;
};
export function planQuote(type: PlanType, months: Months, trainer: boolean) {
    const rates = gymConfig.pricing;
    const base = rates[type][months];
    const trainerCost = trainer ? rates.trainerMonthlyAddOn * months : 0;
    const total = base + trainerCost;
    const monthlyEquivalent = (rates[type][1] + (trainer ? rates.trainerMonthlyAddOn : 0)) * months;
    const savings = Math.max(0, monthlyEquivalent - total);
    const savingsPercentage = monthlyEquivalent ? Math.round(savings / monthlyEquivalent * 100) : 0;
    const daily = total / rates.daysByDuration[months];
    return { base, trainerCost, total, daily, savings, savingsPercentage };
}
export type SexForEquation = 'male' | 'female';
export type Activity = 'sedentary' | 'light' | 'moderate' | 'active';
export interface BlueprintInput {
    height: number;
    weight: number;
    age: number;
    sex: SexForEquation;
    activity: Activity;
    goal: Goal;
}
export function fitnessBlueprint(input: BlueprintInput) {
    const { height, weight, age, sex, activity, goal } = input;
    if (![height, weight, age].every(Number.isFinite) || height < 120 || height > 230 || weight < 30 || weight > 300 || age < 18 || age > 85)
        return null;
    const bmi = weight / ((height / 100) ** 2);
    const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === 'male' ? 5 : -161);
    const activityFactors: Record<Activity, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };
    const maintenance = Math.round(bmr * activityFactors[activity]);
    const adjustment = goal === 'Fat Loss' ? -300 : goal === 'Muscle & Strength' ? 200 : 0;
    // Do not output arbitrary low-calorie recommendations or fat-loss targets for underweight users.
    const proposed = maintenance + adjustment;
    const floor = sex === 'male' ? 1500 : 1200;
    const calorieTarget = (goal === 'Fat Loss' && bmi < 18.5) || proposed < floor ? null : Math.round(proposed / 10) * 10;
    const protein = Math.round(weight * (goal === 'Muscle & Strength' || goal === 'Fat Loss' ? 1.6 : 1.2));
    const track = goal === 'Power Yoga & Mobility' ? 'Power Yoga + Mobility' : goal === 'Couple Fitness' ? 'Couple Fitness + Guided Training' : goal === 'Beginner Kickstart' ? 'Beginner Strength Fundamentals' : 'Strength + Personal Training';
    const bmiCategory = bmi < 18.5 ? 'Below reference range' : bmi < 25 ? 'Reference range' : bmi < 30 ? 'Above reference range' : 'Higher reference range';
    return { bmi, bmiCategory, maintenance, calorieTarget, protein, track };
}
export function uniquePassCode() {
    const bytes = new Uint8Array(5);
    globalThis.crypto.getRandomValues(bytes);
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return 'BTG-RJN-' + [...bytes].map(byte => alphabet[byte % alphabet.length]).join('');
}
export function xmlEscape(input: string): string {
    return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

