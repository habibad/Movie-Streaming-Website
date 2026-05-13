import { useParams } from 'react-router-dom';
import MovieDetailsHero from '@/components/movie-details/MovieDetailsHero';
import CastCrew         from '@/components/movie-details/CastCrew';
import TrailersVideos   from '@/components/movie-details/TrailersVideos';
import { getMovieDetailsById } from '@/utils/movieDetailsData';

export default function MovieDetails(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const movie = getMovieDetailsById(id);

  return (
    <div className="pb-12 animate-fade-up">
      {/* 1. Hero — poster + title + meta + actions + description */}
      <MovieDetailsHero movie={movie} />

      {/* 2. Cast & Crew carousel */}
      <CastCrew cast={movie.cast} />

      {/* 3. Trailer / Videos */}
      <TrailersVideos trailers={movie.trailers} />
    </div>
  );
}