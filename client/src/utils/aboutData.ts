// Mock data for the About Us page.
// Replace with API calls (e.g. /api/page/about) once CMS-driven.

export interface AboutFeature {
  id: string;
  icon: 'play' | 'users' | 'user-search' | 'globe' | 'message' | 'cast';
  title: string;
  description: string;
}

export interface AboutStarPortrait {
  id: string;
  image: string;
  name?: string;
}

export interface AboutReliabilityFeature {
  id: string;
  icon: 'zap' | 'playlist' | 'shield';
  title: string;
  description: string;
}

/* ── Hero "Global Movie Watching Experience" ──────────────────── */
export const aboutHero = {
  title: 'A Global Movie Watching Experience.',
  highlight: 'Together.',
  description:
    'Discover a world of cinematic wonders and shared experiences. Stream the best stories from around the globe in stunning quality, designed for the modern connoisseur of film.',
  ctaLabel: 'Start Watching',
  image:
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80',
};

/* ── Why We Built This Platform ─────────────────────────────── */
export const aboutWhy = {
  title: 'Why We Built This Platform',
  paragraphs: [
    'Blacktree was born from a singular obsession: the magic of the theater. We believe that every story deserves to be told in its purest form, without compromise. In an era of fragmented streaming, we created a sanctuary for storytelling—a place where the frame vanishes and the film breathes.',
    "Our platform isn't just about watching; it's about witnessing. By bridging the gap between global creators and a discerning audience, we've built more than a service—we've built a legacy for the screen.",
  ],
  image:
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=80',
};

/* ── 6-feature icon row ──────────────────────────────────────── */
export const aboutFeatures: AboutFeature[] = [
  { id: 'f1', icon: 'play',        title: '24/7 Live',       description: 'Uninterrupted curated cinematic feeds.' },
  { id: 'f2', icon: 'users',       title: 'Watch Together',  description: 'Sync play with friends globally.' },
  { id: 'f3', icon: 'user-search', title: 'Actor Focused',   description: 'Deep dives into star filmographies.' },
  { id: 'f4', icon: 'globe',       title: 'Accessibility',   description: 'Content available across 190 countries.' },
  { id: 'f5', icon: 'message',     title: 'Live Chat',       description: 'Real-time community discussions.' },
  { id: 'f6', icon: 'cast',        title: 'Cast & Enjoy',    description: 'Seamless streaming to any screen.' },
];

/* ── Stories Behind the Stars ────────────────────────────────── */
export const aboutStories = {
  title: 'Stories Behind the Stars',
  description:
    'Exclusive interviews and raw, behind-the- scenes insights into the lives of your favorite actors.',
  portraits: [
    { id: 's1', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&sat=-100' },
    { id: 's2', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80&sat=-100' },
    { id: 's3', image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80&sat=-100' },
  ] as AboutStarPortrait[],
};

/* ── Smooth. Reliable. Cinematic. ────────────────────────────── */
export const aboutReliability: {
  title: { plain: string[]; accent: string };
  features: AboutReliabilityFeature[];
} = {
  title: {
    plain: ['Smooth.', 'Reliable.'],
    accent: 'Cinematic.',
  },
  features: [
    { id: 'r1', icon: 'zap',      title: 'Powerful Streaming',    description: 'Ultra-low latency delivery optimized for 4K and 8K resolution.' },
    { id: 'r2', icon: 'playlist', title: 'Smart Playlist System', description: 'AI-driven curation that understands your cinematic taste.' },
    { id: 'r3', icon: 'shield',   title: 'Secure & Legal',        description: 'Full copyright protection and encrypted streaming sessions.' },
  ],
};

/* ── Final CTA card ──────────────────────────────────────────── */
export const aboutCta = {
  title: 'Ready to be part of the experience?',
  description: 'Join Blacktree Media today and unlock a global library of storytelling.',
  primaryCta: 'Get Started Now',
  secondaryCta: 'View Plans',
};