import { Star } from 'lucide-react';

interface StarRatingProps {
  /** Rating value (0–10) */
  rating: number;
  /** How many stars total (default 5) */
  total?: number;
  className?: string;
}

/**
 * Shows a 5-star visual rating where rating/10 maps to stars/total.
 * Example: rating=8.8 → 4 full stars, 1 empty.
 */
export default function StarRating({
  rating,
  total = 5,
  className = '',
}: StarRatingProps): JSX.Element {
  const filled = Math.round((rating / 10) * total);

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      aria-label={`Rating: ${rating} out of 10`}
      role="img"
    >
      {Array.from({ length: total }).map((_, i) => {
        const isFilled = i < filled;
        return (
          <Star
            key={i}
            className={`w-4 h-4 ${
              isFilled
                ? 'text-yellow-400 fill-current'
                : 'text-gray-600'
            }`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}