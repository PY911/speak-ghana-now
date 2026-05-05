import { createFileRoute, Link } from "@tanstack/react-router";
import iconImg from "@/assets/goghana-icon.png";
import heroImg from "@/assets/hero-learners.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GoGhana — Learn Ghanaian Languages, Beautifully" },
      {
        name: "description",
        content:
          "GoGhana is a modern mobile app to learn Twi, Ga, Ewe, Fante, Hausa, Dagomba and more — through interactive lessons, native audio and gamified practice.",
      },
      { property: "og:title", content: "GoGhana — Learn Ghanaian Languages" },
      {
        property: "og:description",
        content:
          "Preserve heritage. Speak with confidence. Master 12+ Ghanaian languages on your phone.",
      },
    ],
  }),
  component: Index,
});

const languages = [
  { name: "Twi", region: "Ashanti", greeting: "Akwaaba" },
  { name: "Ga", region: "Greater Accra", greeting: "Ojekoo" },
  { name: "Ewe", region: "Volta", greeting: "Woezɔ" },
  { name: "Fante", region: "Central", greeting: "Akwaaba" },
  { name: "Hausa", region: "Northern", greeting: "Sannu" },
  { name: "Dagomba", region: "Northern", greeting: "Desiba" },
  { name: "Nzema", region: "Western", greeting: "Akɛɛ" },
  { name: "Ahanta", region: "Western", greeting: "Akwaaba" },
  { name: "Akwapim", region: "Eastern", greeting: "Akwaaba" },
  { name: "Krobo", region: "Eastern", greeting: "Wɔɛzɔ" },
  { name: "Bono", region: "Bono", greeting: "Akwaaba" },
  { name: "Ga-Adangbe", region: "Coastal", greeting: "Hɛɛ" },
];

