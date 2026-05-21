import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, UserCircle, LogOut } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '@/context/AuthContext';
import type { NavLink as NavLinkType } from '@/types';

const NAV_LINKS: NavLinkType[] = [
  { label: 'Home',       to: '/' },
  { label: 'About Us',   to: '/about' },
  { label: 'Live',       to: '/live' },
  { label: 'Movies',     to: '/movies' },
  { label: 'Interviews', to: '/interviews' },
  { label: 'Actors',     to: '/actors' },
];

export default function Navbar(): JSX.Element {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
    console.log('Avatar src:', user?.image);

  /* Fallback avatar: initials via ui-avatars when no avatar URL */
  const avatarSrc = user?.avatar
    ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name ?? 'U')}&background=e50914&color=fff&size=80`;

  const handleLogout = (): void => {
    logout();
    navigate('/');
  };

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

          {/* ── User pill — desktop ── */}
          {user ? (
            /* Logged in */
            <div className="hidden sm:flex items-center gap-3 bg-bg-card border border-line
                            rounded-full pl-1 pr-2 py-1 hover:border-gray-500 transition-colors group">
              <img
                src={user.image ?? avatarSrc}
                alt={user.name ?? 'User avatar'}
                
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <div className="leading-tight">
                <p className="text-xs font-semibold text-white">
                  Hi {user.name?.split(' ')[0] ?? 'User'}
                </p>
                <p className="text-[10px] text-muted">
                  {user.isPremium ? 'Premium User' : 'Free User'}
                </p>
              </div>
              {/* Logout icon */}
              <button
                onClick={handleLogout}
                aria-label="Sign out"
                title="Sign out"
                className="ml-1 p-1.5 rounded-full text-muted hover:text-brand hover:bg-brand/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Not logged in */
            <button
              onClick={() => navigate('/signin')}
              className="hidden sm:flex items-center gap-3 bg-bg-card border border-line
                         rounded-full pl-1 pr-4 py-1 hover:border-gray-500 transition-colors"
              aria-label="Sign in"
            >
              <div className="w-8 h-8 rounded-full bg-bg-elevated border border-line
                              flex items-center justify-center shrink-0">
                <UserCircle className="w-5 h-5 text-gray-400" />
              </div>
              <div className="leading-tight">
                <p className="text-xs font-semibold text-white">Sign In</p>
                <p className="text-[10px] text-muted">Get Premium Access</p>
              </div>
            </button>
          )}

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

            {/* Auth entry in mobile drawer */}
            <li className="pt-2 border-t border-line mt-2">
              {user ? (
                <div className="flex items-center justify-between px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <img
                      src={avatarSrc}
                      alt={user.name ?? 'User'}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="leading-tight">
                      <p className="text-sm font-semibold text-white">
                        {user.name ?? 'User'}
                      </p>
                      <p className="text-[10px] text-muted">
                        {user.isPremium ? 'Premium User' : 'Free User'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setMenuOpen(false); handleLogout(); }}
                    className="flex items-center gap-1.5 text-xs text-muted hover:text-brand transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
                             text-gray-400 hover:bg-bg-card hover:text-white transition-colors"
                >
                  <UserCircle className="w-5 h-5" />
                  Sign In
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}