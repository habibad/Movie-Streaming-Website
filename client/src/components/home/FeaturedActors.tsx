import { Eye } from 'lucide-react';
import Carousel from '@/components/ui/Carousel';
import { featuredActors } from '@/utils/mockData';
import type { Actor } from '@/types';

/* ── Single actor card ───────────────────────────────────────── */
interface ActorCardProps {
  actor: Actor;
}

function ActorCard({ actor }: ActorCardProps): JSX.Element {
  return (
    <article
      role="listitem"
      className="snap-start shrink-0 w-[175px] sm:w-[210px] md:w-[250px] lg:w-[270px]
                 rounded-xl overflow-hidden bg-bg-card border border-line
                 group cursor-pointer hover:border-gray-600 transition-colors"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={actor.image}
          alt={actor.name}
          className="w-full h-full object-cover object-top
                     group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* View Profile — visible on hover */}
        <div className="absolute inset-0 flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="btn-primary !py-2 !px-4 !text-xs"
            aria-label={`View profile of ${actor.name}`}
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            View Profile
          </button>
        </div>
      </div>
      <div className="px-3 py-3 text-center">
        <p className="text-sm text-white leading-snug">{actor.name}</p>
      </div>
    </article>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
export default function FeaturedActors(): JSX.Element {
  return (
    <Carousel title="Featured Actors">
      {featuredActors.map((actor) => (
        <ActorCard key={actor.id} actor={actor} />
      ))}
    </Carousel>
  );
}
