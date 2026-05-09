export type Word = {
  native: string;
  english: string;
  /** Approximate English-spelling pronunciation, e.g. "ah-KWAH-bah" */
  pronunciation?: string;
};

export type Sentence = {
  native: string;
  english: string;
  pronunciation?: string;
};

export type Lesson = {
  id: string;
  title: string;
  emoji: string;
  /** Which unit this lesson belongs to (see Language.units) */
  unit: string;
  words: Word[];
  /** Optional example sentences using the new vocabulary */
  sentences?: Sentence[];
  /** Short grammar/usage tip shown before the lesson starts */
  tip?: string;
  /** Optional cultural note tied to the topic */
  culturalNote?: string;
};

export type Unit = {
  id: string;
  title: string;
  description: string;
  emoji: string;
};

export type Language = {
  code: string;
  name: string;
  region: string;
  greeting: string;
  flag: string;
  available: boolean;
  /** BCP-47 voice hint for browser TTS (best-effort fallback) */
  voiceLang?: string;
  units: Unit[];
  lessons: Lesson[];
};

// Shared unit definitions — all 4 active languages follow the same path
const UNITS: Unit[] = [
  { id: "basics",  title: "Unit 1 · Basics",        description: "Greetings, polite words, and your first conversation.", emoji: "👋" },
  { id: "people",  title: "Unit 2 · People",        description: "Family, friends, and how to talk about who you are.",   emoji: "👨‍👩‍👧" },
  { id: "numbers", title: "Unit 3 · Numbers",       description: "Counting from 1 to 12 — for time, money, and age.",     emoji: "🔢" },
  { id: "market",  title: "Unit 4 · At the Market", description: "Food, fruits, prices, and bargaining like a local.",     emoji: "🛍️" },
  { id: "world",   title: "Unit 5 · Your World",    description: "Colors, body parts, and animals around you.",            emoji: "🎨" },
  { id: "daily",   title: "Unit 6 · Daily Life",    description: "Days, weather, common verbs, and asking questions.",     emoji: "📅" },
];

