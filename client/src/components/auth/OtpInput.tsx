import {
  useRef, useEffect, type ChangeEvent, type KeyboardEvent, type ClipboardEvent,
} from 'react';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (next: string) => void;
  /** Called when the user types the final digit */
  onComplete?: (code: string) => void;
  disabled?: boolean;
}

export default function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
}: OtpInputProps): JSX.Element {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  /* Focus the first empty box on mount */
  useEffect(() => {
    const firstEmpty = value.length;
    inputsRef.current[firstEmpty < length ? firstEmpty : 0]?.focus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Notify when complete */
  useEffect(() => {
    if (value.length === length) onComplete?.(value);
  }, [value, length, onComplete]);

  const setDigitAt = (idx: number, digit: string): void => {
    const arr = value.split('');
    arr[idx] = digit;
    // Pad up to idx in case of holes
    const padded = Array.from({ length: idx + 1 }, (_, i) => arr[i] ?? '').join('');
    // Keep any later digits the user already typed
    const tail = value.slice(idx + 1);
    onChange((padded + tail).slice(0, length));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, idx: number): void => {
    const raw = e.target.value.replace(/\D/g, '');
    if (!raw) {
      setDigitAt(idx, '');
      return;
    }
    // Take only the last digit typed (so re-typing in a filled box replaces)
    const digit = raw.slice(-1);
    setDigitAt(idx, digit);

    // Auto-advance focus
    if (idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number): void => {
    if (e.key === 'Backspace') {
      if (value[idx]) {
        setDigitAt(idx, '');
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        setDigitAt(idx - 1, '');
      }
    } else if (e.key === 'ArrowLeft' && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    } else if (e.key === 'ArrowRight' && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    // Focus the last filled box (or the next empty one)
    const focusIdx = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" role="group" aria-label="One-time code">
      {Array.from({ length }).map((_, i) => {
        const digit = value[i] ?? '';
        return (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el; }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            disabled={disabled}
            value={digit}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            aria-label={`Digit ${i + 1}`}
            className={`w-11 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold
                        bg-bg-card border rounded-lg text-white
                        focus:outline-none transition-colors ${
              digit
                ? 'border-line'
                : 'border-line text-muted'
            } focus:border-gray-500`}
          />
        );
      })}
    </div>
  );
}
