import { useParams }                from 'react-router-dom';
import ActorDetailHero              from '@/components/actor-detail/ActorDetailHero';
import ActorBiography               from '@/components/actor-detail/ActorBiography';
import ActorFilmography             from '@/components/actor-detail/ActorFilmography';
import ActorExclusiveInterviews     from '@/components/actor-detail/ActorExclusiveInterviews';
import SimilarActors                from '@/components/actor-detail/SimilarActors';
import { getActorDetailById }       from '@/utils/actorsData';

export default function ActorDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const actor = getActorDetailById(id);

  return (
    <div className="pb-12 animate-fade-up">
      {/* 1. Featured talent hero — portrait + name + bio + follow/share */}
      <ActorDetailHero actor={actor} />

      {/* 2. Full biography + details sidebar card */}
      <ActorBiography actor={actor} />

      {/* 3. Filmography scrollable row */}
      <ActorFilmography actor={actor} />

      {/* 4. Exclusive interviews grid */}
      <ActorExclusiveInterviews actor={actor} />

      {/* 5. Similar actors scrollable row */}
      <SimilarActors actor={actor} />
    </div>
  );
}