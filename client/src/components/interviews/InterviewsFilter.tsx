import { interviewFilters } from '@/utils/interviewsData';
import type { InterviewFilter } from '@/types';

interface InterviewsFilterProps {
  activeFilter: InterviewFilter;
  onChange: (f: InterviewFilter) => void;
}

export default function InterviewsFilter({
  activeFilter,
  onChange,
}: InterviewsFilterProps): JSX.Element {
  return (
    <div
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-10 md:mt-14
                 flex items-start md:items-center justify-between gap-4 flex-wrap"
    >
      {/* Section title with red left bar (reuses your .section-title) */}
      <h2 className="section-title">Interviews</h2>

      {/* Filter pill group — single rounded container with inner buttons */}
      <div
        role="tablist"
        aria-label="Interview filters"
        className="inline-flex items-center gap-1 p-1 bg-bg-card border border-line
                   rounded-full overflow-x-auto no-scrollbar max-w-full"
      >
        {interviewFilters.map((f) => {
          const isActive = f.id === activeFilter;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(f.id)}
              className={`flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full
                          text-xs md:text-sm font-medium whitespace-nowrap
                          transition-all duration-200 ${
                isActive
                  ? 'bg-brand text-white shadow-glow'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {f.hasLiveDot && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-dot"
                  aria-hidden="true"
                />
              )}
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}