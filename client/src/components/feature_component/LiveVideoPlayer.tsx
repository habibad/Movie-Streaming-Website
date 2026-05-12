import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Subtitles, MessageSquare, Cast, Eye } from 'lucide-react';
import LiveBadge from '@/components/ui/LiveBadge';
import { heroData } from '@/utils/mockData';

/* -- YouTube IFrame API typings ------------------------------- */
declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayerOptions {
  videoId: string;
  playerVars?: Record<string, number | string>;
  events?: {
    onReady?: (e: { target: YTPlayer }) => void;
    onStateChange?: (e: { data: number }) => void;
  };
}

interface YTPlayer {
  mute(): void;
  unMute(): void;
  setVolume(vol: number): void;
  playVideo(): void;
  pauseVideo(): void;
  destroy(): void;
}

const YOUTUBE_VIDEO_ID = 'rEvtVZ5SX3k';

export default function LiveVideoPlayer(): JSX.Element {
  const playerRef = useRef<YTPlayer | null>(null);
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const playerInitialisedRef = useRef<boolean>(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mouseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [muted, setMuted] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(true);

  useEffect(() => {
    if (playerInitialisedRef.current) return;

    if (window.YT?.Player) {
      initPlayer();
      return;
    }

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.head.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = initPlayer;

    return () => {
      playerInitialisedRef.current = false;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    hideTimeoutRef.current = setTimeout(() => {
      setShowDetails(false);
    }, 2000);

    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isReady]);

  const handleMouseEnter = useCallback((): void => {
    setShowDetails(true);

    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);

    
  }, []);

  const handleMouseLeave = useCallback((): void => {
    // console.log('Mouse left, hiding details');
    hideTimeoutRef.current = setTimeout(() => {
        
      setShowDetails(false);
    }, 2000);
  }, []);

  function initPlayer(): void {
    if (playerInitialisedRef.current) return;
    if (!ytContainerRef.current) return;
    playerInitialisedRef.current = true;

    const div = document.createElement('div');
    div.id = 'yt-hero-player';
    ytContainerRef.current.innerHTML = '';
    ytContainerRef.current.appendChild(div);

    playerRef.current = new window.YT.Player('yt-hero-player', {
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        mute: 1,
        controls: 0,
        disablekb: 1,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        iv_load_policy: 3,
        fs: 0,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        origin: window.location.origin,
      },
      events: {
        onReady: (e) => {
          e.target.playVideo();
          setIsReady(true);
        },
      },
    });
  }

  const toggleMute = useCallback((): void => {
    const p = playerRef.current;
    if (!p) return;

    if (muted) {
      p.unMute();
      p.setVolume(80);
    } else {
      p.mute();
    }

    setMuted((m) => !m);
  }, [muted]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-bg-card
                    aspect-video xl:aspect-auto xl:h-[530px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!isReady && (
        <img
          src={heroData.image}
          alt={`Now playing: ${heroData.title}`}
          className="absolute inset-0 w-full h-full object-cover z-[1]"
        />
      )}

      <div
        ref={ytContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none
                   [&>iframe]:absolute [&>iframe]:top-1/2 [&>iframe]:left-1/2
                   [&>iframe]:-translate-x-1/2 [&>iframe]:-translate-y-1/2
                   [&>iframe]:w-[177.78vh] [&>iframe]:h-[100%]
                   [&>iframe]:min-w-full [&>iframe]:min-h-[56.25vw]"
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none z-[2]" />

      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <LiveBadge />
        <span className="flex items-center gap-1.5 px-3 py-1 bg-black/60
                         backdrop-blur text-white text-xs rounded-md border border-white/10">
          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
          {heroData.watching} Watching
        </span>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 p-5 md:p-7 lg:p-9 z-10
                     transition-all duration-500 ease-in-out transform
                     ${showDetails
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
      >
        <div className="flex items-start gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl
                             text-white tracking-widest leading-none">
                {heroData.title}
              </h1>
              <span className="btn-outline-red self-end mb-1">Live</span>
            </div>
            <h2 className="mt-3 text-base md:text-xl font-semibold text-white">
              {heroData.episode}
            </h2>
            <p className="mt-1.5 text-sm text-gray-300 max-w-lg">
              {heroData.description}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 text-white text-sm
                       hover:text-brand transition-colors"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted
              ? <VolumeX className="w-5 h-5" />
              : <Volume2 className="w-5 h-5" />}
            Tab to {muted ? 'Unmute' : 'Mute'}
          </button>

          <div className="flex items-center gap-1">
            <button
              aria-label="Subtitles"
              className="p-1.5 md:p-2 rounded-md text-white/80 hover:text-brand hover:bg-white/5 transition-colors"
            >
              <Subtitles className="w-5 h-5" />
            </button>
            <button
              aria-label="Comments"
              className="p-1.5 md:p-2 rounded-md text-white/80 hover:text-brand hover:bg-white/5 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button
              aria-label="Cast"
              className="p-1.5 md:p-2 rounded-md text-white/80 hover:text-brand hover:bg-white/5 transition-colors"
            >
              <Cast className="w-5 h-5" />
            </button>
            <button className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5
                               bg-bg-card/90 border border-line rounded-md text-xs
                               text-white hover:bg-bg-elevated transition-colors ml-1">
              Subtitle /Caption
              <svg
                viewBox="0 0 10 6"
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