const TWI: Lesson[] = [
  {
    id: "greetings",
    title: "Greetings",
    emoji: "👋",
    unit: "basics",
    tip: "Twi greetings change with the time of day. The reply to most greetings is 'Yaa' followed by a respect word: 'Yaa ɛna' (to a woman), 'Yaa agya' (to a man).",
    culturalNote: "Greeting elders is essential in Akan culture. Always greet with your right hand — never the left.",
    words: [
      { native: "Akwaaba",        english: "Welcome",        pronunciation: "ah-KWAH-bah" },
      { native: "Maakye",         english: "Good morning",   pronunciation: "MAH-cheh" },
      { native: "Maaha",          english: "Good afternoon", pronunciation: "MAH-hah" },
      { native: "Maadwo",         english: "Good evening",   pronunciation: "MAH-jwo" },
      { native: "Yɛbɛhyia bio",   english: "See you again",  pronunciation: "yeh-beh-SHEE-ah BEE-oh" },
      { native: "Medaase",        english: "Thank you",      pronunciation: "meh-DAH-seh" },
    ],
    sentences: [
      { native: "Maakye, wo ho te sɛn?", english: "Good morning, how are you?" },
      { native: "Medaase paa",            english: "Thank you very much" },
    ],
  },
  {
    id: "phrases",
    title: "Useful phrases",
    emoji: "💬",
    unit: "basics",
    tip: "'Mepa wo kyɛw' literally means 'I beg you' and is the polite way to say please or excuse me.",
    words: [
      { native: "Wo ho te sɛn?", english: "How are you?",  pronunciation: "wo ho teh sen" },
      { native: "Me ho yɛ",      english: "I am fine",     pronunciation: "meh ho yeh" },
      { native: "Me din de…",    english: "My name is…",   pronunciation: "meh deen deh" },
      { native: "Mepa wo kyɛw",  english: "Please",        pronunciation: "meh-PAH wo CHEW" },
      { native: "Kafra",         english: "Sorry",         pronunciation: "KAH-frah" },
      { native: "Aane",          english: "Yes",           pronunciation: "AH-neh" },
    ],
    sentences: [
      { native: "Me din de Ama. Wo din de sɛn?", english: "My name is Ama. What is your name?" },
    ],
  },
  {
    id: "family",
    title: "Family",
    emoji: "👨‍👩‍👧",
    unit: "people",
    tip: "Akan families are matrilineal — your mother's side defines your clan (abusua).",
    culturalNote: "Children are often named after the day they were born: Kwame (Saturday), Ama (Saturday girl), Kofi (Friday).",
    words: [
      { native: "Maame",  english: "Mother",  pronunciation: "MAH-meh" },
      { native: "Papa",   english: "Father",  pronunciation: "PAH-pah" },
      { native: "Nua",    english: "Sibling", pronunciation: "NOO-ah" },
      { native: "Abusua", english: "Family",  pronunciation: "ah-BOO-soo-ah" },
      { native: "Akɔnta", english: "In-law",  pronunciation: "ah-KON-tah" },
      { native: "Ba",     english: "Child",   pronunciation: "bah" },
    ],
    sentences: [
      { native: "Me maame yɛ ɔdɔfo", english: "My mother is kind" },
      { native: "Yɛn abusua dɔɔso",   english: "Our family is large" },
    ],
  },
  {
    id: "numbers",
    title: "Numbers 1–6",
    emoji: "🔢",
    unit: "numbers",
    tip: "When counting objects, the number usually comes after the noun: 'mmofra mmienu' (two children).",
    words: [
      { native: "Baako",   english: "One",   pronunciation: "BAH-koh" },
      { native: "Mmienu",  english: "Two",   pronunciation: "MEE-eh-noo" },
      { native: "Mmiɛnsa", english: "Three", pronunciation: "MEE-en-sah" },
      { native: "Ɛnan",    english: "Four",  pronunciation: "EH-nan" },
      { native: "Enum",    english: "Five",  pronunciation: "EH-noom" },
      { native: "Nsia",    english: "Six",   pronunciation: "n-SEE-ah" },
    ],
  },
  {
    id: "numbers2",
    title: "Numbers 7–12",
    emoji: "🔟",
    unit: "numbers",
    words: [
      { native: "Nson",     english: "Seven",  pronunciation: "n-SOHN" },
      { native: "Nwɔtwe",   english: "Eight",  pronunciation: "n-WOH-tweh" },
      { native: "Nkron",    english: "Nine",   pronunciation: "n-KRON" },
      { native: "Du",       english: "Ten",    pronunciation: "doo" },
      { native: "Dubaako",  english: "Eleven", pronunciation: "doo-BAH-koh" },
      { native: "Dummienu", english: "Twelve", pronunciation: "doo-MEE-noo" },
    ],
    sentences: [
      { native: "Me wɔ mfeɛ du", english: "I am ten years old" },
    ],
  },
  {
    id: "food",
    title: "Food",
    emoji: "🍲",
    unit: "market",
    tip: "Fufu is eaten with the right hand — scoop a small ball, dip in soup, and swallow without chewing.",
    culturalNote: "Sharing food is a sign of friendship. If invited to eat, accepting even a little bite shows respect.",
    words: [
      { native: "Aduane", english: "Food",  pronunciation: "ah-DOO-ah-neh" },
      { native: "Nsuo",   english: "Water", pronunciation: "n-SOO-oh" },
      { native: "Fufuo",  english: "Fufu",  pronunciation: "FOO-foo-oh" },
      { native: "Banku",  english: "Banku", pronunciation: "BAN-koo" },
      { native: "Nam",    english: "Meat",  pronunciation: "nahm" },
      { native: "Nkwan",  english: "Soup",  pronunciation: "n-KWAN" },
    ],
    sentences: [
      { native: "Mepɛ fufuo ne nkwan", english: "I want fufu and soup" },
    ],
  },
  {
    id: "fruits",
    title: "Fruits",
    emoji: "🍌",
    unit: "market",
    words: [
      { native: "Kwadu",  english: "Banana",    pronunciation: "KWAH-doo" },
      { native: "Akutu",  english: "Orange",    pronunciation: "ah-KOO-too" },
      { native: "Mango",  english: "Mango",     pronunciation: "MAN-go" },
      { native: "Ankaa",  english: "Pineapple", pronunciation: "an-KAH" },
      { native: "Paya",   english: "Pawpaw",    pronunciation: "PAH-yah" },
      { native: "Bɔrɔdɛ", english: "Plantain",  pronunciation: "boh-roh-DEH" },
    ],
  },
  {
    id: "market",
    title: "At the market",
    emoji: "🛍️",
    unit: "market",
    tip: "Bargaining is expected. Start by offering about 60% of the asking price and meet in the middle.",
    culturalNote: "Makola Market in Accra is one of West Africa's largest markets — a sensory feast of color, sound, and language.",
    words: [
      { native: "Dwa",      english: "Market",        pronunciation: "jwa" },
      { native: "Sika",     english: "Money",         pronunciation: "SEE-kah" },
      { native: "Tɔ",       english: "Buy",           pronunciation: "toh" },
      { native: "Tɔn",      english: "Sell",          pronunciation: "tohn" },
      { native: "Bo bɛn?",  english: "How much?",     pronunciation: "bo ben" },
      { native: "Te so",    english: "Reduce price",  pronunciation: "teh so" },
    ],
    sentences: [
      { native: "Bo bɛn? Te so kakra",   english: "How much? Reduce a little" },
      { native: "Mepɛ sɛ metɔ kwadu",     english: "I want to buy bananas" },
    ],
  },
  {
    id: "colors",
    title: "Colors",
    emoji: "🎨",
    unit: "world",
    culturalNote: "In Akan culture, colors carry meaning: black for maturity, white for purity and victory, red for sacred mourning.",
    words: [
      { native: "Tuntum",      english: "Black",  pronunciation: "TOON-toom" },
      { native: "Fitaa",       english: "White",  pronunciation: "FEE-tah" },
      { native: "Kɔkɔɔ",       english: "Red",    pronunciation: "KOH-koh" },
      { native: "Ahabammono",  english: "Green",  pronunciation: "ah-hah-bam-MOH-no" },
      { native: "Bruu",        english: "Blue",   pronunciation: "broo" },
      { native: "Akokɔsrade",  english: "Yellow", pronunciation: "ah-koh-koh-SRAH-deh" },
    ],
  },
  {
    id: "body",
    title: "Body parts",
    emoji: "🧍",
    unit: "world",
    words: [
      { native: "Tiri", english: "Head",  pronunciation: "TEE-ree" },
      { native: "Ani",  english: "Eye",   pronunciation: "AH-nee" },
      { native: "Aso",  english: "Ear",   pronunciation: "AH-so" },
      { native: "Ano",  english: "Mouth", pronunciation: "AH-no" },
      { native: "Nsa",  english: "Hand",  pronunciation: "n-SAH" },
      { native: "Nan",  english: "Leg",   pronunciation: "nahn" },
    ],
  },
  {
    id: "animals",
    title: "Animals",
    emoji: "🐐",
    unit: "world",
    words: [
      { native: "Ɔkraman",   english: "Dog",     pronunciation: "oh-KRAH-man" },
      { native: "Agyinamoa", english: "Cat",     pronunciation: "ah-jee-nah-MOH-ah" },
      { native: "Aponkye",   english: "Goat",    pronunciation: "ah-PON-cheh" },
      { native: "Nantwie",   english: "Cow",     pronunciation: "NAN-tweh" },
      { native: "Akokɔ",     english: "Chicken", pronunciation: "ah-KOH-koh" },
      { native: "Anomaa",    english: "Bird",    pronunciation: "ah-NOH-mah" },
    ],
  },
  {
    id: "days",
    title: "Days of the week",
    emoji: "📅",
    unit: "daily",
    culturalNote: "Akan day-names are given to children based on the day they were born — Kwadwo (Mon), Kwabena (Tue), Kwaku (Wed), Yaw (Thu), Kofi (Fri), Kwame (Sat), Kwasi (Sun).",
    words: [
      { native: "Dwoada",    english: "Monday",    pronunciation: "JWOH-ah-dah" },
      { native: "Benada",    english: "Tuesday",   pronunciation: "BEH-nah-dah" },
      { native: "Wukuada",   english: "Wednesday", pronunciation: "woo-KOO-ah-dah" },
      { native: "Yawoada",   english: "Thursday",  pronunciation: "YAH-woh-ah-dah" },
      { native: "Fiada",     english: "Friday",    pronunciation: "FEE-ah-dah" },
      { native: "Memeneda",  english: "Saturday",  pronunciation: "meh-meh-NEH-dah" },
    ],
  },
  {
    id: "weather",
    title: "Weather",
    emoji: "☀️",
    unit: "daily",
    words: [
      { native: "Awia",      english: "Sun",   pronunciation: "AH-wee-ah" },
      { native: "Nsuo tɔ",   english: "Rain",  pronunciation: "n-SOO-oh toh" },
      { native: "Mframa",    english: "Wind",  pronunciation: "m-FRAH-mah" },
      { native: "Awɔw",      english: "Cold",  pronunciation: "ah-WOW" },
      { native: "Hyew",      english: "Hot",   pronunciation: "shoo" },
      { native: "Mununkum",  english: "Cloud", pronunciation: "moo-NOON-koom" },
    ],
  },
  {
    id: "verbs",
    title: "Common verbs",
    emoji: "🏃",
    unit: "daily",
    tip: "Twi verbs are usually one syllable. Add 're' before a verb for present continuous: 'mereko' = 'I am going'.",
    words: [
      { native: "Kɔ",   english: "Go",     pronunciation: "koh" },
      { native: "Bra",  english: "Come",   pronunciation: "brah" },
      { native: "Di",   english: "Eat",    pronunciation: "dee" },
      { native: "Nom",  english: "Drink",  pronunciation: "nohm" },
      { native: "Da",   english: "Sleep",  pronunciation: "dah" },
      { native: "Kasa", english: "Speak",  pronunciation: "KAH-sah" },
    ],
    sentences: [
      { native: "Mereko fie",  english: "I am going home" },
      { native: "Bra ha",       english: "Come here" },
    ],
  },
  {
    id: "questions",
    title: "Question words",
    emoji: "❓",
    unit: "daily",
    words: [
      { native: "Hena?",     english: "Who?",   pronunciation: "HEH-nah" },
      { native: "Ɛdeɛn?",    english: "What?",  pronunciation: "eh-DEN" },
      { native: "Ɛhe?",      english: "Where?", pronunciation: "EH-heh" },
      { native: "Bere bɛn?", english: "When?",  pronunciation: "BEH-reh ben" },
      { native: "Adɛn?",     english: "Why?",   pronunciation: "ah-DEN" },
      { native: "Sɛn?",      english: "How?",   pronunciation: "sen" },
    ],
  },
];

