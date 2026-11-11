import { featured } from './courses'

export type Language = 'km' | 'en'

export const copy = {
  km: {
    title: 'oDevGate · វគ្គសិក្សាខ្លីៗ',
    home: 'ទំព័រដើម', courses: 'វគ្គសិក្សា', about: 'អំពី oDevGate', contact: 'ទំនាក់ទំនង',
    nav: 'ម៉ឺនុយមេ', menu: 'ម៉ឺនុយ', skip: 'រំលងទៅមាតិកា', language: 'ជ្រើសរើសភាសា',
    school: 'សាលាបង្រៀនកូដ', headline: 'រៀនកូដ បង្កើតស្នាដៃផ្ទាល់ខ្លួន',
    browse: 'មើលវគ្គសិក្សា', catalog: 'វគ្គសិក្សាខ្លីៗ',
    open: 'អាចចុះឈ្មោះបាន', soon: 'មកដល់ឆាប់ៗ',
    details: 'មើលព័ត៌មានវគ្គ', enroll: 'ចុះឈ្មោះតាម Telegram',
    unavailable: 'តំណចុះឈ្មោះនឹងបង្ហាញនៅទីនេះពេលរួចរាល់។',
    summary: 'រៀនពីមូលដ្ឋាន បង្កើត Portfolio ដែលសមនឹងទូរស័ព្ទ និងដាក់វា Online ដោយខ្លួនឯង។',
    schedule: `${khmerNumber(featured.weeks)} សប្តាហ៍ · ${khmerNumber(featured.daysPerWeek)} ថ្ងៃ/សប្តាហ៍ · ${khmerNumber(featured.sessions)} លើក`,
    original: 'តម្លៃដើម', sale: 'តម្លៃលក់', whole: 'សម្រាប់វគ្គទាំងមូល',
    plan: 'ផែនការសិក្សា', week: 'សប្តាហ៍ទី', beginner: 'សម្រាប់អ្នកចាប់ផ្តើម',
    aboutText: 'oDevGate បង្រៀនកូដតាមរយៈការអនុវត្ត។ ចាប់ផ្តើមពីមូលដ្ឋាន ហើយបង្កើតគម្រោងដែលអ្នកអាចចែករំលែកបាន។',
    contactText: 'សួរព័ត៌មាន ឬចុះឈ្មោះវគ្គសិក្សាតាម Telegram។',
    code: 'ឧទាហរណ៍កូដ HTML',
  },
  en: {
    title: 'oDevGate · Short Courses',
    home: 'Home', courses: 'Courses', about: 'About oDevGate', contact: 'Contact',
    nav: 'Main navigation', menu: 'Menu', skip: 'Skip to content', language: 'Choose language',
    school: 'Coding school', headline: 'Learn to code. Build your own portfolio.',
    browse: 'Browse courses', catalog: 'Short courses',
    open: 'Open for enrollment', soon: 'Coming soon',
    details: 'View course details', enroll: 'Enroll via Telegram',
    unavailable: 'The enrollment link will appear here when it is ready.',
    summary: 'Start with the basics, build a portfolio that works on mobile, and publish it online.',
    schedule: `${featured.weeks} weeks · ${featured.daysPerWeek} days/week · ${featured.sessions} sessions`,
    original: 'Original price', sale: 'Sale price', whole: 'for the full course',
    plan: 'Course outline', week: 'Week ', beginner: 'Beginner friendly',
    aboutText: 'oDevGate teaches coding through hands-on practice. Start with the basics and build projects you can share.',
    contactText: 'Ask about the course or enroll via Telegram.',
    code: 'HTML code example',
  },
}

export function khmerNumber(number: number): string {
  return String(number).replace(/\d/g, (digit) => '០១២៣៤៥៦៧៨៩'[Number(digit)])
}
