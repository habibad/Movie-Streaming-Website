import { useState } from 'react';
import { alphabet } from '@/utils/moviesData';

export default function BrowseAZ(): JSX.Element {
  const [activeLetter, setActiveLetter] = useState<string>('#');

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-10 md:mt-12"
      aria-label="Browse movies alphabetically"
    >
      {/* Heading + View All */}
      <div className="flex items-center justify-between gap-4 mb-4 md:mb-5">
        <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">
          BROWSE <span className="text-brand">A–Z</span>
        </h2>
        <button className="hidden md:inline text-white text-xs font-semibold tracking-widest
                           hover:text-brand transition-colors">
          VIEW ALL
        </button>
      </div>

      {/* Alphabet grid — wraps on small screens */}
      <div
        className="flex flex-wrap gap-1.5 md:gap-2"
        role="tablist"
        aria-label="Alphabet"
      >
        {alphabet.map((letter) => {
          const isActive = letter === activeLetter;
          return (
            <button
              key={letter}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveLetter(letter)}
              className={`w-9 h-9 md:w-10 md:h-10 rounded-md text-xs md:text-sm font-semibold
                          transition-all duration-150 ${
                isActive
                  ? 'bg-brand text-white shadow-glow'
                  : 'bg-bg-card border border-line text-white hover:border-gray-500'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </section>
  );
}