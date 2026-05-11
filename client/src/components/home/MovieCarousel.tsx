import { Play } from 'lucide-react';
import Carousel from '@/components/ui/Carousel';
import type { Movie } from '@/types';

/* ── Single movie card ───────────────────────────────────────── */
interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps): JSX.Element {
  return (
    <article
      role="listitem"
      className="snap-start shrink-0 w-[155px] sm:w-[190px] md:w-[215px] lg:w-[225px]
                 rounded-xl overflow-hidden group cursor-pointer"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-bg-card">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover
                     group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

        {/* Play button — appears on hover */}
        <button
          aria-label={`Play ${movie.title}`}
          className="absolute inset-0 flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span
            className="w-14 h-14 rounded-full bg-brand/90 flex items-center
                       justify-center shadow-glow group-hover:scale-110
                       transition-transform duration-200"
          >
            <Play
              className="w-6 h-6 text-white fill-current ml-0.5"
              aria-hidden="true"
            />
          </span>
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
          <p className="text-white text-sm font-medium leading-tight line-clamp-2">
            {movie.title}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
interface MovieCarouselProps {
  title: string;
  movies: Movie[];
}

export default function MovieCarousel({ title, movies }: MovieCarouselProps): JSX.Element {
  return (
    <Carousel title={title}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Carousel>
  );
}
