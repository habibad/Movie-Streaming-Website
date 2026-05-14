import { forwardRef, type InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  /** When `true`, the label is rendered in small caps uppercase with letter-spacing */
  smallCaps?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, smallCaps = false, id, ...rest }, ref) => {
    const inputId = id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
      <div className="w-full">
        <label
          htmlFor={inputId}
          className={`block mb-2 ${
            smallCaps
              ? 'text-xs text-muted font-semibold tracking-widest uppercase'
              : 'text-sm text-white font-semibold'
          }`}
        >
          {label}
        </label>

        <input
          id={inputId}
          ref={ref}
          {...rest}
          className={`w-full bg-bg-card border rounded-lg px-4 py-3 text-sm md:text-base
                      text-white placeholder-muted focus:outline-none
                      transition-colors ${
            error
              ? 'border-brand focus:border-brand'
              : 'border-line focus:border-gray-500'
          }`}
        />

        {error && (
          <p role="alert" className="mt-1.5 text-xs text-brand">
            {error}
          </p>
        )}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

export default FormInput;
