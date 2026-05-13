import { ChevronRight } from 'lucide-react';
import { trendingSubGenres } from '@/utils/moviesData';
import type { SubGenre } from '@/types';

/* ── Single row ──────────────────────────────────────────────── */
interface SubGenreRowProps {
  genre: SubGenre;
}

function SubGenreRow({ genre }: SubGenreRowProps): JSX.Element {
  return (
    <button
      className="w-full bg-bg-panel border border-line rounded-xl
                 px-4 md:px-6 py-4 md:py-5
                 hover:border-brand/40 hover:bg-bg-card transition-all
                 flex items-center gap-4 md:gap-6 text-left group"
    >
      {/* Big numbered index */}
      <span className="text-2xl md:text-3xl font-bold text-muted tabular-nums shrink-0">
        {genre.number}
      </span>

      {/* Title + description */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-bold text-sm md:text-base tracking-wide">
          {genre.title}
        </h3>
        <p className="text-muted text-xs md:text-sm mt-0.5 line-clamp-1">
          {genre.description}
        </p>
      </div>

      {/* Avatars + extra count + arrow */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden md:flex items-center -space-x-2">
          {genre.avatars.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-7 h-7 rounded-full border-2 border-bg-panel object-cover"
            />
          ))}
          {genre.extra && (
            <span className="ml-1 px-2 py-0.5 rounded-full bg-bg-card border border-line
                             text-[10px] text-white font-semibold">
              {genre.extra}
            </span>
          )}
        </div>

        {/* Mobile: just avatars + extra inline (smaller) */}
        <div className="flex md:hidden items-center -space-x-2">
          {genre.avatars.slice(0, 2).map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-6 h-6 rounded-full border-2 border-bg-panel object-cover"
            />
          ))}
          {genre.extra && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-bg-card border border-line
                             text-[9px] text-white font-semibold">
              {genre.extra}
            </span>
          )}
        </div>

        <ChevronRight
          className="w-5 h-5 text-muted group-hover:text-brand transition-colors"
          aria-hidden="true"
        />
      </div>
    </button>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
export default function TrendingSubGenres(): JSX.Element {
  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-14 md:mt-16"
      aria-label="Trending sub-genres"
    >
      {/* Header */}
      <div className="mb-5 md:mb-6">
        <h2 className="text-lg md:text-2xl font-bold tracking-wide">
          <span className="text-white">TRENDING</span>{' '}
          <span className="text-brand">SUB-GENRES</span>
        </h2>
        <p className="text-xs md:text-sm text-muted mt-1">
          Niche categories curated by our cinema experts
        </p>
      </div>

      {/* List */}
      <ul className="space-y-3 md:space-y-4">
        {trendingSubGenres.map((g) => (
          <li key={g.id}>
            <SubGenreRow genre={g} />
          </li>
        ))}
      </ul>
    </section>
  );
}