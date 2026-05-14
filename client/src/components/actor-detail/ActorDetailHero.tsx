import { useState } from 'react';
import { Share2, UserPlus, UserCheck } from 'lucide-react';
import type { ActorDetailData } from '@/utils/actorsData';

interface ActorDetailHeroProps {
  actor: ActorDetailData;
}

export default function ActorDetailHero({ actor }: ActorDetailHeroProps): JSX.Element {
  const [following, setFollowing] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: actor.name, url: window.location.href }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-10"
      aria-label={`${actor.name} profile`}
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">

        {/* ── Portrait image ─────────────────────────────────── */}
        <div
          className="w-full md:w-[260px] lg:w-[300px] shrink-0 rounded-xl overflow-hidden
                     aspect-[3/4] md:aspect-auto md:h-[360px] lg:h-[400px] bg-bg-card"
        >
          <img
            src={actor.image}
            alt={actor.name}
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
        </div>

        {/* ── Info ──────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Featured talent label */}
          <p className="text-brand text-xs font-bold tracking-[0.25em] uppercase mb-2">
            {actor.label}
          </p>

          {/* Actor name */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {actor.name}
          </h1>

          {/* Short bio */}
          <p className="mt-3 text-sm md:text-base text-gray-300 leading-relaxed max-w-xl">
            {actor.shortBio}
          </p>

          {/* Action buttons */}
          <div className="mt-5 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setFollowing((f) => !f)}
              aria-pressed={following}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold
                          text-sm transition-all duration-200 ${
                following
                  ? 'bg-brand/15 border border-brand text-brand'
                  : 'bg-brand hover:bg-brand-light text-white'
              }`}
            >
              {following
                ? <><UserCheck className="w-4 h-4" /> Following</>
                : <><UserPlus className="w-4 h-4" /> Follow</>
              }
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold
                         text-sm border border-white/20 text-white
                         hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
              Share
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}