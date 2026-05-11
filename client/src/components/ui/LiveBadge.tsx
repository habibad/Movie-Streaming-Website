interface LiveBadgeProps {
  className?: string;
}

export default function LiveBadge({ className = '' }: LiveBadgeProps): JSX.Element {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 bg-brand text-white
                  text-xs font-bold rounded-md ${className}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot"
        aria-hidden="true"
      />
      LIVE NOW
    </span>
  );
}
