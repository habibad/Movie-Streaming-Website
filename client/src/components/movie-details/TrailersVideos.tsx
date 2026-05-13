import { Play } from 'lucide-react';
import type { TrailerVideo } from '@/types';

interface TrailersVideosProps {
  trailers: TrailerVideo[];
}

interface TrailerCardProps {
  trailer: TrailerVideo;
}

function TrailerCard({ trailer }: TrailerCardProps): JSX.Element {
  return (
    <article className="group cursor-pointer">
      {/* Thumbnail */}
      <div
        className={`relative aspect-video rounded-xl overflow-hidden bg-bg-card
                    ${trailer.highlighted ? 'ring-2 ring-brand' : ''}`}
      >
        <img
          src={trailer.thumbnail}
          alt={trailer.label}
          className="absolute inset-0 w-full h-full object-cover
                     group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />

        {/* Play button — red & filled for highlighted, semi-transparent for the rest */}
        <button
          aria-label={`Play ${trailer.label}`}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center
                        transition-transform duration-200 group-hover:scale-110 ${
              trailer.highlighted
                ? 'bg-brand shadow-glow'
                : 'bg-white/20 backdrop-blur'
            }`}
          >
            <Play
              className="w-5 h-5 md:w-6 md:h-6 text-white fill-current ml-0.5"
              aria-hidden="true"
            />
          </span>
        </button>

        {/* Duration pill */}
        {trailer.duration && (
          <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white
                           text-[10px] font-medium rounded backdrop-blur">
            {trailer.duration}
          </span>
        )}
      </div>

      {/* Label */}
      <h3 className="mt-3 md:mt-4 text-base md:text-lg font-bold text-white">
        {trailer.label}
      </h3>
    </article>
  );
}

export default function TrailersVideos({ trailers }: TrailersVideosProps): JSX.Element {
  if (trailers.length === 0) return <></>;

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-10 md:mt-14"
      aria-label="Trailers and videos"
    >
      {/* Header */}
      <h2 className="section-title mb-5 md:mb-6">Trailer/ Videos</h2>

      {/* Grid — 1 col mobile, 2 cols sm, 4 cols lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        {trailers.map((t) => (
          <TrailerCard key={t.id} trailer={t} />
        ))}
      </div>
    </section>
  );
}