import { Send, Play } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import Logo from './Logo';

const QUICK_LINKS = ['Home', 'Movies', 'TV Series', 'Live', 'My List'];
const CATEGORIES = ['Action', 'Comedy', 'Horror', 'Romance', 'Sci-Fi'];
const SUPPORT = ['Contact Us', 'FAQ', 'Privacy Policy', 'Terms & Conditions'];

interface FooterColumnProps {
  title: string;
  items: string[];
}

function FooterColumn({ title, items }: FooterColumnProps): JSX.Element {
  return (
    <div>
      <h4 className="text-white font-semibold mb-4">{title}</h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-sm text-muted hover:text-white transition-colors"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer(): JSX.Element {
  const [email, setEmail] = useState<string>('');

  const handleSubscribe = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!email) return;
    // TODO: wire to POST /api/newsletter
    setEmail('');
  };

  return (
    <footer className="bg-bg-base border-t border-line mt-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Watch unlimited movies, TV shows &amp; web series anytime, anywhere.
            </p>
            <div className="mt-4 flex items-center gap-2 text-brand text-xs font-bold tracking-widest">
              <Play className="w-4 h-4 fill-current" aria-hidden="true" />
              PREMIUM STREAMING
            </div>
          </div>

          <FooterColumn title="Quick Links" items={QUICK_LINKS} />
          <FooterColumn title="Categories" items={CATEGORIES} />
          <FooterColumn title="Support" items={SUPPORT} />

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
            <p className="text-sm text-muted mb-3">Stay Updated</p>
            <form onSubmit={handleSubscribe} className="flex items-center bg-bg-card border border-line rounded-lg overflow-hidden">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                aria-label="Email address"
                className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder-muted focus:outline-none min-w-0"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-brand hover:bg-brand-light p-2.5 transition-colors shrink-0"
              >
                <Send className="w-4 h-4 text-white" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-line text-center text-xs text-muted">
          © {new Date().getFullYear()} BlackTree.TV — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
