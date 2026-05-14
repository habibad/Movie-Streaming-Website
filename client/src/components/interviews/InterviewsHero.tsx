import { useState, useEffect, useCallback } from 'react';
import { Play } from 'lucide-react';
import { interviewHeroSlides } from '@/utils/interviewsData';

const AUTO_ROTATE_MS = 7000;

export default function InterviewsHero(): JSX.Element {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  /* Auto-rotate */
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % interviewHeroSlides.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  const goTo = useCallback((i: number) => setActiveIdx(i), []);
  const slide = interviewHeroSlides[activeIdx];

  return (
    <section
      className="relative w-full overflow-hidden bg-bg-card
                 min-h-[300px] md:min-h-[500px] lg:h-[640px]"
      aria-label="Featured interview"
    >
      {/* Slide images — fade cross between */}
      {interviewHeroSlides.map((s, i) => (
        <img
          key={s.id}
          src={s.image}
          alt={s.name}
          className={`absolute inset-0 w-full h-full object-cover object-center md:object-right
                      transition-opacity duration-1000 ${
            i === activeIdx ? 'opacity-100' : 'opacity-0'
          }`}
          loading={i === 0 ? 'eager' : 'lazy'}
          aria-hidden={i !== activeIdx}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r
                      from-black via-black/80 md:via-black/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Content */}
      <div
        className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8
                   flex flex-col justify-center
                   min-h-[300px] md:min-h-[500px] lg:h-[640px]"
      >
        <div className="max-w-xl animate-fade-up" key={slide.id /* re-trigger animation */}>
          <p className="text-brand text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-3 md:mb-5">
            {slide.label}
          </p>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white
                         tracking-wider leading-none">
            {slide.name}
          </h1>

          <p className="mt-4 md:mt-6 text-white text-base md:text-xl font-semibold">
            {slide.tagline}
          </p>

          <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-300 leading-relaxed max-w-md">
            {slide.description}
          </p>

          <button
            className="btn-primary mt-6 md:mt-8"
            aria-label={`Watch interview with ${slide.name}`}
          >
            Watch Now
            <Play className="w-4 h-4 fill-current" aria-hidden="true" />
          </button>

          {/* Pagination dots */}
          <div
            className="mt-7 md:mt-9 flex items-center gap-2"
            role="tablist"
            aria-label="Hero slides"
          >
            {interviewHeroSlides.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === activeIdx}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeIdx ? 'w-6 bg-brand' : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}