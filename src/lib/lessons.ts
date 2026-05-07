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
    title: "Numbers 1–6",
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
  {
    id: "colors",
    title: "Colors",
    emoji: "🎨",
    words: [
      { native: "Tuntum", english: "Black" },
      { native: "Fitaa", english: "White" },
      { native: "Kɔkɔɔ", english: "Red" },
      { native: "Ahabammono", english: "Green" },
      { native: "Bruu", english: "Blue" },
      { native: "Akokɔsrade", english: "Yellow" },
    ],
  },
  {
    id: "food",
    title: "Food",
    emoji: "🍲",
    words: [
      { native: "Aduane", english: "Food" },
      { native: "Nsuo", english: "Water" },
      { native: "Fufuo", english: "Fufu" },
      { native: "Banku", english: "Banku" },
      { native: "Nam", english: "Meat" },
      { native: "Nkwan", english: "Soup" },
    ],
  },
  {
    id: "phrases",
    title: "Useful phrases",
    emoji: "💬",
    words: [
      { native: "Wo ho te sɛn?", english: "How are you?" },
      { native: "Me ho yɛ", english: "I am fine" },
      { native: "Me din de…", english: "My name is…" },
      { native: "Mepa wo kyɛw", english: "Please" },
      { native: "Kafra", english: "Sorry" },
      { native: "Aane", english: "Yes" },
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
  {
    id: "numbers",
    title: "Numbers",
    emoji: "🔢",
    words: [
      { native: "Ekome", english: "One" },
      { native: "Enyɔ", english: "Two" },
      { native: "Etɛ", english: "Three" },
      { native: "Ejwɛ", english: "Four" },
      { native: "Enumɔ", english: "Five" },
      { native: "Ekpaa", english: "Six" },
    ],
  },
  {
    id: "family",
    title: "Family",
    emoji: "👨‍👩‍👧",
    words: [
      { native: "Awo", english: "Mother" },
      { native: "Tsɛ", english: "Father" },
      { native: "Nyɛmi", english: "Sibling" },
      { native: "Bi", english: "Child" },
      { native: "Naa", english: "Grandmother" },
      { native: "Nii", english: "Grandfather" },
    ],
  },
  {
    id: "phrases",
    title: "Useful phrases",
    emoji: "💬",
    words: [
      { native: "Ojogbaa", english: "Welcome" },
      { native: "Ofainɛ", english: "Please" },
      { native: "Kpaakpa", english: "Sorry" },
      { native: "Hɛɛ", english: "Yes" },
      { native: "Daabi", english: "No" },
      { native: "Mi gbɛi ji…", english: "My name is…" },
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
  {
    id: "numbers",
    title: "Numbers",
    emoji: "🔢",
    words: [
      { native: "Ɖeka", english: "One" },
      { native: "Eve", english: "Two" },
      { native: "Etɔ̃", english: "Three" },
      { native: "Ene", english: "Four" },
      { native: "Atɔ̃", english: "Five" },
      { native: "Ade", english: "Six" },
    ],
  },
  {
    id: "food",
    title: "Food",
    emoji: "🍲",
    words: [
      { native: "Nuɖuɖu", english: "Food" },
      { native: "Tsi", english: "Water" },
      { native: "Akple", english: "Akple" },
      { native: "Lã", english: "Meat" },
      { native: "Detsi", english: "Soup" },
      { native: "Mɔlu", english: "Rice" },
    ],
  },
  {
    id: "phrases",
    title: "Useful phrases",
    emoji: "💬",
    words: [
      { native: "Èfɔa?", english: "How are you?" },
      { native: "Mefɔ nyuie", english: "I am fine" },
      { native: "Ŋkɔnye…", english: "My name is…" },
      { native: "Meɖe kuku", english: "Please" },
      { native: "Tsɔm ke", english: "Sorry" },
      { native: "Ɛ̃", english: "Yes" },
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
  {
    id: "numbers",
    title: "Numbers",
    emoji: "🔢",
    words: [
      { native: "Baako", english: "One" },
      { native: "Ebien", english: "Two" },
      { native: "Ebiasa", english: "Three" },
      { native: "Anan", english: "Four" },
      { native: "Enum", english: "Five" },
      { native: "Esia", english: "Six" },
    ],
  },
  {
    id: "family",
    title: "Family",
    emoji: "👨‍👩‍👧",
    words: [
      { native: "Ɛna", english: "Mother" },
      { native: "Egya", english: "Father" },
      { native: "Nuabanyin", english: "Brother" },
      { native: "Nuabaa", english: "Sister" },
      { native: "Abusua", english: "Family" },
      { native: "Ba", english: "Child" },
    ],
  },
  {
    id: "phrases",
    title: "Useful phrases",
    emoji: "💬",
    words: [
      { native: "Mepaakyɛw", english: "Please" },
      { native: "Kosɛ", english: "Sorry" },
      { native: "Nyew", english: "Yes" },
      { native: "Daabi", english: "No" },
      { native: "Me din dze…", english: "My name is…" },
      { native: "Yɛbɛhyia bio", english: "See you again" },
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

// Daily goal: XP target per day
export const DAILY_XP_GOAL = 30;
