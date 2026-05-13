import {
  Music, Newspaper, Gamepad2, UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';
import { trendingChannels } from '@/utils/liveData';
import type { TrendingChannel, ChannelIcon } from '@/types';

/* ── Icon map for the small circle next to channel title ────── */
const ICON_MAP: Record<ChannelIcon, LucideIcon> = {
  music:  Music,
  news:   Newspaper,
  gaming: Gamepad2,
  food:   UtensilsCrossed,
};

/* ── Single channel card ─────────────────────────────────────── */
interface ChannelCardProps {
  channel: TrendingChannel;
}

function ChannelCard({ channel }: ChannelCardProps): JSX.Element {
  const Icon = ICON_MAP[channel.icon];

  return (
    <article className="group cursor-pointer">
      {/* Thumbnail with overlays */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-bg-card">
        <img
          src={channel.thumbnail}
          alt={channel.title}
          className="absolute inset-0 w-full h-full object-cover
                     group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Top-left: LIVE pill + quality pill */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2 py-0.5 bg-brand text-white text-[10px] font-bold rounded">
            LIVE
          </span>
          {channel.quality && (
            <span className="px-2 py-0.5 bg-black/70 text-white text-[10px] font-medium rounded backdrop-blur">
              {channel.quality}
            </span>
          )}
        </div>

        {/* Bottom: red progress bar */}
        {channel.progress != null && (
          <div className="absolute left-0 right-0 bottom-0 h-1 bg-black/40">
            <div
              className="h-full bg-brand transition-all"
              style={{ width: `${channel.progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Info row below thumbnail */}
      <div className="mt-3 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-bg-card border border-line flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-brand" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm leading-snug truncate">
            {channel.title}
          </h3>
          <p className="text-muted text-xs mt-0.5 truncate">{channel.subtitle}</p>
          <p className="text-brand text-xs font-medium mt-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-dot" aria-hidden="true" />
            {channel.viewers}
          </p>
        </div>
      </div>
    </article>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
export default function TrendingChannels(): JSX.Element {
  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-12 md:mt-14"
      aria-label="Trending channels"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Trending Channels
          </h2>
          <p className="text-sm text-muted mt-1">Most watched broadcasts right now</p>
        </div>
        <button className="text-brand text-sm font-medium hover:text-brand-light transition-colors shrink-0">
          See All
        </button>
      </div>

      {/* 4-col grid (responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {trendingChannels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    </section>
  );
}