const GA: Lesson[] = [
  {
    id: "greetings", title: "Greetings", emoji: "👋", unit: "basics",
    tip: "Ga greetings change with the time of day. 'Ojekoo' is morning; reply with 'Yaa'.",
    culturalNote: "The Ga people are the original inhabitants of Accra and host the famous Homowo (hooting at hunger) festival each year.",
    words: [
      { native: "Ojekoo",       english: "Good morning", pronunciation: "oh-JEH-koh" },
      { native: "Oyiwala don",  english: "Thank you",    pronunciation: "oh-yee-WAH-lah dohn" },
      { native: "Mibaa",        english: "I am coming",  pronunciation: "mee-BAH" },
      { native: "Te oyɔɔ tɛŋ",  english: "How are you?", pronunciation: "teh oh-YOH teng" },
      { native: "Mihiɛ",        english: "I am well",    pronunciation: "MEE-hee-eh" },
      { native: "Yaawɔɔ",       english: "Goodbye",      pronunciation: "YAH-woh" },
    ],
  },
  {
    id: "phrases", title: "Useful phrases", emoji: "💬", unit: "basics",
    words: [
      { native: "Ojogbaa",    english: "Welcome" },
      { native: "Ofainɛ",     english: "Please" },
      { native: "Kpaakpa",    english: "Sorry" },
      { native: "Hɛɛ",        english: "Yes" },
      { native: "Daabi",      english: "No" },
      { native: "Mi gbɛi ji…", english: "My name is…" },
    ],
  },
  {
    id: "family", title: "Family", emoji: "👨‍👩‍👧", unit: "people",
    words: [
      { native: "Awo",   english: "Mother" },
      { native: "Tsɛ",   english: "Father" },
      { native: "Nyɛmi", english: "Sibling" },
      { native: "Bi",    english: "Child" },
      { native: "Naa",   english: "Grandmother" },
      { native: "Nii",   english: "Grandfather" },
    ],
  },
  {
    id: "numbers", title: "Numbers 1–6", emoji: "🔢", unit: "numbers",
    words: [
      { native: "Ekome", english: "One" },
      { native: "Enyɔ",  english: "Two" },
      { native: "Etɛ",   english: "Three" },
      { native: "Ejwɛ",  english: "Four" },
      { native: "Enumɔ", english: "Five" },
      { native: "Ekpaa", english: "Six" },
    ],
  },
  {
    id: "numbers2", title: "Numbers 7–12", emoji: "🔟", unit: "numbers",
    words: [
      { native: "Kpawo",            english: "Seven" },
      { native: "Kpaanyɔ",          english: "Eight" },
      { native: "Nɛɛhu",            english: "Nine" },
      { native: "Nyɔŋma",           english: "Ten" },
      { native: "Nyɔŋma kɛ ekome",  english: "Eleven" },
      { native: "Nyɔŋma kɛ enyɔ",   english: "Twelve" },
    ],
  },
  {
    id: "food", title: "Food", emoji: "🍲", unit: "market",
    culturalNote: "Kenkey is a Ga staple — fermented corn dough wrapped in leaves and steamed. Eaten with pepper and fried fish.",
    words: [
      { native: "Niimɔ",  english: "Food" },
      { native: "Nu",     english: "Water" },
      { native: "Kenkey", english: "Kenkey" },
      { native: "Loo",    english: "Meat" },
      { native: "Wele",   english: "Cow skin" },
      { native: "Banku",  english: "Banku" },
    ],
  },
  {
    id: "market", title: "At the market", emoji: "🛍️", unit: "market",
    words: [
      { native: "Jara",      english: "Market" },
      { native: "Shika",     english: "Money" },
      { native: "Hee",       english: "Buy" },
      { native: "Hɔɔ",       english: "Sell" },
      { native: "Ena tɛŋ?",  english: "How much?" },
      { native: "Ɛyɛ",       english: "It is good" },
    ],
  },
  {
    id: "colors", title: "Colors", emoji: "🎨", unit: "world",
    words: [
      { native: "Diŋ",   english: "Black" },
      { native: "Yɛŋ",   english: "White" },
      { native: "Tsuru", english: "Red" },
      { native: "Akawɛ", english: "Green" },
      { native: "Bluu",  english: "Blue" },
      { native: "Akɔkɔ", english: "Yellow" },
    ],
  },
  {
    id: "body", title: "Body parts", emoji: "🧍", unit: "world",
    words: [
      { native: "Yitso",   english: "Head" },
      { native: "Hiŋmɛi",  english: "Eye" },
      { native: "Toi",     english: "Ear" },
      { native: "Naa",     english: "Mouth" },
      { native: "Nine",    english: "Hand" },
      { native: "Nane",    english: "Leg" },
    ],
  },
  {
    id: "animals", title: "Animals", emoji: "🐐", unit: "world",
    words: [
      { native: "Gbe",       english: "Dog" },
      { native: "Tsina",     english: "Cat" },
      { native: "Toŋ",       english: "Goat" },
      { native: "Tso",       english: "Cow" },
      { native: "Okpɔŋ",     english: "Chicken" },
      { native: "Loofɔlɔi",  english: "Bird" },
    ],
  },
  {
    id: "days", title: "Days of the week", emoji: "📅", unit: "daily",
    words: [
      { native: "Dzu",    english: "Monday" },
      { native: "Dzufɔ",  english: "Tuesday" },
      { native: "Sho",    english: "Wednesday" },
      { native: "Soo",    english: "Thursday" },
      { native: "Sohaa",  english: "Friday" },
      { native: "Hɔ",     english: "Saturday" },
    ],
  },
  {
    id: "verbs", title: "Common verbs", emoji: "🏃", unit: "daily",
    words: [
      { native: "Yaa",    english: "Go" },
      { native: "Ba",     english: "Come" },
      { native: "Yeɔ",    english: "Eat" },
      { native: "Nu",     english: "Drink" },
      { native: "Wɔ",     english: "Sleep" },
      { native: "Wieɔ",   english: "Speak" },
    ],
  },
  {
    id: "questions", title: "Question words", emoji: "❓", unit: "daily",
    words: [
      { native: "Namɔ?",      english: "Who?" },
      { native: "Mɛni?",      english: "What?" },
      { native: "Nɛgbɛ?",     english: "Where?" },
      { native: "Be mli?",    english: "When?" },
      { native: "Mɛni hewɔ?", english: "Why?" },
      { native: "Tɛŋŋ?",      english: "How?" },
    ],
  },
];

