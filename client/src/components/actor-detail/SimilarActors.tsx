import { Link } from 'react-router-dom';
import type { ActorDetailData } from '@/utils/actorsData';

interface SimilarActorsProps {
  actor: ActorDetailData;
}

export default function SimilarActors({ actor }: SimilarActorsProps): JSX.Element {
  if (actor.similarActors.length === 0) return <></>;

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-10 md:mt-12"
      aria-label="Similar actors"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <h2 className="section-title">Similar Actors</h2>
        <button className="text-brand text-xs md:text-sm font-semibold
                           hover:text-brand-light transition-colors tracking-widest uppercase">
          View All
        </button>
      </div>

      {/* Scrollable row of portrait thumbnails */}
      <div
        className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-2"
        role="list"
      >
        {actor.similarActors.map((similar) => (
          <Link
            key={similar.id}
            to={`/actors/${similar.id}`}
            role="listitem"
            aria-label={`View profile of ${similar.name}`}
            className="group shrink-0 flex flex-col items-center gap-2 cursor-pointer"
          >
            {/* Portrait */}
            <div className="w-[88px] md:w-[100px] aspect-[3/4] rounded-xl overflow-hidden bg-bg-card">
              <img
                src={similar.image}
                alt={similar.name}
                className="w-full h-full object-cover object-top
                           group-hover:scale-105 transition-transform duration-500 grayscale
                           group-hover:grayscale-0"
                loading="lazy"
              />
            </div>
            {/* Name */}
            <p className="text-white text-[11px] md:text-xs font-medium text-center
                          leading-snug w-[88px] md:w-[100px] line-clamp-2
                          group-hover:text-brand transition-colors">
              {similar.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}