interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps): JSX.Element {
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
