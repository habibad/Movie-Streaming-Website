import type { ReactNode } from 'react';

interface AuthCardProps {
  /** Optional icon (e.g. lock icon for security screens) */
  icon?: ReactNode;
  /** Main heading */
  title: string;
  /** Body text below the heading */
  subtitle?: ReactNode;
  /** Form / content body */
  children: ReactNode;
  /** Optional footer node (links, "back to login", etc.) */
  footer?: ReactNode;
  /** Optional width tweak — defaults to ~420px */
  className?: string;
}

export default function AuthCard({
  icon,
  title,
  subtitle,
  children,
  footer,
  className = '',
}: AuthCardProps): JSX.Element {
  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div
        className="bg-bg-panel/80 backdrop-blur-sm border border-line rounded-2xl
                   p-6 sm:p-8 md:p-10 shadow-2xl"
      >
        {icon && <div className="flex justify-center mb-4">{icon}</div>}

        <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
          {title}
        </h1>

        {subtitle && (
          <div className="mt-2 md:mt-3 text-sm md:text-base text-gray-400 text-center leading-relaxed">
            {subtitle}
          </div>
        )}

        <div className="mt-6 md:mt-7">{children}</div>
      </div>

      {footer && <div className="mt-6 text-center">{footer}</div>}
    </div>
  );
}
