import { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { movieHeroSlides } from '@/utils/moviesData';

const AUTO_ROTATE_MS = 6000;

export default function MoviesHero(): JSX.Element {
  const [activeIdx, setActiveIdx] = useState<number>(1); // Second slide active per the design

  /* Auto-rotate */
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx((i) => (i + 1) % movieHeroSlides.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(t);
  }, []);

  const goTo = useCallback((i: number) => setActiveIdx(i), []);
  const slide = movieHeroSlides[activeIdx];

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6"
      aria-label="Featured movies"
    >
      <div className="relative rounded-2xl overflow-hidden bg-bg-card
                      min-h-[260px] md:min-h-[400px] lg:h-[440px]">

        {/* Slides — fade between */}
        {movieHeroSlides.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt={s.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700
                       ${i === activeIdx ? 'opacity-100' : 'opacity-0'}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            aria-hidden={i !== activeIdx}
          />
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r
                        from-black via-black/80 md:via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center
                        p-5 md:p-10 lg:p-14 h-full min-h-[260px] md:min-h-[400px] lg:h-[440px] max-w-xl">
          <h1
            key={slide.id /* rerender for fade-in */}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white tracking-wider animate-fade-up"
          >
            {slide.title}
          </h1>

          <p className="mt-4 text-[10px] md:text-xs text-muted tracking-widest uppercase">
            Description
          </p>

          <p className="mt-1 text-sm md:text-base text-gray-300 leading-relaxed max-w-md line-clamp-3">
            {slide.description}
          </p>

          <button
            className="mt-2 inline-flex items-center gap-1 text-brand text-sm font-semibold
                       hover:text-brand-light transition-colors self-start"
          >
            Read More
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </button>

          <p className="mt-4 text-sm font-semibold text-brand">
            Release date: <span className="text-white">{slide.releaseDate}</span>
          </p>
        </div>

        {/* Pagination dots */}
        <div
          className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10
                     flex items-center gap-2"
          role="tablist"
          aria-label="Hero slides"
        >
          {movieHeroSlides.map((s, i) => (
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
    </section>
  );
}