const EWE: Lesson[] = [
  {
    id: "greetings", title: "Greetings", emoji: "👋", unit: "basics",
    tip: "Ewe is tonal. The greeting 'Ŋdi' (good morning) uses a nasal Ŋ — start the sound in the back of your nose.",
    culturalNote: "The Ewe people span southern Ghana, Togo, and Benin. The Hogbetsotso festival celebrates the great migration from Notsie.",
    words: [
      { native: "Woezɔ",      english: "Welcome",        pronunciation: "WOH-eh-zoh" },
      { native: "Ŋdi",        english: "Good morning",   pronunciation: "n-DEE" },
      { native: "Ŋdɔ",        english: "Good afternoon", pronunciation: "n-DOH" },
      { native: "Fiẽ",        english: "Good evening",   pronunciation: "fee-EH" },
      { native: "Akpe",       english: "Thank you",      pronunciation: "ak-PEH" },
      { native: "Hede nyuie", english: "Goodbye",        pronunciation: "HEH-deh NYOO-yeh" },
    ],
  },
  {
    id: "phrases", title: "Useful phrases", emoji: "💬", unit: "basics",
    words: [
      { native: "Èfɔa?",      english: "How are you?" },
      { native: "Mefɔ nyuie", english: "I am fine" },
      { native: "Ŋkɔnye…",    english: "My name is…" },
      { native: "Meɖe kuku",  english: "Please" },
      { native: "Tsɔm ke",    english: "Sorry" },
      { native: "Ɛ̃",          english: "Yes" },
    ],
  },
  {
    id: "people", title: "People", emoji: "🧑", unit: "people",
    words: [
      { native: "Dada",  english: "Mother" },
      { native: "Papa",  english: "Father" },
      { native: "Nɔvi",  english: "Sibling" },
      { native: "Xɔlɔ̃",  english: "Friend" },
      { native: "Ɖevi",  english: "Child" },
      { native: "Ame",   english: "Person" },
    ],
  },
  {
    id: "numbers", title: "Numbers 1–6", emoji: "🔢", unit: "numbers",
    words: [
      { native: "Ɖeka", english: "One" },
      { native: "Eve",  english: "Two" },
      { native: "Etɔ̃",  english: "Three" },
      { native: "Ene",  english: "Four" },
      { native: "Atɔ̃",  english: "Five" },
      { native: "Ade",  english: "Six" },
    ],
  },
  {
    id: "numbers2", title: "Numbers 7–12", emoji: "🔟", unit: "numbers",
    words: [
      { native: "Adre",      english: "Seven" },
      { native: "Enyi",      english: "Eight" },
      { native: "Asieke",    english: "Nine" },
      { native: "Ewo",       english: "Ten" },
      { native: "Wuiɖekɛ",   english: "Eleven" },
      { native: "Wuieve",    english: "Twelve" },
    ],
  },
  {
    id: "food", title: "Food", emoji: "🍲", unit: "market",
    culturalNote: "Akple is the Ewe staple — a smooth corn dough eaten with okro or fetri detsi (palm soup).",
    words: [
      { native: "Nuɖuɖu", english: "Food" },
      { native: "Tsi",    english: "Water" },
      { native: "Akple",  english: "Akple" },
      { native: "Lã",     english: "Meat" },
      { native: "Detsi",  english: "Soup" },
      { native: "Mɔlu",   english: "Rice" },
    ],
  },
  {
    id: "fruits", title: "Fruits", emoji: "🍌", unit: "market",
    words: [
      { native: "Akɔɖu",        english: "Banana" },
      { native: "Aŋutiti",      english: "Orange" },
      { native: "Mango",        english: "Mango" },
      { native: "Atɔmɔ",        english: "Pineapple" },
      { native: "Adiba",        english: "Pawpaw" },
      { native: "Akɔɖu kpakpa", english: "Plantain" },
    ],
  },
  {
    id: "market", title: "At the market", emoji: "🛍️", unit: "market",
    words: [
      { native: "Asi",            english: "Market" },
      { native: "Ga",             english: "Money" },
      { native: "Ƒle",            english: "Buy" },
      { native: "Dzra",           english: "Sell" },
      { native: "Asia nye nenie?", english: "How much?" },
      { native: "Enyo",           english: "It is good" },
    ],
  },
  {
    id: "colors", title: "Colors", emoji: "🎨", unit: "world",
    words: [
      { native: "Yibɔ",       english: "Black" },
      { native: "Ɣi",         english: "White" },
      { native: "Dzẽ",        english: "Red" },
      { native: "Gbɛ",        english: "Green" },
      { native: "Blɔ",        english: "Blue" },
      { native: "Aŋutiŋutu",  english: "Yellow" },
    ],
  },
  {
    id: "body", title: "Body parts", emoji: "🧍", unit: "world",
    words: [
      { native: "Ta",   english: "Head" },
      { native: "Ŋku",  english: "Eye" },
      { native: "To",   english: "Ear" },
      { native: "Nu",   english: "Mouth" },
      { native: "Asi",  english: "Hand" },
      { native: "Afɔ",  english: "Leg" },
    ],
  },
  {
    id: "animals", title: "Animals", emoji: "🐐", unit: "world",
    words: [
      { native: "Avu",   english: "Dog" },
      { native: "Dadi",  english: "Cat" },
      { native: "Gbɔ̃",   english: "Goat" },
      { native: "Nyi",   english: "Cow" },
      { native: "Koklo", english: "Chicken" },
      { native: "Xevi",  english: "Bird" },
    ],
  },
  {
    id: "days", title: "Days of the week", emoji: "📅", unit: "daily",
    words: [
      { native: "Dzoɖa",    english: "Monday" },
      { native: "Blaɖa",    english: "Tuesday" },
      { native: "Kuɖa",     english: "Wednesday" },
      { native: "Yawoɖa",   english: "Thursday" },
      { native: "Fiɖa",     english: "Friday" },
      { native: "Memliɖa",  english: "Saturday" },
    ],
  },
  {
    id: "weather", title: "Weather", emoji: "☀️", unit: "daily",
    words: [
      { native: "Ɣe",         english: "Sun" },
      { native: "Tsidzadza",  english: "Rain" },
      { native: "Ya",         english: "Wind" },
      { native: "Vuvɔ",       english: "Cold" },
      { native: "Dzo",        english: "Heat" },
      { native: "Alilikpo",   english: "Cloud" },
    ],
  },
  {
    id: "verbs", title: "Common verbs", emoji: "🏃", unit: "daily",
    words: [
      { native: "Yi",      english: "Go" },
      { native: "Va",      english: "Come" },
      { native: "Ɖu",      english: "Eat" },
      { native: "No",      english: "Drink" },
      { native: "Dɔ alɔ̃",  english: "Sleep" },
      { native: "Ƒo nu",   english: "Speak" },
    ],
  },
  {
    id: "questions", title: "Question words", emoji: "❓", unit: "daily",
    words: [
      { native: "Amekae?",  english: "Who?" },
      { native: "Nukae?",   english: "What?" },
      { native: "Afikae?",  english: "Where?" },
      { native: "Ɣekaɣie?", english: "When?" },
      { native: "Nukatae?", english: "Why?" },
      { native: "Aleke?",   english: "How?" },
    ],
  },
];

