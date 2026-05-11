interface ProgressBarProps {
  value: number;    // 0–100
  className?: string;
  color?: string;
}

export default function ProgressBar({
  value,
  className = '',
  color = 'bg-brand',
}: ProgressBarProps): JSX.Element {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={`h-1 rounded-full bg-bg-card overflow-hidden ${className}`}
    >
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
