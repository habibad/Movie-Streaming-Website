import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Subtitles, MessageSquare, Cast, Eye } from 'lucide-react';
import LiveBadge from '@/components/ui/LiveBadge';
import { heroData } from '@/utils/mockData';

/* -- YouTube IFrame API typings -- */
declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
    };
    onYouTubeIframeAPIReady: () => void;
    cast?: {
      framework: {
        CastContext: { getInstance(): CastContextInstance };
        SessionState: {
          NO_SESSION: string;
          SESSION_STARTED: string;
          SESSION_RESUMED: string;
        };
        CastContextEventType: { SESSION_STATE_CHANGED: string };
      };
    };
    __onGCastApiAvailable?: (isAvailable: boolean) => void;
  }
}

interface CastContextInstance {
  setOptions(opts: object): void;
  requestSession(): Promise<void>;
  getCurrentSession(): CastSessionInstance | null;
  getSessionState(): string;
  endCurrentSession(stop: boolean): void;
  addEventListener(type: string, handler: (e: { sessionState: string }) => void): void;
}

interface CastSessionInstance {
  loadMedia(req: object): Promise<void>;
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
  loadModule(module: string): void;
  setOption(module: string, option: string, value: unknown): void;
}

export interface LiveVideoPlayerProps {
  showComments: boolean;
  onToggleComments: () => void;
}

const YOUTUBE_VIDEO_ID = 'rEvtVZ5SX3k';

export default function LiveVideoPlayer({ showComments, onToggleComments }: LiveVideoPlayerProps): JSX.Element {
  const playerRef = useRef<YTPlayer | null>(null);
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const playerInitialisedRef = useRef<boolean>(false);
  const castInitRef = useRef<boolean>(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mouseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [muted, setMuted] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [subtitlesOn, setSubtitlesOn] = useState<boolean>(false);
  const [casting, setCasting] = useState<boolean>(false);

  /* -- YouTube IFrame API init -- */
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

  /* -- Auto-hide overlay 2s after player ready -- */
  useEffect(() => {
    if (!isReady) return;
    hideTimeoutRef.current = setTimeout(() => setShowDetails(false), 2000);
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isReady]);

  /* -- Google Cast SDK init -- */
  const initCast = useCallback((): void => {
    if (castInitRef.current || !window.cast?.framework) return;
    castInitRef.current = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chromeCast = (window as any).chrome?.cast;
    const ctx = window.cast.framework.CastContext.getInstance();

    ctx.setOptions({
      receiverApplicationId: 'CC1AD845', // Default Media Receiver
      autoJoinPolicy: chromeCast?.AutoJoinPolicy?.ORIGIN_SCOPED,
    });

    ctx.addEventListener(
      window.cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
      ({ sessionState }: { sessionState: string }) => {
        const ss = window.cast!.framework.SessionState;
        setCasting(sessionState === ss.SESSION_STARTED || sessionState === ss.SESSION_RESUMED);
      },
    );
  }, []);

  useEffect(() => {
    window.__onGCastApiAvailable = (isAvailable: boolean): void => {
      if (isAvailable) initCast();
    };

    if (!document.querySelector('script[src*="cast_sender"]')) {
      const s = document.createElement('script');
      s.src = 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';
      document.head.appendChild(s);
    } else if (window.cast?.framework) {
      initCast();
    }
  }, [initCast]);

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

  const handleMouseEnter = useCallback((): void => {
    setShowDetails(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
  }, []);

  const handleMouseLeave = useCallback((): void => {
    hideTimeoutRef.current = setTimeout(() => setShowDetails(false), 2000);
  }, []);

  const toggleMute = useCallback((): void => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) { p.unMute(); p.setVolume(80); }
    else { p.mute(); }
    setMuted((m) => !m);
  }, [muted]);

  const toggleSubtitles = useCallback((): void => {
    const p = playerRef.current;
    if (!p) return;
    p.loadModule('captions');
    p.setOption('captions', 'track', subtitlesOn ? {} : { languageCode: 'en' });
    setSubtitlesOn((s) => !s);
  }, [subtitlesOn]);

  const handleCast = useCallback(async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chromeCast = (window as any).chrome?.cast;

    /* Non-Chrome or no Cast extension — open YouTube directly so user can cast from there */
    if (!window.cast?.framework || !chromeCast) {
      window.open(`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`, '_blank', 'noopener');
      return;
    }

    const ctx = window.cast.framework.CastContext.getInstance();

    if (casting) {
      ctx.endCurrentSession(true);
      return;
    }

    try {
      await ctx.requestSession();
      const session = ctx.getCurrentSession();
      if (!session) return;

      const mediaInfo = new chromeCast.media.MediaInfo(
        `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`,
        'video/mp4',
      );
      const meta = new chromeCast.media.GenericMediaMetadata();
      meta.title = heroData.title;
      mediaInfo.metadata = meta;

      await session.loadMedia(new chromeCast.media.LoadRequest(mediaInfo));
    } catch {
      /* user dismissed dialog or no devices found */
    }
  }, [casting]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-bg-card
                    aspect-video xl:aspect-auto xl:h-[630px]"
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

      {/* Live badge + viewer count */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <LiveBadge />
        <span className="flex items-center gap-1.5 px-3 py-1 bg-black/60
                         backdrop-blur text-white text-xs rounded-md border border-white/10">
          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
          {heroData.watching} Watching
        </span>
      </div>

      {/* Bottom overlay — title + controls */}
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
          {/* Mute toggle */}
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
            {/* Subtitles icon toggle */}
            <button
              onClick={toggleSubtitles}
              aria-label={subtitlesOn ? 'Disable subtitles' : 'Enable subtitles'}
              title={subtitlesOn ? 'Subtitles: On' : 'Subtitles: Off'}
              className={`p-1.5 md:p-2 rounded-md transition-colors ${
                subtitlesOn
                  ? 'text-brand bg-brand/10'
                  : 'text-white/80 hover:text-brand hover:bg-white/5'
              }`}
            >
              <Subtitles className="w-5 h-5" />
            </button>

            {/* Comment panel toggle */}
            <button
              onClick={onToggleComments}
              aria-label={showComments ? 'Hide comments' : 'Show comments'}
              title={showComments ? 'Hide Comments' : 'Show Comments'}
              className={`p-1.5 md:p-2 rounded-md transition-colors ${
                showComments
                  ? 'text-brand bg-brand/10'
                  : 'text-white/80 hover:text-brand hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            {/* Cast button */}
            <button
              onClick={handleCast}
              aria-label={casting ? 'Stop casting' : 'Cast to TV'}
              title={casting ? 'Stop Casting' : 'Cast to TV'}
              className={`p-1.5 md:p-2 rounded-md transition-colors ${
                casting
                  ? 'text-brand bg-brand/10'
                  : 'text-white/80 hover:text-brand hover:bg-white/5'
              }`}
            >
              <Cast className="w-5 h-5" />
            </button>

            {/* Subtitle text button (synced with icon toggle) */}
            <button
              onClick={toggleSubtitles}
              className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5
                         bg-bg-card/90 border rounded-md text-xs
                         hover:bg-bg-elevated transition-colors ml-1 ${
                           subtitlesOn
                             ? 'border-brand text-brand'
                             : 'border-line text-white'
                         }`}
            >
              {subtitlesOn ? 'CC: On' : 'Subtitle / Caption'}
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