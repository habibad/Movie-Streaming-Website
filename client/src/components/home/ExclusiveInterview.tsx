import { Play } from 'lucide-react';
import { exclusiveInterview } from '@/utils/mockData';

const SLIDES_COUNT = 4;

export default function ExclusiveInterview(): JSX.Element {
  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-12"
      aria-label="Exclusive interview"
    >
      <div className="relative rounded-2xl overflow-hidden bg-bg-panel
                      min-h-[300px] md:min-h-[440px]">

        {/* Background image */}
        <img
          src={exclusiveInterview.image}
          alt={exclusiveInterview.name}
          className="absolute inset-0 w-full h-full object-cover object-center md:object-right"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r
                        from-black via-black/80 md:via-black/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 p-6 md:p-10 lg:p-14 flex flex-col
                        justify-end md:justify-center min-h-[300px] md:min-h-[440px]
                        max-w-2xl">
          <p className="text-brand text-xs font-bold tracking-[0.25em] mb-3 uppercase">
            {exclusiveInterview.label}
          </p>

          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl
                         text-white tracking-wider leading-none">
            {exclusiveInterview.name}
          </h2>

          <p className="mt-4 text-white text-base md:text-xl font-semibold">
            {exclusiveInterview.tagline}
          </p>

          <p className="mt-2 text-sm md:text-base text-gray-300 leading-relaxed max-w-md">
            {exclusiveInterview.description}
          </p>

          <button
            className="btn-primary mt-6 self-start"
            aria-label={`Watch interview with ${exclusiveInterview.name}`}
          >
            <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            Watch Now
          </button>

          {/* Pagination dots */}
          <div className="mt-7 flex items-center gap-2" role="tablist" aria-label="Interview slides">
            {Array.from({ length: SLIDES_COUNT }).map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === 0}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === 0 ? 'w-6 bg-brand' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
