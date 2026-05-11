import { useState, type KeyboardEvent } from 'react';
import {
  Volume2, VolumeX, Subtitles, MessageSquare,
  Cast, MoreVertical, X, Send, Eye,
} from 'lucide-react';
import LiveBadge from '@/components/ui/LiveBadge';
import { heroData, liveChat } from '@/utils/mockData';
import type { ChatMessage } from '@/types';

/* ── Sub-component: single chat message ─────────────────────── */
interface ChatMessageRowProps {
  msg: ChatMessage;
}

function ChatMessageRow({ msg }: ChatMessageRowProps): JSX.Element {
  return (
    <div
      className={`flex gap-2 px-2 py-1.5 rounded-md ${
        msg.highlighted ? 'bg-brand/10 border-l-2 border-brand' : ''
      }`}
    >
      <img
        src={msg.avatar}
        alt={msg.user}
        className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
      />
      <p className="text-xs leading-snug">
        <span className={`font-semibold ${msg.color ?? 'text-brand'}`}>
          {msg.user}:{' '}
        </span>
        <span className="text-gray-300">{msg.message}</span>
      </p>
    </div>
  );
}

/* ── Sub-component: icon button ─────────────────────────────── */
interface IconBtnProps {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}

function IconBtn({ label, onClick, children }: IconBtnProps): JSX.Element {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className="p-1.5 md:p-2 rounded-md text-white/80 hover:text-brand
                 hover:bg-white/5 transition-colors"
    >
      {children}
    </button>
  );
}

/* ── Main component ─────────────────────────────────────────── */
export default function HeroSection(): JSX.Element {
  const [muted, setMuted] = useState<boolean>(true);
  const [chatMsg, setChatMsg] = useState<string>('');

  const handleChatSend = (): void => {
    if (!chatMsg.trim()) return;
    // TODO: send via WebSocket / API
    setChatMsg('');
  };

  const handleChatKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleChatSend();
  };

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6"
      aria-label="Featured live stream"
    >
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-4">

        {/* ── Player ─────────────────────────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden bg-bg-card
                        aspect-video xl:aspect-auto xl:h-[530px]">
          {/* Poster image (replace with <video> tag in production) */}
          <img
            src={heroData.image}
            alt={`Now playing: ${heroData.title}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

          {/* Top-right info pills */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <LiveBadge />
            <span className="flex items-center gap-1.5 px-3 py-1 bg-black/60
                             backdrop-blur text-white text-xs rounded-md border border-white/10">
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              {heroData.watching} Watching
            </span>
          </div>

          {/* Bottom: title + controls */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7 lg:p-9 z-10">
            {/* Titles */}
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

            {/* Controls bar */}
            <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
              <button
                onClick={() => setMuted((m) => !m)}
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
                <IconBtn label="Subtitles"><Subtitles className="w-5 h-5" /></IconBtn>
                <IconBtn label="Comments"><MessageSquare className="w-5 h-5" /></IconBtn>
                <IconBtn label="Cast"><Cast className="w-5 h-5" /></IconBtn>
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

        {/* ── Live Chat (desktop sidebar) ─────────────────────── */}
        <aside
          className="hidden xl:flex flex-col bg-bg-panel rounded-2xl
                     border border-line h-[530px]"
          aria-label="Live chat"
        >
          {/* Chat header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-line shrink-0">
            <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold">Live Chat</h3>
              <span className="text-[11px] px-2 py-0.5 bg-bg-card rounded text-muted border border-line">
                Top Chat
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <button aria-label="More options" className="hover:text-white transition-colors p-1">
                <MoreVertical className="w-4 h-4" />
              </button>
              <button aria-label="Close chat" className="hover:text-white transition-colors p-1">
                <X className="w-4 h-4" />
              </button>
              {/* Toggle dot */}
              <button aria-label="Chat on/off" className="w-8 h-4 rounded-full bg-brand relative">
                <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-white rounded-full" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 no-scrollbar">
            {liveChat.map((msg) => (
              <ChatMessageRow key={msg.id} msg={msg} />
            ))}
          </div>

          {/* Chat input */}
          <div className="p-3 border-t border-line shrink-0">
            <div className="flex items-center gap-2 bg-bg-card rounded-lg
                            px-3 py-2 border border-line focus-within:border-gray-500 transition-colors">
              <input
                type="text"
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
                onKeyDown={handleChatKeyDown}
                placeholder="Send a message..."
                aria-label="Chat message"
                className="flex-1 bg-transparent text-sm text-white
                           placeholder-muted focus:outline-none min-w-0"
              />
              <button aria-label="Emoji" className="text-muted hover:text-white transition-colors text-base">
                😊
              </button>
              <button
                onClick={handleChatSend}
                aria-label="Send message"
                className="bg-brand p-1.5 rounded-md hover:bg-brand-light transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-muted">
              <span>1,240 Bits</span>
              <span>Press Enter to send</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
