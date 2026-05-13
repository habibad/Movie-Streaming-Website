import MoviesHero         from '@/components/movies/MoviesHero';
import BrowseAZ           from '@/components/movies/BrowseAZ';
import MoviesFilterRow    from '@/components/movies/MoviesFilterRow';
import MoviesGrid         from '@/components/movies/MoviesGrid';
import TrendingSubGenres  from '@/components/movies/TrendingSubGenres';

export default function Movies(): JSX.Element {
  return (
    <div className="pb-12 animate-fade-up">
      {/* 1. Hero carousel — featured movies */}
      <MoviesHero />

      {/* 2. Browse A-Z alphabet */}
      <BrowseAZ />

      {/* 3. ALL pill + Country / Year / Language filters */}
      <MoviesFilterRow />

      {/* 4. Movies poster grid + pagination */}
      <MoviesGrid />

      {/* 5. Trending Sub-genres list */}
      <TrendingSubGenres />
    </div>
  );
}