import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarousel } from '@/hooks/useCarousel';
import type { CastMember } from '@/types';

interface CastCrewProps {
  cast: CastMember[];
}

interface CastCardProps {
  member: CastMember;
}

function CastCard({ member }: CastCardProps): JSX.Element {
  return (
    <article
      role="listitem"
      className="snap-start shrink-0 w-[120px] md:w-[140px] flex flex-col items-center cursor-pointer group"
    >
      {/* Circular portrait with red ring */}
      <div
        className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden
                   ring-2 ring-brand p-1 bg-bg-base group-hover:ring-brand-light transition-all"
      >
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full rounded-full object-cover
                     group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Name + Role */}
      <p className="mt-3 text-sm font-bold text-white text-center leading-tight">
        {member.name}
      </p>
      <p className="text-xs text-muted mt-0.5">{member.role}</p>
    </article>
  );
}

interface ArrowBtnProps {
  onClick: () => void;
  'aria-label': string;
  children: React.ReactNode;
}

function ArrowBtn({ onClick, 'aria-label': label, children }: ArrowBtnProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-8 h-8 rounded-full border border-line bg-bg-card text-white
                 hover:border-brand hover:text-brand active:scale-95
                 transition-all flex items-center justify-center shrink-0"
    >
      {children}
    </button>
  );
}

export default function CastCrew({ cast }: CastCrewProps): JSX.Element {
  const { scrollerRef, scroll } = useCarousel();

  if (cast.length === 0) return <></>;

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-10 md:mt-12"
      aria-label="Cast and crew"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title">Cast &amp; Crew</h2>
        <div className="flex items-center gap-2">
          <ArrowBtn onClick={() => scroll('left')} aria-label="Scroll left">
            <ChevronLeft className="w-4 h-4" />
          </ArrowBtn>
          <ArrowBtn onClick={() => scroll('right')} aria-label="Scroll right">
            <ChevronRight className="w-4 h-4" />
          </ArrowBtn>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollerRef}
        className="flex gap-5 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
        role="list"
      >
        {cast.map((member) => (
          <CastCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}