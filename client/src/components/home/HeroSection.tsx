import { useState, type KeyboardEvent } from 'react';
import { MoreVertical, X, Send } from 'lucide-react';
import LiveVideoPlayer from '@/components/feature_component/LiveVideoPlayer';
import ScheduleSection from '@/components/home/ScheduleSection';
import { liveChat } from '@/utils/mockData';
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

/* ── Main component ─────────────────────────────────────────── */
export default function HeroSection(): JSX.Element {
  const [chatMsg, setChatMsg] = useState<string>('');
  const [showComments, setShowComments] = useState<boolean>(true);

  const handleChatSend = (): void => {
    if (!chatMsg.trim()) return;
    setChatMsg('');
  };

  const handleChatKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') handleChatSend();
  };

  return (
    <section
      className={`relative w-full bg-cover bg-center bg-no-repeat transition-[padding] duration-500 ease-in-out ${
        showComments ? 'pt-[30px] pb-[50px]' : 'pt-0 pb-0'
      }`}
      style={{ backgroundImage: "url('/assets/images/hero-bg-final.jpg')" }}
      aria-label="Featured live stream bg"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-transparent pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6 flex flex-col items-center">

        {/* Player + Chat grid — second column only shows when comments are open */}
        <div className={`w-full grid grid-cols-1 gap-4 ${showComments ? 'xl:grid-cols-[1fr_360px]' : ''}`}>

          {/* ── Player ─────────────────────────────────────────── */}
          <LiveVideoPlayer
            showComments={showComments}
            onToggleComments={() => setShowComments((v) => !v)}
          />

          {/* ── Live Chat sidebar (xl only, hidden when comments toggled off) ── */}
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
                <button aria-label="More options" className="hover:text-white transition-colors p-1">
                  <MoreVertical className="w-4 h-4" />
                </button>
                <button
                  aria-label="Close chat"
                  className="hover:text-white transition-colors p-1"
                  onClick={() => setShowComments(false)}
                >
                  <X className="w-4 h-4" />
                </button>
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

        <div className="w-full">
          <ScheduleSection />
        </div>
      </div>
    </section>
  );
}