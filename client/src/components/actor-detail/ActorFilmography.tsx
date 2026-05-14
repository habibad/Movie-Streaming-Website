import { Play } from 'lucide-react';
import type { ActorDetailData } from '@/utils/actorsData';

interface ActorFilmographyProps {
  actor: ActorDetailData;
}

export default function ActorFilmography({ actor }: ActorFilmographyProps): JSX.Element {
  if (actor.filmography.length === 0) return <></>;

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-10 md:mt-12"
      aria-label="Filmography"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <h2 className="section-title">Filmography</h2>
        <button className="text-brand text-xs md:text-sm font-semibold
                           hover:text-brand-light transition-colors tracking-widest uppercase">
          View All
        </button>
      </div>

      {/* Scrollable film cards */}
      <div className="flex gap-4 md:gap-5 overflow-x-auto no-scrollbar pb-2">
        {actor.filmography.map((film) => (
          <article
            key={film.id}
            className="group shrink-0 w-[140px] sm:w-[160px] md:w-[180px] cursor-pointer"
            role="listitem"
          >
            {/* Poster */}
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-bg-card">
              <img
                src={film.poster}
                alt={film.title}
                className="absolute inset-0 w-full h-full object-cover
                           group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Play overlay on hover */}
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span className="w-11 h-11 rounded-full bg-brand/90 flex items-center justify-center
                                 shadow-glow group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 text-white fill-current ml-0.5" />
                </span>
              </div>
            </div>

            {/* Title + meta */}
            <p className="mt-2.5 text-white text-xs md:text-sm font-medium leading-snug
                          group-hover:text-brand transition-colors line-clamp-2">
              {film.title}
            </p>
            <p className="mt-0.5 text-muted text-xs tabular-nums">
              {film.year} · {film.genre}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}