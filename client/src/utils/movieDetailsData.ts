import type { MovieDetails } from '@/types';

const SHARED_CAST = [
  {
    id: 'c-1',
    name: 'Amfor Manson',
    role: 'Actor' as const,
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80',
  },
  {
    id: 'c-2',
    name: 'Krom Virent',
    role: 'Director' as const,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
  {
    id: 'c-3',
    name: 'Renel Eraiver',
    role: 'Writer' as const,
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80',
  },
  {
    id: 'c-4',
    name: 'Bran Caspio',
    role: 'Actor' as const,
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80',
  },
  {
    id: 'c-5',
    name: 'Lina Reeves',
    role: 'Actor' as const,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
  {
    id: 'c-6',
    name: 'Toby Hayes',
    role: 'Producer' as const,
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
  },
];

const SHARED_TRAILERS = [
  {
    id: 't-1',
    label: 'Official Trailer',
    thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
    highlighted: true,
    duration: '2:45',
  },
  {
    id: 't-2',
    label: 'Teaser',
    thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&q=80',
    duration: '0:58',
  },
  {
    id: 't-3',
    label: 'Teaser',
    thumbnail: 'https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=800&q=80',
    duration: '1:12',
  },
  {
    id: 't-4',
    label: 'Teaser',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
    duration: '0:46',
  },
];

/* ── Movie database keyed by id ─────────────────────────────── */
const MOVIES_BY_ID: Record<string, MovieDetails> = {
  'mv-1': {
    id: 'mv-1',
    title: 'BLACK PANTHER',
    poster: 'https://image.tmdb.org/t/p/original/b6ZJZHUdMEFECvGiDpJjlfUWela.jpg',
    genres: ['Action', 'Fantasy', 'Drama'],
    year: 2018,
    duration: '2h 14m',
    rating: 7.3,
    qualityLabel: 'HD / 4K',
    audioLanguages: 'English | Spanish',
    hasCaptions: true,
    ratingCertificate: 'PG-13',
    description:
      "T'Challa returns home to the technologically advanced African nation of Wakanda to serve as his country's new king. However, T'Challa soon finds that he is challenged for the throne from factions within his own country as well as without.",
    liveChannelLabel: 'INCLUDED IN LIVE CHANNEL',
    cast: SHARED_CAST,
    trailers: SHARED_TRAILERS,
  },

  'mv-3': {
    id: 'mv-3',
    title: 'THE RED CHRONICLES',
    poster: 'https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg',
    genres: ['Action', 'Fantasy', 'Drama'],
    year: 2026,
    duration: '2h 35m',
    rating: 8.8,
    qualityLabel: 'HD / 4K',
    audioLanguages: 'English | Spanish',
    hasCaptions: true,
    ratingCertificate: 'PG-13',
    description:
      'In a world of eternal twilight, a fallen guardian must unite the scattered clans before the ancient red moon descends for the final time. Across shattered kingdoms and forgotten temples, an unlikely alliance forms — bound by prophecy, betrayal, and a fragile hope that the light might still return.',
    liveChannelLabel: 'INCLUDED IN LIVE CHANNEL',
    cast: SHARED_CAST,
    trailers: SHARED_TRAILERS,
  },
};

/* ── Default fallback (used when an id isn't in the map) ─────── */
const FALLBACK: MovieDetails = MOVIES_BY_ID['mv-3'];

/**
 * Lookup helper used by the page. Replace with `api.get('/movies/:id')` later.
 */
export function getMovieDetailsById(id: string | undefined): MovieDetails {
  if (!id) return FALLBACK;
  return MOVIES_BY_ID[id] ?? FALLBACK;
}