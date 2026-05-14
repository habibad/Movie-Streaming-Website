import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface LoadMoreButtonProps {
  onLoadMore?: () => void;
}

export default function LoadMoreButton({ onLoadMore }: LoadMoreButtonProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = (): void => {
    if (loading) return;
    setLoading(true);
    onLoadMore?.();
    // Reset spinner state after a short delay (real impl would await the fetch)
    setTimeout(() => setLoading(false), 800);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-10 md:mt-12 flex justify-center">
      <button
        onClick={handleClick}
        disabled={loading}
        aria-label="Load more interviews"
        className="inline-flex items-center gap-2 text-white text-xs md:text-sm
                   font-semibold tracking-widest uppercase
                   hover:text-brand transition-colors
                   disabled:opacity-60"
      >
        <RefreshCw
          className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
          aria-hidden="true"
        />
        Load More Interviews
      </button>
    </div>
  );
}