const features = [
  {
    title: "Native Audio",
    desc: "Every word spoken by native Ghanaian voices, recorded in studio.",
    icon: "🎙️",
  },
  {
    title: "Bite-sized Lessons",
    desc: "5-minute interactive sessions — flashcards, listening and speaking.",
    icon: "📚",
  },
  {
    title: "Voice Recognition",
    desc: "Get instant feedback on your pronunciation, syllable by syllable.",
    icon: "🎯",
  },
  {
    title: "Streaks & Badges",
    desc: "Stay motivated with daily goals, levels and cultural rewards.",
    icon: "🔥",
  },
  {
    title: "Real-Life Scenarios",
    desc: "Greetings, market chats, travel phrases — language you actually use.",
    icon: "🛍️",
  },
  {
    title: "12+ Languages",
    desc: "From Twi and Ga to Dagomba and Nzema — not just the popular ones.",
    icon: "🌍",
  },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src={iconImg}
            alt="GoGhana logo"
            width={36}
            height={36}
            className="rounded-lg shadow-soft"
          />
          <span className="font-display text-xl font-bold tracking-tight">
            GoGhana
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#languages" className="hover:text-sun-deep transition-colors">Languages</a>
          <a href="#features" className="hover:text-sun-deep transition-colors">Features</a>
          <a href="#mission" className="hover:text-sun-deep transition-colors">Mission</a>
        </nav>
        <Link
          to="/auth"
          className="inline-flex items-center px-4 py-2 rounded-full bg-ink text-sun text-sm font-semibold hover:scale-105 transition-bounce"
        >
          Start learning
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-sun opacity-95" />
      <div className="absolute inset-0 pattern-kente opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink text-sun text-xs font-semibold tracking-wide uppercase mb-6">
            <span className="size-1.5 rounded-full bg-sun animate-pulse" />
            Made in Ghana · For the world
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black leading-[0.95] text-ink">
            Speak Ghana.<br />
            <span className="italic font-light">Beautifully.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink/80 max-w-lg leading-relaxed">
            GoGhana is the modern way to learn Twi, Ga, Ewe, Fante, Hausa and 7+
            more indigenous languages — through immersive, gamified lessons.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/auth"
              className="px-7 py-4 rounded-2xl bg-ink text-sun font-semibold shadow-bold hover:translate-x-[-2px] hover:translate-y-[-2px] transition-bounce"
            >
              Start learning free
            </Link>
            <a
              href="#languages"
              className="px-7 py-4 rounded-2xl bg-cream text-ink font-semibold border-2 border-ink hover:bg-ink hover:text-sun transition-colors"
            >
              Explore languages
            </a>
          </div>
          <div className="mt-10 flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-ink/70">
            <div><span className="font-display font-bold text-ink text-xl sm:text-2xl">12+</span> languages</div>
            <div className="h-8 w-px bg-ink/20" />
            <div><span className="font-display font-bold text-ink text-xl sm:text-2xl">100%</span> native voices</div>
            <div className="h-8 w-px bg-ink/20" />
            <div><span className="font-display font-bold text-ink text-xl sm:text-2xl">5min</span> a day</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-ink rounded-3xl rotate-3" />
          <img
            src={heroImg}
            alt="Ghanaians learning languages on their phones"
            width={1280}
            height={1280}
            className="relative rounded-3xl border-4 border-ink shadow-bold w-full h-auto"
          />
          <div className="absolute -bottom-6 -left-6 bg-cream border-2 border-ink rounded-2xl px-5 py-3 shadow-bold-sun rotate-[-4deg]">
            <div className="text-xs uppercase tracking-wider text-ink/60">Today's word</div>
            <div className="font-display text-2xl font-bold">Akwaaba</div>
            <div className="text-xs text-ink/70">Welcome · Twi</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Languages() {
  return (
    <section id="languages" className="py-16 sm:py-24 lg:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-sm font-semibold uppercase tracking-wider text-sun-deep mb-3">
            Twelve languages · One nation
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-tight">
            From the coast to the savannah.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Each Ghanaian language carries the soul of its region. We honour
            them all — not just the popular ones.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {languages.map((l, i) => (
            <div
              key={l.name}
              className="group relative bg-card border-2 border-ink rounded-2xl p-4 sm:p-6 hover:bg-sun hover:-translate-y-1 transition-bounce cursor-pointer min-w-0"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="font-display text-xl sm:text-2xl lg:text-3xl font-black break-words leading-tight">
                {l.name}
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground group-hover:text-ink/60 mt-1 break-words">
                {l.region}
              </div>
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border group-hover:border-ink/20">
                <div className="text-[10px] sm:text-xs text-muted-foreground group-hover:text-ink/60">
                  Hello
                </div>
                <div className="font-display text-base sm:text-lg lg:text-xl font-semibold mt-0.5 break-words">
                  "{l.greeting}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-16 sm:py-24 lg:py-28 bg-ink text-cream relative overflow-hidden">
      <div className="absolute inset-0 pattern-kente opacity-10" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl mb-16">
          <div className="text-sm font-semibold uppercase tracking-wider text-sun mb-3">
            Built for real learners
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-black leading-tight text-cream">
            Everything you need to actually <span className="text-sun italic">speak</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative bg-cream/5 border border-cream/10 rounded-2xl p-7 hover:bg-sun hover:text-ink hover:border-sun transition-bounce"
            >
              <div className="text-4xl mb-5">{f.icon}</div>
              <h3 className="font-display text-2xl font-bold mb-2">{f.title}</h3>
              <p className="text-cream/70 group-hover:text-ink/80 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section id="mission" className="py-16 sm:py-24 lg:py-28 bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <div className="text-sm font-semibold uppercase tracking-wider text-sun-deep mb-4">
          Why GoGhana matters
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-black leading-[1.05]">
          More than an app. <br />
          <span className="italic font-light">A movement.</span>
        </h2>
        <p className="mt-8 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Younger generations are losing fluency. Elders carry stories that need
          to be passed on. GoGhana bridges that gap — preserving Ghana's
          linguistic heritage while empowering a new generation to speak with
          pride, anywhere in the world.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-6 text-left">
          {[
            ["Preserve", "Indigenous languages, documented and taught with care."],
            ["Connect", "Diaspora and homeland, generations and cultures."],
            ["Empower", "Confidence to speak — at home, at work, on the street."],
          ].map(([t, d]) => (
            <div key={t} className="border-l-4 border-ink pl-5 py-2">
              <div className="font-display text-2xl font-bold">{t}</div>
              <div className="text-muted-foreground mt-1">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="download" className="py-16 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] gradient-sun border-2 border-ink shadow-bold p-12 md:p-20 text-center">
          <div className="absolute inset-0 pattern-kente opacity-50" />
          <div className="relative">
            <img
              src={iconImg}
              alt=""
              width={80}
              height={80}
              loading="lazy"
              className="mx-auto rounded-2xl border-2 border-ink shadow-bold mb-8"
            />
            <h2 className="font-display text-4xl md:text-6xl font-black text-ink leading-tight">
              Yɛfrɛ wo. <br />
              <span className="italic font-light">We're calling you.</span>
            </h2>
            <p className="mt-6 text-lg text-ink/80 max-w-xl mx-auto">
              Join thousands rediscovering their mother tongue. Free to start.
              Forever yours.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <a className="px-8 py-4 rounded-2xl bg-ink text-sun font-semibold shadow-bold hover:translate-x-[-2px] hover:translate-y-[-2px] transition-bounce">
                Download for iOS
              </a>
              <a className="px-8 py-4 rounded-2xl bg-cream text-ink font-semibold border-2 border-ink hover:bg-ink hover:text-sun transition-colors">
                Get on Android
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <img src={iconImg} alt="" width={24} height={24} loading="lazy" className="rounded" />
          <span className="font-display font-bold text-ink">GoGhana</span>
          <span>· Preserving heritage, one word at a time.</span>
        </div>
        <div>© {new Date().getFullYear()} GoGhana. Made with ♥ in Accra.</div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Languages />
        <Features />
        <Mission />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
