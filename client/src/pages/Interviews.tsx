import { useState } from 'react';
import InterviewsHero    from '@/components/interviews/InterviewsHero';
import InterviewsFilter  from '@/components/interviews/InterviewsFilter';
import InterviewsGrid    from '@/components/interviews/InterviewsGrid';
import LoadMoreButton    from '@/components/interviews/LoadMoreButton';
import type { InterviewFilter } from '@/types';

export default function Interviews(): JSX.Element {
  // Active filter state — lifted here so the grid + pills share it
  const [filter, setFilter] = useState<InterviewFilter>('all');

  return (
    <div className="pb-12 animate-fade-up">
      {/* 1. Hero — Taraji P. Henson auto-rotating carousel */}
      <InterviewsHero />

      {/* 2. "Interviews" section header + filter pill group */}
      <InterviewsFilter activeFilter={filter} onChange={setFilter} />

      {/* 3. 4-up responsive grid of interview cards */}
      <InterviewsGrid activeFilter={filter} />

      {/* 4. Load More button with refresh icon */}
      <LoadMoreButton onLoadMore={() => {/* TODO: GET /api/interviews?page=N */}} />
    </div>
  );
}