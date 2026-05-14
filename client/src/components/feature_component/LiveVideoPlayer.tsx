import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Subtitles, MessageSquare, Cast, Eye } from 'lucide-react';
import LiveBadge from '@/components/ui/LiveBadge';
import { heroData } from '@/utils/mockData';
import { useYouTubeVideoData } from '@/hooks/useYouTubeVideoData';

/* ── YouTube IFrame API typings ─────────────────────────────── */
declare global {
  interface Window {
    YT: {
      Player: new (elementId: string, options: YTPlayerOptions) => YTPlayer;
    };
    onYouTubeIframeAPIReady: () => void;
    cast?: {
      framework: {
        CastContext: { getInstance(): CastContextInstance };
        SessionState: { NO_SESSION: string; SESSION_STARTED: string; SESSION_RESUMED: string };
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
interface CastSessionInstance { loadMedia(req: object): Promise<void>; }

interface YTPlayerOptions {
  videoId: string;
  playerVars?: Record<string, number | string>;
  events?: {
    onReady?: (e: { target: YTPlayer }) => void;
    onStateChange?: (e: { data: number }) => void;
  };
}

interface YTVideoData { video_id: string; author: string; title: string; }

interface YTPlayer {
  mute(): void;
  unMute(): void;
  setVolume(vol: number): void;
  playVideo(): void;
  pauseVideo(): void;
  destroy(): void;
  loadModule(module: string): void;
  setOption(module: string, option: string, value: unknown): void;
  getOption(module: string, option: string): unknown;
  getVideoData(): YTVideoData;
}

/* Shape returned by player.getOption('captions', 'tracklist') */
interface CaptionTrack {
  id: string;
  languageCode: string;
  displayName: string;
  kind: string; // 'asr' = auto-generated
}

export interface LiveVideoPlayerProps {
  showComments: boolean;
  onToggleComments: () => void;
}

const YOUTUBE_VIDEO_ID = '8JZlssT12Uw';

export default function LiveVideoPlayer({ showComments, onToggleComments }: LiveVideoPlayerProps): JSX.Element {
  const playerRef           = useRef<YTPlayer | null>(null);
  const ytContainerRef      = useRef<HTMLDivElement>(null);
  const captionMenuRef      = useRef<HTMLDivElement>(null);
  const playerInitialisedRef = useRef<boolean>(false);
  const castInitRef         = useRef<boolean>(false);
  const hideTimeoutRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mouseTimeoutRef     = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [muted, setMuted]               = useState<boolean>(true);
  const [isReady, setIsReady]           = useState<boolean>(false);
  const [showDetails, setShowDetails]   = useState<boolean>(true);
  const [casting, setCasting]           = useState<boolean>(false);

  /* Fallback metadata from player.getVideoData() — no API key needed */
  const [playerMeta, setPlayerMeta]     = useState<YTVideoData | null>(null);

  /* Caption state */
  const [captionTracks, setCaptionTracks]     = useState<CaptionTrack[]>([]);
  const [activeLang, setActiveLang]           = useState<string | null>(null);
  const [showCaptionMenu, setShowCaptionMenu] = useState<boolean>(false);

  /* Full metadata from YouTube Data API v3 (requires VITE_YOUTUBE_API_KEY) */
  const { data: ytData } = useYouTubeVideoData(YOUTUBE_VIDEO_ID);

  /* Computed display values — API data wins, then player.getVideoData(), then mock */
  const displayTitle       = ytData?.title       ?? playerMeta?.title  ?? heroData.title;
  const displayChannel     = ytData?.channelTitle ?? playerMeta?.author ?? heroData.episode;
  const displayDescription = ytData?.description
    ? ytData.description.replace(/\n+/g, ' ').slice(0, 160).trimEnd() +
      (ytData.description.length > 160 ? '…' : '')
    : heroData.description;
  const displayThumbnail   = ytData?.thumbnailUrl || heroData.image;

  /* ── YouTube IFrame API init ──────────────────────────────── */
  useEffect(() => {
    if (playerInitialisedRef.current) return;

    if (window.YT?.Player) { initPlayer(); return; }

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

  /* ── Auto-hide overlay 2 s after player ready ─────────────── */
  useEffect(() => {
    if (!isReady) return;
    hideTimeoutRef.current = setTimeout(() => setShowDetails(false), 2000);
    return () => { if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current); };
  }, [isReady]);

  /* ── Load caption tracklist once player is ready ──────────── */
  useEffect(() => {
    if (!isReady || !playerRef.current) return;
    const p = playerRef.current;
    p.loadModule('captions');
    /* Tracklist populates shortly after loadModule */
    const t = setTimeout(() => {
      const tracks = p.getOption('captions', 'tracklist');
      if (Array.isArray(tracks) && tracks.length > 0) {
        setCaptionTracks(tracks as CaptionTrack[]);
      }
    }, 600);
    return () => clearTimeout(t);
  }, [isReady]);

  /* ── Close caption dropdown on outside click ──────────────── */
  useEffect(() => {
    if (!showCaptionMenu) return;
    const onDown = (e: MouseEvent): void => {
      if (captionMenuRef.current && !captionMenuRef.current.contains(e.target as Node)) {
        setShowCaptionMenu(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [showCaptionMenu]);

  /* ── Google Cast SDK init ─────────────────────────────────── */
  const initCast = useCallback((): void => {
    if (castInitRef.current || !window.cast?.framework) return;
    castInitRef.current = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chromeCast = (window as any).chrome?.cast;
    const ctx = window.cast.framework.CastContext.getInstance();

    ctx.setOptions({
      receiverApplicationId: 'CC1AD845',
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

  /* ── Player factory ───────────────────────────────────────── */
  function initPlayer(): void {
    if (playerInitialisedRef.current || !ytContainerRef.current) return;
    playerInitialisedRef.current = true;

    const div = document.createElement('div');
    div.id = 'yt-hero-player';
    ytContainerRef.current.innerHTML = '';
    ytContainerRef.current.appendChild(div);

    playerRef.current = new window.YT.Player('yt-hero-player', {
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 1, mute: 1, controls: 0, disablekb: 1,
        modestbranding: 1, rel: 0, playsinline: 1,
        iv_load_policy: 3, fs: 0, loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        origin: window.location.origin,
      },
      events: {
        onReady: (e) => {
          e.target.playVideo();
          /* Get title + channel without needing an API key */
          setPlayerMeta(e.target.getVideoData());
          setIsReady(true);
        },
      },
    });
  }

  /* ── Event handlers ───────────────────────────────────────── */
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
    if (muted) { p.unMute(); p.setVolume(80); } else { p.mute(); }
    setMuted((m) => !m);
  }, [muted]);

  /* Activate a specific language track (null = off) */
  const activateCaptionTrack = useCallback((lang: string | null): void => {
    const p = playerRef.current;
    if (!p) return;
    p.loadModule('captions');
    p.setOption('captions', 'track', lang ? { languageCode: lang } : {});
    setActiveLang(lang);
    setShowCaptionMenu(false);
  }, []);

  /* Subtitle icon: toggle first available track on / off */
  const toggleSubtitles = useCallback((): void => {
    if (!captionTracks.length) return;
    activateCaptionTrack(activeLang ? null : (captionTracks[0]?.languageCode ?? null));
  }, [captionTracks, activeLang, activateCaptionTrack]);

  const handleCast = useCallback(async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chromeCast = (window as any).chrome?.cast;

    if (!window.cast?.framework || !chromeCast) {
      window.open(`https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`, '_blank', 'noopener');
      return;
    }

    const ctx = window.cast.framework.CastContext.getInstance();
    if (casting) { ctx.endCurrentSession(true); return; }

    try {
      await ctx.requestSession();
      const session = ctx.getCurrentSession();
      if (!session) return;

      const mediaInfo = new chromeCast.media.MediaInfo(
        `https://www.youtube.com/watch?v=${YOUTUBE_VIDEO_ID}`, 'video/mp4',
      );
      const meta = new chromeCast.media.GenericMediaMetadata();
      meta.title = displayTitle;
      mediaInfo.metadata = meta;

      await session.loadMedia(new chromeCast.media.LoadRequest(mediaInfo));
    } catch { /* user dismissed or no devices */ }
  }, [casting, displayTitle]);

  /* ── Render ───────────────────────────────────────────────── */
  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-bg-card
                    aspect-video xl:aspect-auto transition-[height] duration-500 ease-in-out
                    ${showComments ? 'xl:h-[630px]' : 'xl:h-[calc(100vh-80px)]'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail placeholder until player loads */}
      {!isReady && (
        <img
          src={displayThumbnail}
          alt={displayTitle}
          className="absolute inset-0 w-full h-full object-cover z-[1]"
        />
      )}

      {/* YouTube iframe */}
      <div
        ref={ytContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none
                   [&>iframe]:absolute [&>iframe]:top-1/2 [&>iframe]:left-1/2
                   [&>iframe]:-translate-x-1/2 [&>iframe]:-translate-y-1/2
                   [&>iframe]:w-[177.78vh] [&>iframe]:h-[100%]
                   [&>iframe]:min-w-full [&>iframe]:min-h-[56.25vw]"
        aria-hidden="true"
      />

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none z-[2]" />

      {/* Top-right: live badge + viewer count */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <LiveBadge />
        <span className="flex items-center gap-1.5 px-3 py-1 bg-black/60
                         backdrop-blur text-white text-xs rounded-md border border-white/10">
          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
          {heroData.watching} Watching
        </span>
      </div>

      {/* Bottom overlay — dynamic title, channel, description, controls */}
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
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl
                             text-white tracking-widest leading-none line-clamp-2">
                {displayTitle}
              </h1>
              <span className="btn-outline-red self-end mb-1">Live</span>
            </div>

            {/* Channel name */}
            <h2 className="mt-2 text-sm md:text-base font-semibold text-brand/90">
              {displayChannel}
            </h2>

            {/* First 160 chars of the video description */}
            <p className="mt-1 text-xs md:text-sm text-gray-400 max-w-lg leading-relaxed">
              {displayDescription}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
          {/* Mute toggle */}
          <button
            onClick={toggleMute}
            className="flex items-center gap-2 text-white text-sm
                       hover:text-brand transition-colors"
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            {muted ? 'Unmute' : 'Mute'}
          </button>

          <div className="flex items-center gap-1">
            {/* Subtitle icon — toggles first track on/off */}
            <button
              onClick={toggleSubtitles}
              disabled={!captionTracks.length}
              title={
                !captionTracks.length
                  ? 'No subtitles available'
                  : activeLang ? 'Disable subtitles' : 'Enable subtitles'
              }
              aria-label={activeLang ? 'Disable subtitles' : 'Enable subtitles'}
              className={`p-1.5 md:p-2 rounded-md transition-colors ${
                !captionTracks.length
                  ? 'text-white/25 cursor-not-allowed'
                  : activeLang
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

            {/* Caption language picker dropdown */}
            <div ref={captionMenuRef} className="relative hidden sm:block ml-1">
              <button
                onClick={() => captionTracks.length && setShowCaptionMenu((s) => !s)}
                disabled={!captionTracks.length}
                className={`inline-flex items-center gap-2 px-3 py-1.5
                           bg-bg-card/90 border rounded-md text-xs
                           hover:bg-bg-elevated transition-colors ${
                             activeLang ? 'border-brand text-brand' : 'border-line text-white'
                           } ${!captionTracks.length ? 'opacity-30 cursor-not-allowed' : ''}`}
              >
                {activeLang
                  ? (captionTracks.find((t) => t.languageCode === activeLang)?.displayName ?? 'CC: On')
                  : 'Subtitle / Caption'}
                <svg viewBox="0 0 10 6" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </button>

              {/* Language list */}
              {showCaptionMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-bg-card border border-line
                                rounded-lg py-1 min-w-[180px] z-20 shadow-xl">
                  <button
                    onClick={() => activateCaptionTrack(null)}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors
                                hover:bg-bg-elevated flex items-center gap-2 ${
                                  !activeLang ? 'text-brand' : 'text-white/70'
                                }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${!activeLang ? 'bg-brand' : 'bg-transparent'}`} />
                    Off
                  </button>

                  <div className="my-1 border-t border-line" />

                  {captionTracks.map((track) => (
                    <button
                      key={track.id}
                      onClick={() => activateCaptionTrack(track.languageCode)}
                      className={`w-full text-left px-3 py-1.5 text-xs transition-colors
                                  hover:bg-bg-elevated flex items-center gap-2 ${
                                    activeLang === track.languageCode ? 'text-brand' : 'text-white/70'
                                  }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        activeLang === track.languageCode ? 'bg-brand' : 'bg-transparent'
                      }`} />
                      <span>
                        {track.displayName}
                        {track.kind === 'asr' && (
                          <span className="text-muted ml-1 text-[10px]">(auto)</span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}