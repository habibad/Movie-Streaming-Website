import { Outlet } from 'react-router-dom';

/**
 * Wraps every auth page with the same centered layout + amber radial glow.
 * Used as a parent route in App.tsx so the navbar/footer don't render here.
 */
export default function AuthLayout(): JSX.Element {
  return (
    <main
      className="relative min-h-screen w-full bg-bg-base flex items-center justify-center
                 px-4 py-8 md:py-12 overflow-hidden"
    >
      {/* Soft amber radial glow — purely decorative */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(180, 100, 40, 0.18), transparent 70%)',
        }}
      />

      {/* Subtle outer dark vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-radial"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Page content (Sign In / Sign Up / etc.) */}
      <div className="relative z-10 w-full">
        <Outlet />
      </div>
    </main>
  );
}
