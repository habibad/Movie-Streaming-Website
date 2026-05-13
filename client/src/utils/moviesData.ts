import type { MovieHeroSlide, SubGenre, SelectOption, Movie } from '@/types';

/* ── Hero carousel slides ───────────────────────────────────── */
export const movieHeroSlides: MovieHeroSlide[] = [
  {
    id: 'h-1',
    title: 'THE RED CHRONICLES',
    description:
      'In a world of eternal twilight, a fallen guardian must unite the scattered clans before the ancient red moon descends for the final time...',
    releaseDate: '05-12-2026',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1600&q=80',
  },
  {
    id: 'h-2',
    title: 'INCEPTION',
    description:
      'A skilled thief enters the subconscious of his targets to steal valuable secrets — but his next job demands the impossible: to plant an idea.',
    releaseDate: '12-08-2026',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1600&q=80',
  },
  {
    id: 'h-3',
    title: 'NIGHT CITY CHRONICLES',
    description:
      'A neon-soaked thriller where a detective uncovers a conspiracy that threatens the very fabric of the metropolis she swore to protect.',
    releaseDate: '20-09-2026',
    image: 'https://images.unsplash.com/photo-1493514789931-586cb221d7a7?w=1600&q=80',
  },
];

/* ── Filter dropdowns ───────────────────────────────────────── */
export const countryOptions: SelectOption[] = [
  { value: '',    label: 'COUNTRY:' },
  { value: 'us',  label: 'United States' },
  { value: 'uk',  label: 'United Kingdom' },
  { value: 'in',  label: 'India' },
  { value: 'jp',  label: 'Japan' },
  { value: 'kr',  label: 'South Korea' },
];

export const yearOptions: SelectOption[] = [
  { value: '',     label: 'YEAR:' },
  { value: '2026', label: '2026' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
];

export const languageOptions: SelectOption[] = [
  { value: '',   label: 'LANGUAGE:' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'hi', label: 'Hindi' },
  { value: 'ja', label: 'Japanese' },
];

/* ── A-Z alphabet ────────────────────────────────────────────── */
export const alphabet: string[] = [
  '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
];

/* ── 15 movies for the grid (5 cols × 3 rows on desktop) ─────── */
export const allMovies: Movie[] = [
  { id: 'mv-1',  title: 'Black Panther',                        poster: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg', category: 'vod', isFeatured: true,  createdAt: new Date().toISOString() },
  { id: 'mv-2',  title: 'Morbius',                              poster: 'https://image.tmdb.org/t/p/w500/6JjfSchsU6daXk2AKX8EEBjO3Fm.jpg', category: 'vod', isFeatured: true,  createdAt: new Date().toISOString() },
  { id: 'mv-3',  title: 'Doctor Strange: Multiverse of Madness', poster: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg', category: 'vod', isFeatured: true,  createdAt: new Date().toISOString() },
  { id: 'mv-4',  title: 'Doctor Strange: Multiverse of Madness', poster: 'https://image.tmdb.org/t/p/w500/9dKCd55IuTT5QRs989m9Qlb7d2B.jpg', category: 'vod', isFeatured: false, createdAt: new Date().toISOString() },
  { id: 'mv-5',  title: 'The Mother',                           poster: 'https://image.tmdb.org/t/p/w500/rUyVTGlVPQwPQfDGjkvHM1cu5oC.jpg', category: 'vod', isFeatured: false, createdAt: new Date().toISOString() },
  { id: 'mv-6',  title: 'Robert Dony Xevier',                   poster: 'https://image.tmdb.org/t/p/w500/lcOIVE3ub4UENZuYRPxNiCsUtnX.jpg', category: 'vod', isFeatured: false, createdAt: new Date().toISOString() },
  { id: 'mv-7',  title: 'The Perfection',                       poster: 'https://image.tmdb.org/t/p/w500/8GcUcSorQXFx8VgT4VsxwjL0vRY.jpg', category: 'vod', isFeatured: false, createdAt: new Date().toISOString() },
  { id: 'mv-8',  title: 'Extraction',                           poster: 'https://image.tmdb.org/t/p/w500/wlfDxbGEsW58vGhFljKkcR5IxDj.jpg', category: 'vod', isFeatured: false, createdAt: new Date().toISOString() },
  { id: 'mv-9',  title: 'Jagame Thandhiram',                    poster: 'https://image.tmdb.org/t/p/w500/keHctYUdmEHfDi3fE39w1g52cgu.jpg', category: 'vod', isFeatured: false, createdAt: new Date().toISOString() },
  { id: 'mv-10', title: 'The Irishman',                         poster: 'https://image.tmdb.org/t/p/w500/mbm8k3GFhXS0ROd9AD1gqYbIFbM.jpg', category: 'vod', isFeatured: false, createdAt: new Date().toISOString() },
  { id: 'mv-11', title: 'Black Panther',                        poster: 'https://image.tmdb.org/t/p/w500/wPU78OPN4BYEgWYdXyg0phMee64.jpg', category: 'vod', isFeatured: false, createdAt: new Date().toISOString() },
  { id: 'mv-12', title: 'Echoes',                               poster: 'https://image.tmdb.org/t/p/w500/jB42hUSeQt7zfd57QHzaJUF1HRC.jpg', category: 'vod', isFeatured: false, createdAt: new Date().toISOString() },
  { id: 'mv-13', title: 'Shadow and Bone',                      poster: 'https://image.tmdb.org/t/p/w500/sHa5LdJjpsdgu8wsnDfJ7BkpYUM.jpg', category: 'vod', isFeatured: false, createdAt: new Date().toISOString() },
  { id: 'mv-14', title: 'Doctor Strange: Multiverse of Madness', poster: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRsmuB5dgXjs.jpg', category: 'vod', isFeatured: false, createdAt: new Date().toISOString() },
  { id: 'mv-15', title: 'Peaky Blinders',                       poster: 'https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg', category: 'vod', isFeatured: false, createdAt: new Date().toISOString() },
];

/* ── Trending Sub-genres ────────────────────────────────────── */
export const trendingSubGenres: SubGenre[] = [
  {
    id: 'sg-1',
    number: '01',
    title: 'CYBERPUNK NOIR',
    description: 'Gritty futures, neon rain, and digital outlaws.',
    avatars: ['https://i.pravatar.cc/40?img=11', 'https://i.pravatar.cc/40?img=14'],
    extra: '+4k',
  },
  {
    id: 'sg-2',
    number: '02',
    title: 'SLOW-BURN MYSTERY',
    description: 'Patient narratives with explosive revelations.',
    avatars: ['https://i.pravatar.cc/40?img=5', 'https://i.pravatar.cc/40?img=9'],
    extra: '+2k',
  },
  {
    id: 'sg-3',
    number: '03',
    title: 'NEO-WESTERN',
    description: 'Classic themes reimagined in modern landscapes.',
    avatars: ['https://i.pravatar.cc/40?img=15', 'https://i.pravatar.cc/40?img=20'],
    extra: '+1k',
  },
];