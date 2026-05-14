import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import Logo from './Logo';
import type { NavLink as NavLinkType } from '@/types';

const NAV_LINKS: NavLinkType[] = [
  { label: 'Home', to: '/' },
   { label: 'About Us', to: '/about' },
  { label: 'Live', to: '/live' },
  { label: 'Shows', to: '/shows' },
  { label: 'Movies', to: '/movies' },
  { label: 'Interviews', to: '/interviews' },
  { label: 'Actors', to: '/actors' },
];

export default function Navbar(): JSX.Element {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `text-sm font-medium transition-colors hover:text-white ${
      isActive ? 'text-white' : 'text-gray-400'
    }`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-bg-card text-white'
        : 'text-gray-400 hover:bg-bg-card hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-bg-base/95 backdrop-blur border-b border-line">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4">

        {/* Logo */}
        <NavLink to="/" aria-label="BlackTree.TV home">
          <Logo />
        </NavLink>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-7" role="navigation" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            aria-label="Search"
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-bg-card"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* User pill — tablet+ */}
          <div className="hidden sm:flex items-center gap-3 bg-bg-card border border-line rounded-full pl-1 pr-4 py-1 cursor-pointer hover:border-gray-500 transition-colors">
            <img
              src="https://i.pravatar.cc/40?img=68"
              alt="User avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="leading-tight">
              <p className="text-xs font-semibold text-white">Hi Jamal</p>
              <p className="text-[10px] text-muted">Premium User</p>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-bg-card transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <nav
          className="lg:hidden border-t border-line bg-bg-base/98 backdrop-blur"
          role="navigation"
          aria-label="Mobile"
        >
          <ul className="max-w-[1400px] mx-auto px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={mobileLinkClass}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
