interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { box: 'w-8 h-8', icon: 'w-5 h-5', text: 'text-sm' },
  md: { box: 'w-10 h-10', icon: 'w-7 h-7', text: 'text-base' },
  lg: { box: 'w-12 h-12', icon: 'w-9 h-9', text: 'text-lg' },
};

export default function Logo({ className = '', size = 'md' }: LogoProps): JSX.Element {
  const s = sizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Icon box */}
      <div
        className={`relative ${s.box} rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0`}
      >
        <svg
          viewBox="0 0 32 32"
          className={s.icon}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* trunk */}
          <rect x="14.5" y="19" width="3" height="10" fill="#3B2412" rx="1" />
          {/* foliage layers */}
          <ellipse cx="11" cy="14" rx="6.5" ry="7.5" fill="#1F8F3A" />
          <ellipse cx="21" cy="12" rx="6" ry="7" fill="#E50914" />
          <ellipse cx="16" cy="18" rx="6.5" ry="6" fill="#0F5F25" />
          <ellipse cx="22.5" cy="17" rx="3.5" ry="4" fill="#FF1F2D" />
        </svg>
      </div>

      {/* Wordmark */}
      <span className={`font-semibold tracking-wide text-white ${s.text}`}>
        BlackTree.<span className="text-gray-300">TV</span>
      </span>
    </div>
  );
}
