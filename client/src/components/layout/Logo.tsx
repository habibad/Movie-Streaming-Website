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
      {/* Icon box ${s.box} */}
      <div
        className={`relative w-25 h-20 rounded-lg bg-transparent flex items-center justify-center shadow-sm overflow-hidden shrink-0`}
      >
        <img
          src={`${import.meta.env.BASE_URL}assets/images/logo.png`}
          alt="BlackTree.TV logo"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