const FANTE: Lesson[] = [
  {
    id: "greetings", title: "Greetings", emoji: "👋", unit: "basics",
    tip: "Fante is closely related to Twi but has its own pronunciation — 'Wo ho te dɛn?' instead of 'Wo ho te sɛn?'.",
    culturalNote: "The Fante people of the central coast were among the first Akan groups to interact with Europeans, leaving castles like Cape Coast and Elmina.",
    words: [
      { native: "Akwaaba",      english: "Welcome",      pronunciation: "ah-KWAH-bah" },
      { native: "Maakye",       english: "Good morning", pronunciation: "MAH-cheh" },
      { native: "Medaase",      english: "Thank you",    pronunciation: "meh-DAH-seh" },
      { native: "Wo ho te dɛn?", english: "How are you?", pronunciation: "wo ho teh den" },
      { native: "Me ho yɛ",     english: "I am fine",    pronunciation: "meh ho yeh" },
      { native: "Nantew yie",   english: "Goodbye",      pronunciation: "nan-TEW yee-eh" },
    ],
  },
  {
    id: "phrases", title: "Useful phrases", emoji: "💬", unit: "basics",
    words: [
      { native: "Mepaakyɛw",      english: "Please" },
      { native: "Kosɛ",           english: "Sorry" },
      { native: "Nyew",           english: "Yes" },
      { native: "Daabi",          english: "No" },
      { native: "Me din dze…",    english: "My name is…" },
      { native: "Yɛbɛhyia bio",   english: "See you again" },
    ],
  },
  {
    id: "family", title: "Family", emoji: "👨‍👩‍👧", unit: "people",
    words: [
      { native: "Ɛna",        english: "Mother" },
      { native: "Egya",       english: "Father" },
      { native: "Nuabanyin",  english: "Brother" },
      { native: "Nuabaa",     english: "Sister" },
      { native: "Abusua",     english: "Family" },
      { native: "Ba",         english: "Child" },
    ],
  },
  {
    id: "numbers", title: "Numbers 1–6", emoji: "🔢", unit: "numbers",
    words: [
      { native: "Baako",   english: "One" },
      { native: "Ebien",   english: "Two" },
      { native: "Ebiasa",  english: "Three" },
      { native: "Anan",    english: "Four" },
      { native: "Enum",    english: "Five" },
      { native: "Esia",    english: "Six" },
    ],
  },
  {
    id: "numbers2", title: "Numbers 7–12", emoji: "🔟", unit: "numbers",
    words: [
      { native: "Esuon",     english: "Seven" },
      { native: "Awɔtwe",    english: "Eight" },
      { native: "Akron",     english: "Nine" },
      { native: "Edu",       english: "Ten" },
      { native: "Edubaako",  english: "Eleven" },
      { native: "Edubien",   english: "Twelve" },
    ],
  },
  {
    id: "food", title: "Food", emoji: "🍲", unit: "market",
    words: [
      { native: "Edziban",  english: "Food" },
      { native: "Nsu",      english: "Water" },
      { native: "Fufuw",    english: "Fufu" },
      { native: "Nam",      english: "Meat" },
      { native: "Nkwan",    english: "Soup" },
      { native: "Bankye",   english: "Cassava" },
    ],
  },
  {
    id: "market", title: "At the Market", emoji: "🛍️", unit: "market",
    words: [
      { native: "Dwa",      english: "Market" },
      { native: "Sika",     english: "Money" },
      { native: "Tɔ",       english: "Buy" },
      { native: "Tɔn",      english: "Sell" },
      { native: "Bo bɛn?",  english: "How much?" },
      { native: "Ɛyɛ fɛ",   english: "It is nice" },
    ],
  },
  {
    id: "colors", title: "Colors", emoji: "🎨", unit: "world",
    words: [
      { native: "Tuntum",      english: "Black" },
      { native: "Fitaa",       english: "White" },
      { native: "Memen",       english: "Red" },
      { native: "Ahabammono",  english: "Green" },
      { native: "Bruu",        english: "Blue" },
      { native: "Akokɔsrade",  english: "Yellow" },
    ],
  },
  {
    id: "body", title: "Body parts", emoji: "🧍", unit: "world",
    words: [
      { native: "Etsir",   english: "Head" },
      { native: "Enyiwa",  english: "Eye" },
      { native: "Asow",    english: "Ear" },
      { native: "Anom",    english: "Mouth" },
      { native: "Nsa",     english: "Hand" },
      { native: "Nan",     english: "Leg" },
    ],
  },
  {
    id: "animals", title: "Animals", emoji: "🐐", unit: "world",
    words: [
      { native: "Ɔkraman",   english: "Dog" },
      { native: "Egyinamoa", english: "Cat" },
      { native: "Aponkye",   english: "Goat" },
      { native: "Nantwi",    english: "Cow" },
      { native: "Akokɔ",     english: "Chicken" },
      { native: "Anoma",     english: "Bird" },
    ],
  },
  {
    id: "days", title: "Days of the week", emoji: "📅", unit: "daily",
    words: [
      { native: "Dwowda",   english: "Monday" },
      { native: "Benada",   english: "Tuesday" },
      { native: "Wukuda",   english: "Wednesday" },
      { native: "Yawda",    english: "Thursday" },
      { native: "Fida",     english: "Friday" },
      { native: "Memenda",  english: "Saturday" },
    ],
  },
  {
    id: "weather", title: "Weather", emoji: "☀️", unit: "daily",
    words: [
      { native: "Ewia",      english: "Sun" },
      { native: "Nsu tɔ",    english: "Rain" },
      { native: "Mframa",    english: "Wind" },
      { native: "Awɔw",      english: "Cold" },
      { native: "Hyew",      english: "Hot" },
      { native: "Mununkum",  english: "Cloud" },
    ],
  },
  {
    id: "verbs", title: "Common verbs", emoji: "🏃", unit: "daily",
    words: [
      { native: "Kɔ",    english: "Go" },
      { native: "Bra",   english: "Come" },
      { native: "Didzi", english: "Eat" },
      { native: "Nom",   english: "Drink" },
      { native: "Da",    english: "Sleep" },
      { native: "Kasa",  english: "Speak" },
    ],
  },
  {
    id: "questions", title: "Question words", emoji: "❓", unit: "daily",
    words: [
      { native: "Hwan?",      english: "Who?" },
      { native: "Dɛn?",       english: "What?" },
      { native: "Hen?",       english: "Where?" },
      { native: "Bere bɛn?",  english: "When?" },
      { native: "Adɛn?",      english: "Why?" },
      { native: "Ɛdze sɛn?",  english: "How?" },
    ],
  },
];

