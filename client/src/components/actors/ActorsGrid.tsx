import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { allActors, type ActorListItem } from '@/utils/actorsData';

/* ── Single actor card ───────────────────────────────────────── */
interface ActorCardProps {
  actor: ActorListItem;
}

function ActorCard({ actor }: ActorCardProps): JSX.Element {
  return (
    <Link
      to={`/actors/${actor.id}`}
      className="group block"
      aria-label={`View profile of ${actor.name}`}
    >
      <article className="relative rounded-xl overflow-hidden bg-bg-card aspect-[3/4] cursor-pointer">
        {/* Portrait image */}
        <img
          src={actor.image}
          alt={actor.name}
          className="absolute inset-0 w-full h-full object-cover object-top
                     group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

        {/* View Profile hover button */}
        <div
          className="absolute inset-0 flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg
                       bg-brand text-white text-xs font-semibold shadow-glow
                       group-hover:scale-105 transition-transform duration-200"
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            View Profile
          </span>
        </div>

        {/* Bottom name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
          <p className="text-white text-xs md:text-sm font-medium text-center leading-snug">
            {actor.label}: {actor.name}
          </p>
        </div>
      </article>
    </Link>
  );
}

/* ── Grid section ────────────────────────────────────────────── */
interface ActorsGridProps {
  activeLetter: string;
}

export default function ActorsGrid({ activeLetter }: ActorsGridProps): JSX.Element {
  const visibleActors = useMemo<ActorListItem[]>(() => {
    if (activeLetter === 'ALL') return allActors;
    return allActors.filter((a) =>
      a.name.toUpperCase().startsWith(activeLetter)
    );
  }, [activeLetter]);

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-6 md:mt-8 mb-12"
      aria-label="Actor directory"
    >
      {visibleActors.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted text-base">
            No actors found for &ldquo;{activeLetter}&rdquo;.
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-5"
          role="list"
        >
          {visibleActors.map((actor) => (
            <div key={actor.id} role="listitem">
              <ActorCard actor={actor} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}