export type Word = { native: string; english: string };
export type Lesson = {
  id: string;
  title: string;
  emoji: string;
  words: Word[];
};
export type Language = {
  code: string;
  name: string;
  region: string;
  greeting: string;
  flag: string;
  available: boolean;
  lessons: Lesson[];
};

const TWI: Lesson[] = [
  {
    id: "greetings",
    title: "Greetings",
    emoji: "👋",
    words: [
      { native: "Akwaaba", english: "Welcome" },
      { native: "Maakye", english: "Good morning" },
      { native: "Maaha", english: "Good afternoon" },
      { native: "Maadwo", english: "Good evening" },
      { native: "Yɛbɛhyia bio", english: "See you again" },
      { native: "Medaase", english: "Thank you" },
    ],
  },
  {
    id: "family",
    title: "Family",
    emoji: "👨‍👩‍👧",
    words: [
      { native: "Maame", english: "Mother" },
      { native: "Papa", english: "Father" },
      { native: "Nua", english: "Sibling" },
      { native: "Abusua", english: "Family" },
      { native: "Akɔnta", english: "In-law" },
      { native: "Ba", english: "Child" },
    ],
  },
  {
    id: "numbers",
    title: "Numbers 1–10",
    emoji: "🔢",
    words: [
      { native: "Baako", english: "One" },
      { native: "Mmienu", english: "Two" },
      { native: "Mmiɛnsa", english: "Three" },
      { native: "Ɛnan", english: "Four" },
      { native: "Enum", english: "Five" },
      { native: "Nsia", english: "Six" },
    ],
  },
];

const GA: Lesson[] = [
  {
    id: "greetings",
    title: "Greetings",
    emoji: "👋",
    words: [
      { native: "Ojekoo", english: "Good morning" },
      { native: "Oyiwala don", english: "Thank you" },
      { native: "Mibaa", english: "I am coming" },
      { native: "Te oyɔɔ tɛŋ", english: "How are you?" },
      { native: "Mihiɛ", english: "I am well" },
      { native: "Yaawɔɔ", english: "Goodbye" },
    ],
  },
  {
    id: "food",
    title: "Food",
    emoji: "🍲",
    words: [
      { native: "Niimɔ", english: "Food" },
      { native: "Nu", english: "Water" },
      { native: "Kenkey", english: "Kenkey" },
      { native: "Loo", english: "Meat" },
      { native: "Wele", english: "Cow skin" },
      { native: "Banku", english: "Banku" },
    ],
  },
];

const EWE: Lesson[] = [
  {
    id: "greetings",
    title: "Greetings",
    emoji: "👋",
    words: [
      { native: "Woezɔ", english: "Welcome" },
      { native: "Ŋdi", english: "Good morning" },
      { native: "Ŋdɔ", english: "Good afternoon" },
      { native: "Fiẽ", english: "Good evening" },
      { native: "Akpe", english: "Thank you" },
      { native: "Hede nyuie", english: "Goodbye" },
    ],
  },
  {
    id: "people",
    title: "People",
    emoji: "🧑",
    words: [
      { native: "Dada", english: "Mother" },
      { native: "Papa", english: "Father" },
      { native: "Nɔvi", english: "Sibling" },
      { native: "Xɔlɔ̃", english: "Friend" },
      { native: "Ɖevi", english: "Child" },
      { native: "Ame", english: "Person" },
    ],
  },
];

const FANTE: Lesson[] = [
  {
    id: "greetings",
    title: "Greetings",
    emoji: "👋",
    words: [
      { native: "Akwaaba", english: "Welcome" },
      { native: "Maakye", english: "Good morning" },
      { native: "Medaase", english: "Thank you" },
      { native: "Wo ho te dɛn?", english: "How are you?" },
      { native: "Me ho yɛ", english: "I am fine" },
      { native: "Nantew yie", english: "Goodbye" },
    ],
  },
  {
    id: "market",
    title: "At the Market",
    emoji: "🛍️",
    words: [
      { native: "Dwa", english: "Market" },
      { native: "Sika", english: "Money" },
      { native: "Tɔ", english: "Buy" },
      { native: "Tɔn", english: "Sell" },
      { native: "Bo bɛn?", english: "How much?" },
      { native: "Ɛyɛ fɛ", english: "It is nice" },
    ],
  },
];

export const LANGUAGES: Language[] = [
  { code: "twi", name: "Twi", region: "Ashanti", greeting: "Akwaaba", flag: "🟡", available: true, lessons: TWI },
  { code: "ga", name: "Ga", region: "Greater Accra", greeting: "Ojekoo", flag: "🔵", available: true, lessons: GA },
  { code: "ewe", name: "Ewe", region: "Volta", greeting: "Woezɔ", flag: "🟢", available: true, lessons: EWE },
  { code: "fante", name: "Fante", region: "Central", greeting: "Akwaaba", flag: "🔴", available: true, lessons: FANTE },
  { code: "hausa", name: "Hausa", region: "Northern", greeting: "Sannu", flag: "⚪", available: false, lessons: [] },
  { code: "dagomba", name: "Dagomba", region: "Northern", greeting: "Desiba", flag: "⚫", available: false, lessons: [] },
  { code: "nzema", name: "Nzema", region: "Western", greeting: "Akɛɛ", flag: "🟠", available: false, lessons: [] },
  { code: "ahanta", name: "Ahanta", region: "Western", greeting: "Akwaaba", flag: "🟤", available: false, lessons: [] },
  { code: "akwapim", name: "Akwapim", region: "Eastern", greeting: "Akwaaba", flag: "🟣", available: false, lessons: [] },
  { code: "krobo", name: "Krobo", region: "Eastern", greeting: "Wɔɛzɔ", flag: "🟪", available: false, lessons: [] },
  { code: "bono", name: "Bono", region: "Bono", greeting: "Akwaaba", flag: "🟧", available: false, lessons: [] },
  { code: "ga-adangbe", name: "Ga-Adangbe", region: "Coastal", greeting: "Hɛɛ", flag: "🟦", available: false, lessons: [] },
];

export const findLanguage = (code: string) => LANGUAGES.find((l) => l.code === code);
export const findLesson = (code: string, lessonId: string) =>
  findLanguage(code)?.lessons.find((l) => l.id === lessonId);
