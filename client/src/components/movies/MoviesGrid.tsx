// REPLACE your existing client/src/components/movies/MoviesGrid.tsx with this version.
// Only change: each MovieCard is now wrapped in a <Link> to /movies/:id

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { allMovies } from '@/utils/moviesData';
import Pagination from '@/components/ui/Pagination';
import type { Movie } from '@/types';

/* ── Single poster card (now clickable) ───────────────────────── */
interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps): JSX.Element {
  return (
    <Link
      to={`/movies/${movie.id}`}
      className="group block"
      aria-label={`View ${movie.title}`}
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-bg-card">
        <img
          src={movie.poster}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover
                     group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Bottom dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* Play overlay on hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="w-12 h-12 rounded-full bg-brand/90 flex items-center justify-center
                           shadow-glow group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 text-white fill-current ml-0.5" />
          </span>
        </div>
      </div>

      {/* Title below poster */}
      <p className="mt-2 md:mt-3 text-center text-xs md:text-sm text-white leading-snug line-clamp-2 px-1
                    group-hover:text-brand transition-colors">
        {movie.title}
      </p>
    </Link>
  );
}

/* ── Main grid section ──────────────────────────────────────── */
export default function MoviesGrid(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10;

  // In a real app you'd slice based on page; here we just show the same 15 movies
  const visibleMovies = allMovies;

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-8 md:mt-10"
      aria-label="All movies"
    >
      {/* Grid — 2 cols on mobile, 3 sm, 4 md, 5 lg */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
                      gap-4 md:gap-5 lg:gap-6">
        {visibleMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 md:mt-12">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}