import {
  PlaySquare, Users, UserSearch, Globe, MessageSquare, Cast,
  type LucideIcon,
} from 'lucide-react';
import { aboutFeatures, type AboutFeature } from '@/utils/aboutData';

const ICON_MAP: Record<AboutFeature['icon'], LucideIcon> = {
  play:          PlaySquare,
  users:         Users,
  'user-search': UserSearch,
  globe:         Globe,
  message:       MessageSquare,
  cast:          Cast,
};

interface FeatureTileProps {
  feature: AboutFeature;
}

function FeatureTile({ feature }: FeatureTileProps): JSX.Element {
  const Icon = ICON_MAP[feature.icon];
  return (
    <div className="flex flex-col items-center text-center px-2">
      <div className="w-12 h-12 rounded-xl bg-bg-card border border-line
                      flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-yellow-400" aria-hidden="true" />
      </div>
      <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
      <p className="text-muted text-xs mt-1.5 leading-snug max-w-[140px]">
        {feature.description}
      </p>
    </div>
  );
}

export default function AboutFeatures(): JSX.Element {
  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-12 md:mt-16"
      aria-label="Platform features"
    >
      <div className="bg-bg-panel border border-line rounded-2xl py-8 md:py-10 px-4 md:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
          {aboutFeatures.map((feature) => (
            <FeatureTile key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}