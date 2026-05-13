import { useMemo } from 'react';

type PageItem = number | 'ellipsis';

interface UsePaginationOptions {
  currentPage: number;
  totalPages: number;
  /** How many sibling pages to show around the current one. Default 1. */
  siblingCount?: number;
}

/**
 * Returns the array of pages to display, with 'ellipsis' markers where appropriate.
 * Example for currentPage=1, totalPages=10 → [1, 2, 3, 'ellipsis', 10]
 */
export function usePagination({
  currentPage,
  totalPages,
  siblingCount = 1,
}: UsePaginationOptions): PageItem[] {
  return useMemo<PageItem[]>(() => {
    if (totalPages <= 0) return [];

    // Total slots: first + last + currentPage + (2 * siblings) + (2 * ellipsis)
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;

    const firstPage = 1;
    const lastPage = totalPages;

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => i + 1
      );
      return [...leftRange, 'ellipsis', lastPage];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const rightRange = Array.from(
        { length: 3 + siblingCount * 2 },
        (_, i) => totalPages - (3 + siblingCount * 2) + i + 1
      );
      return [firstPage, 'ellipsis', ...rightRange];
    }

    const middleRange = Array.from(
      { length: rightSibling - leftSibling + 1 },
      (_, i) => leftSibling + i
    );
    return [firstPage, 'ellipsis', ...middleRange, 'ellipsis', lastPage];
  }, [currentPage, totalPages, siblingCount]);
}