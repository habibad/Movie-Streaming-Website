import { Zap, ListVideo, ShieldCheck, type LucideIcon } from 'lucide-react';
import { aboutReliability, type AboutReliabilityFeature } from '@/utils/aboutData';

const ICON_MAP: Record<AboutReliabilityFeature['icon'], LucideIcon> = {
  zap:      Zap,
  playlist: ListVideo,
  shield:   ShieldCheck,
};

interface ReliabilityTileProps {
  feature: AboutReliabilityFeature;
}

function ReliabilityTile({ feature }: ReliabilityTileProps): JSX.Element {
  const Icon = ICON_MAP[feature.icon];
  return (
    <div className="flex flex-col items-center text-center px-4 max-w-xs">
      <Icon className="w-8 h-8 text-yellow-400 mb-3" aria-hidden="true" />
      <h3 className="text-white font-semibold text-sm md:text-base">
        {feature.title}
      </h3>
      <p className="text-muted text-xs md:text-sm mt-2 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export default function AboutReliability(): JSX.Element {
  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-16 md:mt-24"
      aria-label="Smooth, reliable, cinematic"
    >
      {/* Centered headline */}
      <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
        <span className="text-white">
          {aboutReliability.title.plain.join(' ')}{' '}
        </span>
        <span className="text-brand">{aboutReliability.title.accent}</span>
      </h2>

      {/* 3 feature tiles */}
      <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {aboutReliability.features.map((feature) => (
          <ReliabilityTile key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  );
}