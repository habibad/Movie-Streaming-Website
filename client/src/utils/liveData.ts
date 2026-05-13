import type {
  LiveCategory,
  TrendingChannel,
  UpcomingEvent,
} from '@/types';

/* ── Filter pills ─────────────────────────────────────────────── */
export const liveCategories: LiveCategory[] = [
  { id: 'all',           label: 'All Live' },
  { id: 'sports',        label: 'Sports' },
  { id: 'news',          label: 'News' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'movies',        label: 'Movies' },
  { id: 'local',         label: 'Local' },
  { id: 'music',         label: 'Music' },
];

/* ── Trending Channels ───────────────────────────────────────── */
export const trendingChannels: TrendingChannel[] = [
  {
    id: 'tc-1',
    title: 'Neo-Pulse Music Festival',
    subtitle: 'Channel 102 • Night Session',
    viewers: '842K Viewers',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    icon: 'music',
    isLive: true,
    quality: '1080p',
    progress: 80,
  },
  {
    id: 'tc-2',
    title: 'Global News Network',
    subtitle: 'Prime Time Update',
    viewers: '1.2M Viewers',
    thumbnail: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80',
    icon: 'news',
    isLive: true,
    progress: 65,
  },
  {
    id: 'tc-3',
    title: 'Pro-Gaming Invitational',
    subtitle: 'Grand Semi-Finals',
    viewers: '450K Viewers',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    icon: 'gaming',
    isLive: true,
    progress: 45,
  },
  {
    id: 'tc-4',
    title: 'Culinary Masters Live',
    subtitle: 'Fusion Night Special',
    viewers: '120K Viewers',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    icon: 'food',
    isLive: true,
    progress: 30,
  },
];

/* ── Upcoming Events ─────────────────────────────────────────── */
export const upcomingEvents: UpcomingEvent[] = [
  {
    id: 'ue-1',
    type: 'premiere',
    label: 'EXCLUSIVE PREMIERE',
    title: "Cyber-City 2077: Director's Commentary",
    description:
      "Join the creators for a live deep-dive into the making of this year's biggest noir thriller.",
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&q=80',
    startsIn: '02:45:12',
  },
  {
    id: 'ue-2',
    type: 'sports',
    label: 'SPORTS',
    title: 'Urban Street Skateboard Finals',
    location: 'Live from LA • Tonight 8PM',
    attendeeAvatars: [
      'https://i.pravatar.cc/40?img=11',
      'https://i.pravatar.cc/40?img=14',
      'https://i.pravatar.cc/40?img=15',
    ],
    attendeeExtra: '+10k',
  },
  {
    id: 'ue-3',
    type: 'cinema',
    label: 'CINEMA',
    title: 'Retro Cinema: Noir Classics Marathon',
    duration: 'Curated Selection • Weekend Only',
    badge: '24H Event',
  },
];