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
