import type {
  HeroData,
  Episode,
  RequestMovie,
  ChatMessage,
  Actor,
  Movie,
  Interview,
  PremiumPlan,
  ProFeature,
} from '@/types';

export const heroData: HeroData = {
  title: 'BEYOND THE STORY',
  episode: 'Episode 4: Finding Home',
  description: 'A powerful journey of resilience, identity and community',
  isLive: true,
  watching: '2.4M',
  image:
    'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1600&q=80',
};

export const nowPlaying: Episode = {
  id: 'ep-1',
  title: 'Beyond Thr Story',
  description: 'Episode 4: Finding Home',
  thumbnail:
    'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&q=80',
  scheduledAt: new Date().toISOString(),
  endsAt: new Date(Date.now() + 30 * 60_000).toISOString(),
  status: 'live',
  isLive: true,
};

export const upNext: Episode[] = [
  {
    id: 'ep-2',
    title: 'The Culture Code',
    thumbnail:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    scheduledAt: new Date(Date.now() + 30 * 60_000).toISOString(),
    endsAt: new Date(Date.now() + 60 * 60_000).toISOString(),
    status: 'scheduled',
    isLive: false,
    description: '12:30 PM – 1:00 PM',
  },
  {
    id: 'ep-3',
    title: 'Urban Voices',
    thumbnail:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    scheduledAt: new Date(Date.now() + 60 * 60_000).toISOString(),
    endsAt: new Date(Date.now() + 90 * 60_000).toISOString(),
    status: 'scheduled',
    isLive: false,
    description: '1:00 PM – 1:30 PM',
  },
];

export const playingLater: Episode[] = [
  {
    id: 'ep-4',
    title: 'Legend Of The Game',
    thumbnail:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80',
    scheduledAt: new Date(Date.now() + 90 * 60_000).toISOString(),
    endsAt: new Date(Date.now() + 120 * 60_000).toISOString(),
    status: 'scheduled',
    isLive: false,
    description: '1:00 PM – 1:30 PM',
  },
  {
    id: 'ep-5',
    title: 'Black Excellence',
    thumbnail:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
    scheduledAt: new Date(Date.now() + 120 * 60_000).toISOString(),
    endsAt: new Date(Date.now() + 150 * 60_000).toISOString(),
    status: 'scheduled',
    isLive: false,
    description: '2:00 PM – 2:30 PM',
  },
  {
    id: 'ep-6',
    title: 'Classic Black Cinema',
    thumbnail:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80',
    scheduledAt: new Date(Date.now() + 150 * 60_000).toISOString(),
    endsAt: new Date(Date.now() + 180 * 60_000).toISOString(),
    status: 'scheduled',
    isLive: false,
    description: '2:30 PM – 3:00 PM',
  },
];

export const requestForNextMovie: RequestMovie[] = [
  {
    id: 'req-1',
    title: 'Legend Of The Game',
    percent: 89,
    thumbnail:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80',
  },
  {
    id: 'req-2',
    title: 'Black Excellence',
    percent: 78,
    thumbnail:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80',
  },
];

export const liveChat: ChatMessage[] = [
  {
    id: 'c-1',
    user: 'DigitalGhost',
    avatar: 'https://i.pravatar.cc/40?img=11',
    message:
      'That lighting in the alley scene was incredible! CINE-STREAM quality is unmatched.',
    color: 'text-brand',
  },
  {
    id: 'c-2',
    user: 'NeonRider_99',
    avatar: 'https://i.pravatar.cc/40?img=12',
    message: 'Is this part of the new series launching next month?',
    color: 'text-brand',
  },
  {
    id: 'c-3',
    user: 'Mod_Sarah',
    avatar: 'https://i.pravatar.cc/40?img=5',
    message: "Welcome everyone! Yes, this is a sneak peek at 'Night City Chronicles'.",
    color: 'text-purple-400',
    highlighted: true,
  },
  {
    id: 'c-4',
    user: 'JohnDoe_88',
    avatar: 'https://i.pravatar.cc/40?img=14',
    message: 'The 4K stream is looking buttery smooth. No lag at all! 🔥',
    color: 'text-brand',
  },
  {
    id: 'c-5',
    user: 'CinematicDev',
    avatar: 'https://i.pravatar.cc/40?img=15',
    message: 'Check the premium badge info for merch drops guys!',
    color: 'text-brand',
  },
  {
    id: 'c-6',
    user: 'Luna_Blue',
    avatar: 'https://i.pravatar.cc/40?img=9',
    message: 'Hyped! 🎬🎥🍿',
    color: 'text-brand',
  },
];

export const featuredActors: Actor[] = [
  {
    id: 'a-1',
    name: 'American Actor: Denzel Washington',
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&q=80',
    nationality: 'American',
  },
  {
    id: 'a-2',
    name: 'American Actress: Angelina Jolie',
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80',
    nationality: 'American',
  },
  {
    id: 'a-3',
    name: 'American Actor: Tom Hanks',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
    nationality: 'American',
  },
  {
    id: 'a-4',
    name: 'American Actress: Jenifer Aniston',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
    nationality: 'American',
  },
  {
    id: 'a-5',
    name: 'American Actor: Al Pacino',
    image:
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&q=80',
    nationality: 'American',
  },
];

export const vodContent: Movie[] = [
  {
    id: 'm-1',
    title: 'Black Panther',
    poster: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
    category: 'vod',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'm-2',
    title: 'Morbius',
    poster: 'https://image.tmdb.org/t/p/w500/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg',
    category: 'vod',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'm-3',
    title: 'Doctor Strange: Multiverse of Madness',
    poster: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
    category: 'vod',
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'm-4',
    title: 'Doctor Strange: Multiverse of Madness',
    poster: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
    category: 'vod',
    isFeatured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'm-5',
    title: 'The Mother',
    poster: 'https://image.tmdb.org/t/p/w500/rUyVTGlVPQwPQfDGjkvHM1cu5oC.jpg',
    category: 'vod',
    isFeatured: false,
    createdAt: new Date().toISOString(),
  },
];

export const featuredMovies: Movie[] = vodContent;

export const exclusiveInterview: Interview = {
  id: 'i-1',
  label: 'EXCLUSIVE INTERVIW',
  name: 'TARAJI P. HENSON',
  tagline: 'Breaking Barriers. Building Legacy',
  description:
    'An intimate conversation about her journey in hollywood and beyond.',
  image:
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=80',
};

export const premiumPlan: PremiumPlan = {
  name: 'PREMIUM PLAN',
  badge: 'MOST POPULAR',
  price: '$14.99',
  cycle: '/ month',
  features: [
    'Access all 4K Content',
    'No Advertisements',
    'Exclusive VR Theater Access',
  ],
  cta: 'START 7-DAY FREE TRIAL',
};

export const proFeatures: ProFeature[] = [
  {
    icon: 'HD',
    title: 'Ultra 8K Resolution',
    desc: 'Crystal clear detail in every frame.',
  },
  {
    icon: 'Audio',
    title: 'Spatial 3D Audio',
    desc: 'Immersive soundscapes for your home.',
  },
  {
    icon: 'Devices',
    title: 'Infinite Devices',
    desc: 'Stream on all your screens at once.',
  },
  {
    icon: 'Download',
    title: 'Unlimited Offline',
    desc: 'Download your favorites for any journey.',
  },
];
