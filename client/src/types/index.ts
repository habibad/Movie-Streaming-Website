// ─── Domain Types ───────────────────────────────────────────────

export interface Movie {
  id: string;
  title: string;
  description?: string;
  poster: string;
  backdrop?: string;
  category: 'vod' | 'featured' | 'trending';
  genre?: string;
  year?: number;
  duration?: number; // minutes
  rating?: number;
  isFeatured: boolean;
  createdAt: string;
}

export interface Actor {
  id: string;
  name: string;
  bio?: string;
  image: string;
  nationality?: string;
}

export interface Episode {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  scheduledAt: string;
  endsAt: string;
  status: 'live' | 'scheduled' | 'ended';
  isLive: boolean;
}

export interface Interview {
  id: string;
  label: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  videoUrl?: string;
}

export interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  message: string;
  color?: string;
  highlighted?: boolean;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  isPremium: boolean;
  createdAt: string;
}

// ─── UI / Component Types ────────────────────────────────────────

export interface NavLink {
  label: string;
  to: string;
}

export interface PremiumPlan {
  name: string;
  badge: string;
  price: string;
  cycle: string;
  features: string[];
  cta: string;
}

export interface ProFeature {
  icon: 'HD' | 'Audio' | 'Devices' | 'Download';
  title: string;
  desc: string;
}

export interface RequestMovie {
  id: string;
  title: string;
  percent: number;
  thumbnail: string;
}

export interface HeroData {
  title: string;
  episode: string;
  description: string;
  isLive: boolean;
  watching: string;
  image: string;
}

// ─── API Response Types ──────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// ─── React Utility Types ─────────────────────────────────────────

export type WithChildren<T = Record<string, unknown>> = T & {
  children: React.ReactNode;
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// ─── APPEND THESE TYPES TO YOUR EXISTING client/src/types/index.ts ───
// (Don't replace the file — just add these at the bottom)

export interface LiveCategory {
  id: string;
  label: string;
}

export type ChannelIcon = 'music' | 'news' | 'gaming' | 'food';

export interface TrendingChannel {
  id: string;
  title: string;
  subtitle: string;
  viewers: string;
  thumbnail: string;
  icon: ChannelIcon;
  isLive: boolean;
  quality?: string; // e.g. "1080p"
  progress?: number; // 0–100, red bar at bottom of thumbnail
}

export type UpcomingEventType = 'premiere' | 'sports' | 'cinema';

export interface UpcomingEvent {
  id: string;
  type: UpcomingEventType;
  label: string;       // "EXCLUSIVE PREMIERE", "SPORTS", "CINEMA"
  title: string;
  description?: string;
  thumbnail?: string;
  startsIn?: string;   // "02:45:12"
  location?: string;   // "Live from LA • Tonight 8PM"
  attendeeAvatars?: string[];
  attendeeExtra?: string; // "+10k"
  badge?: string;      // "24H Event"
  duration?: string;   // "Curated Selection • Weekend Only"
}



// ─── APPEND THESE TYPES TO YOUR EXISTING client/src/types/index.ts ───
// (Don't replace the file — just add these at the bottom)

export interface MovieHeroSlide {
  id: string;
  title: string;
  description: string;
  releaseDate: string;     // "05-12-2026"
  image: string;
}

export interface SubGenre {
  id: string;
  number: string;          // "01", "02", "03"
  title: string;
  description: string;
  avatars: string[];
  extra?: string;          // "+4k", "+2k"
}

export interface SelectOption {
  value: string;
  label: string;
}

// ─── APPEND THESE TYPES TO YOUR EXISTING client/src/types/index.ts ───

export type CastRole = 'Actor' | 'Director' | 'Writer' | 'Producer';

export interface CastMember {
  id: string;
  name: string;
  role: CastRole;
  image: string;
}

export interface TrailerVideo {
  id: string;
  label: string;        // "Official Trailer", "Teaser", "Clips"
  thumbnail: string;
  videoUrl?: string;    // YouTube URL or YT video ID
  duration?: string;    // "2:45"
  highlighted?: boolean;
}

/**
 * Full movie details — extends the existing Movie interface
 * with everything needed by the details page.
 */
export interface MovieDetails {
  id: string;
  title: string;
  poster: string;             // large landscape image used in the hero
  thumbnail?: string;         // small portrait poster
  genres: string[];           // ["Action", "Fantasy", "Drama"]
  year: number;
  duration: string;           // "2h 35m"
  rating: number;             // IMDb rating 0–10
  qualityLabel: string;       // "HD / 4K"
  audioLanguages: string;     // "English | Spanish"
  hasCaptions: boolean;
  ratingCertificate: string;  // "PG-13", "R", "TV-MA"
  description: string;
  liveChannelLabel?: string;  // "INCLUDED IN LIVE CHANNEL"
  cast: CastMember[];
  trailers: TrailerVideo[];
}