import {
  Monitor, Volume2, MonitorSmartphone, Download, CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { premiumPlan, proFeatures } from '@/utils/mockData';
import type { ProFeature } from '@/types';

/* ── Icon map ────────────────────────────────────────────────── */
const ICON_MAP: Record<ProFeature['icon'], LucideIcon> = {
  HD: Monitor,
  Audio: Volume2,
  Devices: MonitorSmartphone,
  Download: Download,
};

/* ── Feature tile ────────────────────────────────────────────── */
interface FeatureTileProps {
  feature: ProFeature;
}

function FeatureTile({ feature }: FeatureTileProps): JSX.Element {
  const Icon = ICON_MAP[feature.icon];
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20
                      flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-brand" aria-hidden="true" />
      </div>
      <div>
        <h4 className="text-white font-semibold text-sm md:text-base">
          {feature.title}
        </h4>
        <p className="text-xs md:text-sm text-muted mt-0.5">{feature.desc}</p>
      </div>
    </div>
  );
}

/* ── Price card ──────────────────────────────────────────────── */
function PriceCard(): JSX.Element {
  return (
    <div className="relative bg-gradient-to-br from-bg-card to-bg-elevated
                    border border-line rounded-2xl p-6 md:p-8 overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-12 -right-12 w-52 h-52 bg-brand/10
                      rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-white font-bold tracking-widest text-sm uppercase">
            {premiumPlan.name}
          </h3>
          <span className="text-[10px] font-bold tracking-widest px-2.5 py-1
                           rounded bg-brand/15 text-brand border border-brand/30 uppercase">
            {premiumPlan.badge}
          </span>
        </div>

        {/* Price */}
        <div className="mt-5 flex items-baseline gap-1">
          <span className="text-4xl md:text-5xl font-bold text-white">
            {premiumPlan.price}
          </span>
          <span className="text-muted text-sm">{premiumPlan.cycle}</span>
        </div>

        {/* Features */}
        <ul className="mt-6 space-y-3.5" aria-label="Plan features">
          {premiumPlan.features.map((feat) => (
            <li key={feat} className="flex items-center gap-2.5 text-sm">
              <CheckCircle2
                className="w-4 h-4 text-brand shrink-0"
                aria-hidden="true"
              />
              <span className="text-gray-200">{feat}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className="mt-7 w-full py-3 rounded-xl border border-brand text-brand
                     font-semibold text-sm tracking-wider
                     hover:bg-brand hover:text-white active:scale-[0.98]
                     transition-all duration-200"
        >
          {premiumPlan.cta}
        </button>
      </div>
    </div>
  );
}

/* ── Main section ────────────────────────────────────────────── */
export default function AetherProSection(): JSX.Element {
  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-12 mb-12"
      aria-label="Premium plan"
    >
      <div className="relative bg-bg-panel border border-line rounded-2xl
                      p-6 md:p-10 lg:p-12 overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 bg-brand/8
                     rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12">

          {/* Left — value prop */}
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Experience the Future of Cinema with{' '}
              <span className="text-gradient-red">AETHER PRO+</span>
            </h2>

            <p className="mt-4 text-sm md:text-base text-muted leading-relaxed max-w-lg">
              Unlock the highest fidelity viewing experience with 8K resolution,
              zero latency streaming, and exclusive access to Lumina Cinematic
              Originals.
            </p>

            {/* Feature grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {proFeatures.map((feature) => (
                <FeatureTile key={feature.title} feature={feature} />
              ))}
            </div>

            <button className="btn-primary mt-8">
              Upgrade to Pro + Now
            </button>
          </div>

          {/* Right — price card */}
          <PriceCard />
        </div>
      </div>
    </section>
  );
}
