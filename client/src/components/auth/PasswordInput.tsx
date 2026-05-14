import { useState, forwardRef, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, id, ...rest }, ref) => {
    const [visible, setVisible] = useState<boolean>(false);
    const inputId = id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
      <div className="w-full">
        <label htmlFor={inputId} className="block mb-2 text-sm text-white font-semibold">
          {label}
        </label>

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={visible ? 'text' : 'password'}
            {...rest}
            className={`w-full bg-bg-card border rounded-lg px-4 py-3 pr-11
                        text-sm md:text-base text-white placeholder-muted
                        focus:outline-none transition-colors ${
              error
                ? 'border-brand focus:border-brand'
                : 'border-line focus:border-gray-500'
            }`}
          />

          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted
                       hover:text-white transition-colors p-1"
          >
            {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {error && (
          <p role="alert" className="mt-1.5 text-xs text-brand">
            {error}
          </p>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
