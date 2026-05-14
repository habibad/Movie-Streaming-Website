import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const LETTERS = [
  'ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
];

const SORT_OPTIONS = ['POPULARITY', 'A–Z', 'Z–A', 'NEWEST'] as const;
type SortOption = typeof SORT_OPTIONS[number];

interface ActorsFilterProps {
  activeLetter: string;
  onLetterChange: (letter: string) => void;
}

export default function ActorsFilter({
  activeLetter,
  onLetterChange,
}: ActorsFilterProps): JSX.Element {
  const [sortBy, setSortBy] = useState<SortOption>('POPULARITY');
  const [showSort, setShowSort] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-6 md:mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* ── Alphabet pills ─────────────────────────────────── */}
        <div
          className="flex items-center gap-1.5 md:gap-2 overflow-x-auto no-scrollbar pb-1"
          role="tablist"
          aria-label="Browse by letter"
        >
          {LETTERS.map((letter) => {
            const isActive = letter === activeLetter;
            return (
              <button
                key={letter}
                role="tab"
                aria-selected={isActive}
                onClick={() => onLetterChange(letter)}
                className={`shrink-0 min-w-[36px] h-9 px-2 md:px-3 rounded-md
                            text-xs md:text-sm font-semibold transition-all duration-150 ${
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

        {/* ── Sort dropdown ──────────────────────────────────── */}
        <div className="relative shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setShowSort((s) => !s)}
            className="flex items-center gap-2 px-4 py-2.5 bg-bg-card border border-line
                       rounded-lg text-xs font-bold tracking-widest text-white
                       hover:border-gray-500 transition-colors min-w-[180px] justify-between"
            aria-expanded={showSort}
          >
            <span>
              Sort by:{' '}
              <span className="text-white font-bold">{sortBy}</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted transition-transform ${showSort ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          {showSort && (
            <div className="absolute top-full right-0 mt-1 bg-bg-card border border-line
                            rounded-lg py-1 min-w-[180px] z-20 shadow-xl">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { setSortBy(opt); setShowSort(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold tracking-wider
                              transition-colors hover:bg-bg-elevated ${
                    sortBy === opt ? 'text-brand' : 'text-white/70'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}