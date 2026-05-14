import { useState, type KeyboardEvent } from 'react';
import { MoreVertical, X, Send, Bookmark } from 'lucide-react';
import LiveVideoPlayer from '@/components/feature_component/LiveVideoPlayer';
import { heroData, liveChat } from '@/utils/mockData';
import type { ChatMessage } from '@/types';

/* ── Single chat message row ─────────────────────────────────── */
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

/* ── Main hero — player + chat + title block ─────────────────── */
export default function LiveHero(): JSX.Element {
  const [chatMsg, setChatMsg] = useState<string>('');
  const [showComments, setShowComments] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);

  const handleChatSend = (): void => {
    if (!chatMsg.trim()) return;
    setChatMsg('');
  };

  const handleChatKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleChatSend();
  };

  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-4 md:mt-6"
      aria-label="Live stream"
    >
      {/* Player + Chat — chat hidden when toggle off */}
      <div
        className={`w-full grid grid-cols-1 gap-4 ${
          showComments ? 'xl:grid-cols-[1fr_360px]' : ''
        }`}
      >
        {/* ── Reusing your existing LiveVideoPlayer ────────────── */}
        <LiveVideoPlayer
          showComments={showComments}
          onToggleComments={() => setShowComments((v) => !v)}
        />

        {/* ── Live chat sidebar ────────────────────────────────── */}
        <aside
          className={`flex-col bg-bg-panel rounded-2xl border border-line h-[630px]
                      ${showComments ? 'hidden xl:flex' : 'hidden'}`}
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
              <button
                aria-label="More options"
                className="hover:text-white transition-colors p-1"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              <button
                aria-label="Close chat"
                className="hover:text-white transition-colors p-1"
                onClick={() => setShowComments(false)}
              >
                <X className="w-4 h-4" />
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
            <div
              className="flex items-center gap-2 bg-bg-card rounded-lg
                         px-3 py-2 border border-line focus-within:border-gray-500 transition-colors"
            >
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
              <button
                aria-label="Emoji"
                className="text-muted hover:text-white transition-colors text-base"
              >
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

      {/* ── Title block + Save button (below player) ─────────── */}
      <div className="mt-5 flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-wide">
            {heroData.title}
          </h1>
          <h2 className="mt-2 text-base md:text-lg font-semibold text-white">
            {heroData.episode}
          </h2>
          <p className="mt-1 text-sm text-gray-400 max-w-md leading-relaxed">
            {heroData.description}
          </p>
        </div>

        <button
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? 'Remove from saved' : 'Save'}
          aria-pressed={saved}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium
                      transition-all duration-200 ${
            saved
              ? 'bg-brand/10 border-brand text-brand'
              : 'bg-bg-card border-line text-white hover:border-gray-500'
          }`}
        >
          <Bookmark
            className={`w-4 h-4 ${saved ? 'fill-current' : ''}`}
            aria-hidden="true"
          />
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </section>
  );
}