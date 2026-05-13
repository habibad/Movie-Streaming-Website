import { useState } from 'react';
import { Play, Plus, Check, Sparkles, ChevronDown } from 'lucide-react';
import StarRating from './StarRating';
import type { MovieDetails } from '@/types';

interface MovieDetailsHeroProps {
  movie: MovieDetails;
}

export default function MovieDetailsHero({ movie }: MovieDetailsHeroProps): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [inList, setInList]     = useState<boolean>(false);

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6"
      aria-label="Movie details"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-6 md:gap-8 lg:gap-12 items-start">

        {/* ── LEFT — Poster ────────────────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden bg-bg-card aspect-video lg:aspect-[4/3] xl:aspect-[16/12]">
          <img
            src={movie.poster}
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {/* Subtle bottom gradient (optional, only adds depth) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ── RIGHT — Info ─────────────────────────────────── */}
        <div className="lg:pt-4">
          {/* Live channel tag */}
          {movie.liveChannelLabel && (
            <p className="text-[10px] md:text-xs text-muted font-semibold tracking-widest uppercase">
              {movie.liveChannelLabel}
            </p>
          )}

          {/* Title */}
          <h1 className="mt-2 md:mt-3 text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide">
            {movie.title}
          </h1>

          {/* Genre pills */}
          <div className="mt-4 md:mt-5 flex flex-wrap gap-2" aria-label="Genres">
            {movie.genres.map((g) => (
              <span
                key={g}
                className="px-3 py-1.5 bg-brand text-white text-[11px] md:text-xs font-bold tracking-wider rounded uppercase"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Meta row: Year • Duration • IMDb */}
          <div className="mt-5 md:mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="text-muted">
              Year: <span className="text-white font-semibold">{movie.year}</span>
            </span>
            <span className="text-muted">
              Duration: <span className="text-white font-semibold">{movie.duration}</span>
            </span>
            <span className="flex items-center gap-2 text-muted">
              IMDb Rating: <span className="text-white font-semibold">{movie.rating}</span>
              <StarRating rating={movie.rating} />
            </span>
          </div>

          {/* Quality badges — wraps under meta on mobile, inline on desktop */}
          <div className="mt-4 flex flex-wrap items-center gap-2 md:gap-3">
            <span className="px-3 py-1.5 rounded-md border border-line text-white text-xs font-semibold">
              {movie.qualityLabel}
            </span>
            <span className="flex items-center gap-1.5 text-white text-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand" aria-hidden="true" />
              {movie.audioLanguages}
            </span>
            {movie.hasCaptions && (
              <span className="px-2.5 py-1 rounded-md border border-line text-white text-xs font-bold">
                CC
              </span>
            )}
            <span className="px-2.5 py-1 rounded-md border border-line text-white text-xs font-bold">
              {movie.ratingCertificate}
            </span>
          </div>

          {/* Action buttons */}
          <div className="mt-6 md:mt-7 flex flex-wrap gap-3 md:gap-4">
            <button
              className="btn-primary !py-3 !px-6 text-sm md:text-base flex-1 sm:flex-initial min-w-[160px]"
              aria-label="Play or watch now"
            >
              <Play className="w-4 h-4 fill-current" aria-hidden="true" />
              Play / Watch Now
            </button>

            <button
              onClick={() => setInList((v) => !v)}
              aria-pressed={inList}
              aria-label={inList ? 'Remove from list' : 'Add to list'}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg
                          border text-sm md:text-base font-semibold
                          transition-all flex-1 sm:flex-initial min-w-[140px] ${
                inList
                  ? 'border-brand text-brand bg-brand/10'
                  : 'border-line text-white bg-bg-card hover:border-gray-500'
              }`}
            >
              {inList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {inList ? 'In My List' : 'Add to List'}
            </button>
          </div>

          {/* Description */}
          <div className="mt-7 md:mt-8">
            <p className="text-[10px] md:text-xs text-muted font-semibold tracking-widest uppercase">
              Description
            </p>
            <p
              className={`mt-2 md:mt-3 text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl
                          ${expanded ? '' : 'line-clamp-2 md:line-clamp-3'}`}
            >
              {movie.description}
            </p>
            <button
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              className="mt-2 inline-flex items-center gap-1 text-brand text-sm font-semibold
                         hover:text-brand-light transition-colors"
            >
              {expanded ? 'Show Less' : 'Read More'}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}