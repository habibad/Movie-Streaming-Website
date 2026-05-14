import { useMemo } from 'react';
import { Play } from 'lucide-react';
import { interviewCards } from '@/utils/interviewsData';
import type { InterviewCard, InterviewFilter, InterviewCategory } from '@/types';

/* ── Map category id → display label for the badge ────────────── */
const CATEGORY_LABEL: Record<InterviewCategory, string> = {
  exclusive:           'EXCLUSIVE',
  'behind-the-scenes': 'BEHIND THE SCENES',
  live:                'LIVE',
};

/* ── Badge variants — red for exclusive/live, dark for BTS ────── */
function CategoryBadge({ category }: { category: InterviewCategory }): JSX.Element {
  const isRed = category === 'exclusive' || category === 'live';
  return (
    <span
      className={`absolute top-3 left-3 z-10 px-2.5 py-1 text-[10px] font-bold tracking-wider rounded ${
        isRed
          ? 'bg-brand text-white'
          : 'bg-black/75 text-white backdrop-blur border border-white/10'
      }`}
    >
      {CATEGORY_LABEL[category]}
    </span>
  );
}

/* ── Single interview card ───────────────────────────────────── */
interface InterviewCardProps {
  card: InterviewCard;
}

function InterviewCardItem({ card }: InterviewCardProps): JSX.Element {
  return (
    <article className="group cursor-pointer">
      {/* Thumbnail with overlays */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-bg-card">
        <img
          src={card.thumbnail}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover
                     group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Subtle gradient for badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />

        {/* Top-left category badge */}
        <CategoryBadge category={card.category} />

        {/* Bottom-right duration */}
        <span className="absolute bottom-3 right-3 z-10 px-2 py-0.5 bg-black/75 backdrop-blur
                         text-white text-[10px] font-semibold rounded tabular-nums">
          {card.duration}
        </span>

        {/* Play overlay on hover */}
        <button
          aria-label={`Play ${card.title}`}
          className="absolute inset-0 flex items-center justify-center
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="w-14 h-14 rounded-full bg-brand/90 flex items-center justify-center
                           shadow-glow group-hover:scale-110 transition-transform duration-200">
            <Play className="w-6 h-6 text-white fill-current ml-0.5" aria-hidden="true" />
          </span>
        </button>
      </div>

      {/* Title + description beneath */}
      <h3 className="mt-3 md:mt-4 text-white font-bold text-base md:text-lg leading-snug
                     group-hover:text-brand transition-colors">
        {card.title}
      </h3>
      <p className="mt-1 text-sm text-muted leading-relaxed line-clamp-2">
        {card.description}
      </p>
    </article>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
interface InterviewsGridProps {
  activeFilter: InterviewFilter;
}

export default function InterviewsGrid({ activeFilter }: InterviewsGridProps): JSX.Element {
  const visibleCards = useMemo<InterviewCard[]>(() => {
    if (activeFilter === 'all') return interviewCards;
    return interviewCards.filter((c) => c.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-6 md:mt-8"
      aria-label="Interview videos"
    >
      {visibleCards.length === 0 ? (
        <p className="text-center text-muted py-12">
          No interviews in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {visibleCards.map((card) => (
            <InterviewCardItem key={card.id} card={card} />
          ))}
        </div>
      )}
    </section>
  );
}