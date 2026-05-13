import {
  Film, Trophy, Clapperboard, ArrowRight, Bookmark, Bell,
} from 'lucide-react';
import { upcomingEvents } from '@/utils/liveData';
import type { UpcomingEvent, UpcomingEventType } from '@/types';

/* ── Icon + label color for each event type ──────────────────── */
const EVENT_META: Record<UpcomingEventType, { icon: typeof Film }> = {
  premiere: { icon: Film },
  sports:   { icon: Trophy },
  cinema:   { icon: Clapperboard },
};

/* ── EXCLUSIVE PREMIERE card ─────────────────────────────────── */
interface PremiereCardProps {
  event: UpcomingEvent;
}

function PremiereCard({ event }: PremiereCardProps): JSX.Element {
  const Icon = EVENT_META[event.type].icon;
  return (
    <article
      className="relative rounded-2xl border border-brand/30 overflow-hidden
                 bg-gradient-to-br from-brand/15 via-brand/5 to-bg-panel p-5 md:p-6"
    >
      {/* Label */}
      <div className="flex items-center gap-2 text-brand text-xs font-bold tracking-widest mb-3">
        <Icon className="w-4 h-4" aria-hidden="true" />
        {event.label}
      </div>

      <h3 className="text-white font-semibold text-base md:text-lg leading-snug">
        {event.title}
      </h3>

      {event.description && (
        <p className="mt-2 text-sm text-gray-400 leading-relaxed max-w-md">
          {event.description}
        </p>
      )}

      {/* Bottom row — countdown + Notify Me + thumbnail */}
      <div className="mt-5 flex items-end justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          {event.startsIn && (
            <div className="bg-bg-card/70 border border-line rounded-lg px-3 py-2">
              <p className="text-[10px] text-muted tracking-widest uppercase">Starts In</p>
              <p className="text-white font-bold text-base tabular-nums">{event.startsIn}</p>
            </div>
          )}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card
                       border border-line text-white text-sm hover:border-brand
                       hover:text-brand transition-colors"
          >
            <Bell className="w-3.5 h-3.5" aria-hidden="true" />
            Notify Me
          </button>
        </div>

        {event.thumbnail && (
          <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-line">
            <img
              src={event.thumbnail}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </article>
  );
}

/* ── SPORTS card ─────────────────────────────────────────────── */
function SportsCard({ event }: PremiereCardProps): JSX.Element {
  const Icon = EVENT_META[event.type].icon;
  return (
    <article
      className="relative rounded-2xl border border-brand/30 overflow-hidden
                 bg-gradient-to-br from-brand/15 via-brand/5 to-bg-panel p-5 md:p-6
                 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-2 text-brand text-xs font-bold tracking-widest mb-3">
          <Icon className="w-4 h-4" aria-hidden="true" />
          {event.label}
        </div>

        <h3 className="text-white font-semibold text-base md:text-lg leading-snug">
          {event.title}
        </h3>

        {event.location && (
          <p className="mt-1.5 text-sm text-gray-400">{event.location}</p>
        )}
      </div>

      {/* Bottom row — attendee avatars + arrow */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center -space-x-2">
          {event.attendeeAvatars?.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-7 h-7 rounded-full border-2 border-bg-panel object-cover"
            />
          ))}
          {event.attendeeExtra && (
            <span
              className="ml-1 px-2 py-0.5 rounded-full bg-bg-card border border-line
                         text-[10px] text-white font-semibold"
            >
              {event.attendeeExtra}
            </span>
          )}
        </div>

        <button
          aria-label="View event details"
          className="w-9 h-9 rounded-full border border-line bg-bg-card text-white
                     hover:border-brand hover:text-brand active:scale-95
                     transition-all flex items-center justify-center shrink-0"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}

/* ── CINEMA card (compact, full-width below) ─────────────────── */
function CinemaCard({ event }: PremiereCardProps): JSX.Element {
  const Icon = EVENT_META[event.type].icon;
  return (
    <article
      className="relative rounded-2xl border border-brand/30 overflow-hidden
                 bg-gradient-to-br from-brand/15 via-brand/5 to-bg-panel p-5 md:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Label */}
          <div className="flex items-center gap-2 text-brand text-xs font-bold tracking-widest mb-3">
            <Icon className="w-4 h-4" aria-hidden="true" />
            {event.label}
          </div>

          <h3 className="text-white font-semibold text-base md:text-lg leading-snug">
            {event.title}
          </h3>

          {event.duration && (
            <p className="mt-1.5 text-sm text-gray-400">{event.duration}</p>
          )}

          {/* Badge */}
          {event.badge && (
            <span
              className="inline-block mt-4 px-2.5 py-1 rounded-md
                         bg-brand text-white text-[10px] font-bold tracking-wider"
            >
              {event.badge}
            </span>
          )}
        </div>

        <button
          aria-label="Bookmark"
          className="text-muted hover:text-brand transition-colors shrink-0 p-1"
        >
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </article>
  );
}

/* ── Main section ────────────────────────────────────────────── */
export default function UpcomingEvents(): JSX.Element {
  const premiere = upcomingEvents.find((e) => e.type === 'premiere');
  const sports = upcomingEvents.find((e) => e.type === 'sports');
  const cinema = upcomingEvents.find((e) => e.type === 'cinema');

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-12 md:mt-14"
      aria-label="Upcoming events"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">Upcoming Events</h2>
        <p className="text-sm text-muted mt-1">Don't miss out on these scheduled premieres</p>
      </div>

      {/* Top row — Premiere (2/3 width) + Sports (1/3 width) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          {premiere && <PremiereCard event={premiere} />}
        </div>
        <div>
          {sports && <SportsCard event={sports} />}
        </div>
      </div>

      {/* Bottom row — Cinema (narrower, left-aligned) */}
      {cinema && (
        <div className="mt-4 md:mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-1">
            <CinemaCard event={cinema} />
          </div>
        </div>
      )}
    </section>
  );
}