import { useState } from 'react';
import ActorsHeader from '@/components/actors/ActorsHeader';
import ActorsFilter from '@/components/actors/ActorsFilter';
import ActorsGrid   from '@/components/actors/ActorsGrid';

export default function Actors(): JSX.Element {
  const [activeLetter, setActiveLetter] = useState<string>('ALL');

  return (
    <div className="pb-12 animate-fade-up">
      {/* 1. Page title + description */}
      <ActorsHeader />

      {/* 2. Alphabet filter + sort dropdown */}
      <ActorsFilter
        activeLetter={activeLetter}
        onLetterChange={setActiveLetter}
      />

      {/* 3. Responsive actor card grid */}
      <ActorsGrid activeLetter={activeLetter} />
    </div>
  );
}