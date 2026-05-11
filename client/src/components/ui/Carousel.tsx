import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarousel } from '@/hooks/useCarousel';

interface CarouselProps {
  title: string;
  children: ReactNode;
  className?: string;
}

interface ArrowButtonProps {
  onClick: () => void;
  'aria-label': string;
  children: ReactNode;
}

function ArrowButton({ onClick, 'aria-label': label, children }: ArrowButtonProps): JSX.Element {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-9 h-9 rounded-full border border-line bg-bg-card text-white
                 hover:border-brand hover:text-brand active:scale-95
                 transition-all flex items-center justify-center shrink-0"
    >
      {children}
    </button>
  );
}

export default function Carousel({ title, children, className = '' }: CarouselProps): JSX.Element {
  const { scrollerRef, scroll } = useCarousel();

  return (
    <section className={`max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-10 ${className}`}>
      {/* Header row */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title">{title}</h2>
        <div className="flex items-center gap-2">
          <ArrowButton onClick={() => scroll('left')} aria-label="Scroll left">
            <ChevronLeft className="w-4 h-4" />
          </ArrowButton>
          <ArrowButton onClick={() => scroll('right')} aria-label="Scroll right">
            <ChevronRight className="w-4 h-4" />
          </ArrowButton>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2"
        role="list"
      >
        {children}
      </div>
    </section>
  );
}
