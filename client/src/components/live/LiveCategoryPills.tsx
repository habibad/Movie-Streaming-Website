import { useState } from 'react';
import { liveCategories } from '@/utils/liveData';

export default function LiveCategoryPills(): JSX.Element {
  const [activeId, setActiveId] = useState<string>('all');

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6">
      <div
        className="flex items-center gap-2 md:gap-3 overflow-x-auto no-scrollbar pb-2"
        role="tablist"
        aria-label="Live categories"
      >
        {liveCategories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(cat.id)}
              className={`shrink-0 px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm
                          font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-brand text-white shadow-glow'
                  : 'bg-bg-card border border-line text-gray-300 hover:border-gray-500 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}