export const LANGUAGES: Language[] = [
  { code: "twi",        name: "Twi",        region: "Ashanti",        greeting: "Akwaaba", flag: "🟡", available: true,  voiceLang: "ak", units: UNITS, lessons: TWI },
  { code: "ga",         name: "Ga",         region: "Greater Accra",  greeting: "Ojekoo",  flag: "🔵", available: true,  voiceLang: "gaa", units: UNITS, lessons: GA },
  { code: "ewe",        name: "Ewe",        region: "Volta",          greeting: "Woezɔ",   flag: "🟢", available: true,  voiceLang: "ee",  units: UNITS, lessons: EWE },
  { code: "fante",      name: "Fante",      region: "Central",        greeting: "Akwaaba", flag: "🔴", available: true,  voiceLang: "fat", units: UNITS, lessons: FANTE },
  { code: "hausa",      name: "Hausa",      region: "Northern",       greeting: "Sannu",   flag: "⚪", available: false, units: [], lessons: [] },
  { code: "dagomba",    name: "Dagomba",    region: "Northern",       greeting: "Desiba",  flag: "⚫", available: false, units: [], lessons: [] },
  { code: "nzema",      name: "Nzema",      region: "Western",        greeting: "Akɛɛ",    flag: "🟠", available: false, units: [], lessons: [] },
  { code: "ahanta",     name: "Ahanta",     region: "Western",        greeting: "Akwaaba", flag: "🟤", available: false, units: [], lessons: [] },
  { code: "akwapim",    name: "Akwapim",    region: "Eastern",        greeting: "Akwaaba", flag: "🟣", available: false, units: [], lessons: [] },
  { code: "krobo",      name: "Krobo",      region: "Eastern",        greeting: "Wɔɛzɔ",   flag: "🟪", available: false, units: [], lessons: [] },
  { code: "bono",       name: "Bono",       region: "Bono",           greeting: "Akwaaba", flag: "🟧", available: false, units: [], lessons: [] },
  { code: "ga-adangbe", name: "Ga-Adangbe", region: "Coastal",        greeting: "Hɛɛ",     flag: "🟦", available: false, units: [], lessons: [] },
];

export const findLanguage = (code: string) => LANGUAGES.find((l) => l.code === code);
export const findLesson = (code: string, lessonId: string) =>
  findLanguage(code)?.lessons.find((l) => l.id === lessonId);

// Daily goal: XP target per day
export const DAILY_XP_GOAL = 30;
