import { useState, useEffect, useCallback } from 'react';

interface UseCountdownReturn {
  /** Seconds remaining */
  secondsLeft: number;
  /** Formatted mm:ss string */
  formatted: string;
  /** True when timer has hit zero */
  expired: boolean;
  /** Restart the countdown from `initialSeconds` */
  reset: () => void;
}

/**
 * Counts down once per second from `initialSeconds` to 0.
 * Used for the "code expires in" timer on the OTP screen.
 */
export function useCountdown(initialSeconds: number): UseCountdownReturn {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  const reset = useCallback(() => setSecondsLeft(initialSeconds), [initialSeconds]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  return {
    secondsLeft,
    formatted: `${mm}:${ss}`,
    expired: secondsLeft === 0,
    reset,
  };
}