// ============================================================
// EDIT EVERYTHING HERE — this is the only file you need to touch
// to personalize the site (name, messages, photos, letter, song).
// ============================================================

export const siteConfig = {
  // Her name — shown in the hero and throughout
  friendName: "SAMIKSHA",

  // Sender / your name — shown as the letter's signature
  fromName: "JAY",

  // Hero
  heroGreeting: "Hey", // "Hey {friendName}"
  heroSubline: "A little world of memories, smiles, and surprises — made just for you.",
  heroButtonLabel: "Open It Up",

  // "Why You're Amazing" flip-card grid — click each card to flip
  reasons: [
    "Your smile has a way of brightening an ordinary day ✨",
    "You bring warmth wherever you go 💗",
    "Your laughter makes moments memorable 🌸",
    "You care deeply about the people around you 🤍",
    "You make even simple days feel special 🌷",
    "Your kindness never goes unnoticed 💫",
    "You are wonderfully and unapologetically you 🌟",
    "The little things about you mean so much 💛",
    "The world is brighter with you in it 🌍",
  ],
  reasonsHeading: "Why You're Amazing",
  reasonsButtonLabel: "Reveal Your Gift",

  // Gift box chapter
  giftHeading: "Drag to spin the box, then tap it to open",
  giftRevealText: "Happiest Birthday!",
  giftButtonLabel: "Read Your Letter",

  // Letter chapter
  letterHeading: "A Little Note",
  letterBody: [
    "SAMIKSHA, today is all about celebrating you and the happiness you bring into the lives around you.",
    "I hope you always find reasons to smile, people who appreciate you, and moments that make your heart feel full.",
    "May the year ahead bring new adventures, beautiful memories, and the courage to follow every dream that matters to you.",
    "Keep shining in your own way. You deserve a day as lovely and special as you are.",
  ],
  letterButtonLabel: "See Our Memories",

  // Gallery chapter — drop your own photo paths/URLs here later.
  // Leave empty strings to show elegant placeholder art instead.
  gallery: [
    { src: "", caption: "That one road trip" },
    { src: "", caption: "Best birthday dinner" },
    { src: "", caption: "Random Tuesday chaos" },
    { src: "", caption: "The photo we never posted" },
  ],
  galleryHeading: "Our Memories",
  galleryText: "A few of my favorite moments with you — here's to making a hundred more.",
  galleryButtonLabel: "One Last Thing...",

  // Final chapter
  finalHeading: "Happiest Birthday", // "{finalHeading}, {friendName}!"
  finalSubline: "May your days be filled with laughter, love, and all the little things that make you happy. — JAY 💗",
  replayButtonLabel: "Watch Again",

  // Background music — set to false to disable audio entirely
  musicEnabled: true,
  musicSrc: "/audio/theme-song.mp3",

  // Palette accents used by the 3D scene (kept in sync with index.css tokens)
  colors: {
    gold: "#f0b94d",
    coral: "#ff7a93",
    lavender: "#b79ce8",
  },
};

export type SiteConfig = typeof siteConfig;
