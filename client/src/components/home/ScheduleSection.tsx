import { type FormEvent, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import {
  nowPlaying,
  upNext,
  playingLater,
  requestForNextMovie,
} from '@/utils/mockData';
import { formatTimeRange } from '@/utils/formatTime';
import type { Episode, RequestMovie } from '@/types';

/* ── Row shared by Up Next + Playing Later ───────────────────── */
interface ScheduleRowProps {
  episode: Episode;
}

function ScheduleRow({ episode }: ScheduleRowProps): JSX.Element {
  const timeRange = episode.description ?? formatTimeRange(episode.scheduledAt, episode.endsAt);
  return (
    <li className="flex items-center gap-3 group cursor-pointer">
      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-bg-card">
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="min-w-0">
        <p className="text-white text-sm font-medium leading-snug truncate">
          {episode.title}
        </p>
        <p className="text-muted text-xs mt-0.5">{timeRange}</p>
      </div>
    </li>
  );
}

/* ── Request voting row ──────────────────────────────────────── */
interface RequestRowProps {
  item: RequestMovie;
}

function RequestRow({ item }: RequestRowProps): JSX.Element {
  return (
    <li className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-bg-card">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{item.title}</p>
        <div className="flex items-center gap-2 mt-1">
          <ProgressBar value={item.percent} className="flex-1" />
          <span className="text-xs text-muted shrink-0">{item.percent}%</span>
        </div>
      </div>
    </li>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function ScheduleSection(): JSX.Element {
  const [movieRequest, setMovieRequest] = useState<string>('');

  const handleRequest = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!movieRequest.trim()) return;
    // TODO: POST /api/episodes/request
    setMovieRequest('');
  };

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-6"
      aria-label="Live schedule"
    >
      <div className="bg-bg-panel rounded-2xl border border-line p-5 md:p-7 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 lg:divide-x lg:divide-line">

          {/* ── NOW PLAYING ─────────────────────────────────── */}
          <div className="lg:pr-8">
            <h3 className="text-brand font-bold text-xs tracking-widest mb-4 uppercase">
              Now Playing
            </h3>
            <div className="flex gap-3 items-center">
              <div className="w-24 h-16 md:w-28 md:h-20 rounded-xl overflow-hidden shrink-0 bg-bg-card">
                <img
                  src={nowPlaying.thumbnail}
                  alt={nowPlaying.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm md:text-base truncate">
                  {nowPlaying.title}
                </p>
                <p className="text-muted text-xs md:text-sm mt-0.5">
                  {nowPlaying.description}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-muted text-xs">
                    {formatTimeRange(nowPlaying.scheduledAt, nowPlaying.endsAt)}
                  </span>
                  <span className="btn-outline-red !px-2 !py-0.5 !text-[10px]">
                    Live
                  </span>
                </div>
              </div>
            </div>
            <ProgressBar value={65} className="mt-4" />
          </div>

          {/* ── UP NEXT + PLAYING LATER ─────────────────────── */}
          <div className="lg:px-8">
            <h3 className="text-white font-semibold text-xs tracking-widest mb-4 uppercase">
              Up Next
            </h3>
            <ul className="space-y-3">
              {upNext.map((ep) => (
                <ScheduleRow key={ep.id} episode={ep} />
              ))}
            </ul>

            <h3 className="text-white font-semibold text-xs tracking-widest mt-5 mb-4 uppercase">
              Playing Later
            </h3>
            <ul className="space-y-3">
              {playingLater.map((ep) => (
                <ScheduleRow key={ep.id} episode={ep} />
              ))}
            </ul>
          </div>

          {/* ── REQUEST FOR NEXT MOVIE ───────────────────────── */}
          <div className="lg:pl-8">
            <h3 className="text-white font-semibold text-xs tracking-widest mb-4 uppercase">
              Request for Next Movie
            </h3>
            <ul className="space-y-3">
              {requestForNextMovie.map((item) => (
                <RequestRow key={item.id} item={item} />
              ))}
            </ul>

            <div className="mt-5">
              <p className="text-white text-sm font-medium mb-2">Movie Name</p>
              <form onSubmit={handleRequest} className="flex items-center bg-bg-card
                         border border-line rounded-xl overflow-hidden
                         focus-within:border-gray-500 transition-colors">
                <input
                  type="text"
                  value={movieRequest}
                  onChange={(e) => setMovieRequest(e.target.value)}
                  placeholder="Type Here..."
                  aria-label="Request a movie"
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm
                             text-white placeholder-muted focus:outline-none min-w-0"
                />
                <button
                  type="submit"
                  aria-label="Submit request"
                  className="px-3 py-2.5 text-brand hover:text-brand-light transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
