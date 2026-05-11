import { useRef, useCallback } from 'react';

type Direction = 'left' | 'right';

interface UseCarouselReturn {
  scrollerRef: React.RefObject<HTMLDivElement>;
  scroll: (dir: Direction) => void;
}

export function useCarousel(): UseCarouselReturn {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((dir: Direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  }, []);

  return { scrollerRef, scroll };
}
