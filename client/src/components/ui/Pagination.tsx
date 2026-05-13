import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePagination } from '@/hooks/usePagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps): JSX.Element {
  const pages = usePagination({ currentPage, totalPages });

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <nav
      className="flex items-center justify-center gap-1 md:gap-2 flex-wrap"
      aria-label="Pagination"
    >
      {/* Previous */}
      <button
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        disabled={!canPrev}
        aria-label="Previous page"
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-bg-card border border-line
                   text-white text-xs md:text-sm font-medium
                   hover:border-gray-500 disabled:opacity-40 disabled:cursor-not-allowed
                   transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">PREVIOUS</span>
      </button>

      {/* Page numbers */}
      {pages.map((item, idx) =>
        item === 'ellipsis' ? (
          <span
            key={`e-${idx}`}
            className="px-2 text-muted text-sm"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            aria-current={item === currentPage ? 'page' : undefined}
            aria-label={`Go to page ${item}`}
            className={`min-w-[36px] h-9 rounded-lg text-xs md:text-sm font-medium transition-all
              ${
                item === currentPage
                  ? 'bg-brand text-white shadow-glow'
                  : 'bg-bg-card border border-line text-white hover:border-gray-500'
              }`}
          >
            {item}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => canNext && onPageChange(currentPage + 1)}
        disabled={!canNext}
        aria-label="Next page"
        className="flex items-center gap-1 px-3 py-2 rounded-lg bg-bg-card border border-line
                   text-white text-xs md:text-sm font-medium
                   hover:border-gray-500 disabled:opacity-40 disabled:cursor-not-allowed
                   transition-colors"
      >
        <span className="hidden sm:inline">NEXT</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}