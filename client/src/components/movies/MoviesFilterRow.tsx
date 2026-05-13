import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  countryOptions, yearOptions, languageOptions,
} from '@/utils/moviesData';
import type { SelectOption } from '@/types';

/* ── Reusable styled select ─────────────────────────────────── */
interface FilterSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}

function FilterSelect({ options, value, onChange, label }: FilterSelectProps): JSX.Element {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="w-full appearance-none bg-bg-card border border-line rounded-lg
                   px-4 py-3 pr-10 text-xs md:text-sm text-white tracking-widest
                   focus:outline-none focus:border-gray-500 cursor-pointer
                   transition-colors"
      >
        {options.map((opt) => (
          <option key={opt.value || 'placeholder'} value={opt.value} className="bg-bg-card text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}

/* ── Main filter row ─────────────────────────────────────────── */
export default function MoviesFilterRow(): JSX.Element {
  const [country,  setCountry]  = useState<string>('');
  const [year,     setYear]     = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [allActive, setAllActive] = useState<boolean>(true);

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-5 md:mt-6"
      aria-label="Movie filters"
    >
      {/* Desktop: 1 col for ALL + 3 cols for filters all on one row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">

        {/* ALL pill — full width on mobile, fixed on desktop */}
        <button
          onClick={() => setAllActive((a) => !a)}
          aria-pressed={allActive}
          className={`px-6 py-3 rounded-lg text-sm font-bold tracking-widest transition-all
            ${
              allActive
                ? 'bg-brand text-white shadow-glow'
                : 'bg-bg-card border border-line text-white hover:border-gray-500'
            }`}
        >
          ALL
        </button>

        <FilterSelect
          options={countryOptions}
          value={country}
          onChange={setCountry}
          label="Country"
        />
        <FilterSelect
          options={yearOptions}
          value={year}
          onChange={setYear}
          label="Year"
        />
        <FilterSelect
          options={languageOptions}
          value={language}
          onChange={setLanguage}
          label="Language"
        />
      </div>
    </section>
  );
}