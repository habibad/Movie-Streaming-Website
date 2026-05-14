import { Play } from 'lucide-react';
import type { ActorDetailData } from '@/utils/actorsData';

interface ActorExclusiveInterviewsProps {
  actor: ActorDetailData;
}

export default function ActorExclusiveInterviews({
  actor,
}: ActorExclusiveInterviewsProps): JSX.Element {
  if (actor.exclusiveInterviews.length === 0) return <></>;

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-10 md:mt-12"
      aria-label="Exclusive interviews"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5 md:mb-6">
        <h2 className="section-title">Exclusive Interview</h2>
        <button className="text-brand text-xs md:text-sm font-semibold
                           hover:text-brand-light transition-colors tracking-widest uppercase">
          View All
        </button>
      </div>

      {/* Interview cards — 1 col mobile, 2 sm, 3 lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {actor.exclusiveInterviews.map((interview) => (
          <article
            key={interview.id}
            className="group cursor-pointer"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-bg-card">
              <img
                src={interview.thumbnail}
                alt={interview.title}
                className="absolute inset-0 w-full h-full object-cover
                           group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b
                              from-black/30 via-transparent to-black/30 pointer-events-none" />

              {/* Live badge */}
              {interview.isLive && (
                <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5
                                 px-2.5 py-1 bg-brand text-white text-[10px] font-bold rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot" aria-hidden="true" />
                  LIVE SESSION
                </span>
              )}

              {/* Play overlay */}
              <button
                aria-label={`Play: ${interview.title}`}
                className="absolute inset-0 flex items-center justify-center
                           opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <span className="w-13 h-13 w-12 h-12 rounded-full bg-brand/90 flex items-center justify-center
                                 shadow-glow group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-5 h-5 text-white fill-current ml-0.5" aria-hidden="true" />
                </span>
              </button>
            </div>

            {/* Title + meta */}
            <h3 className="mt-3 text-white font-semibold text-sm md:text-base leading-snug
                           group-hover:text-brand transition-colors line-clamp-2">
              {interview.title}
            </h3>
            <p className="mt-1 text-xs text-muted">
              {interview.duration} · {interview.category}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}