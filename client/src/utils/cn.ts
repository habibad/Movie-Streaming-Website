/**
 * Tiny utility to merge conditional Tailwind class strings.
 * Replaces clsx/classnames for zero-dep convenience.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
