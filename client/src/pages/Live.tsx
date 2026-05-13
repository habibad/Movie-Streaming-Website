import LiveCategoryPills from '@/components/live/LiveCategoryPills';
import LiveHero          from '@/components/live/LiveHero';
import TrendingChannels  from '@/components/live/TrendingChannels';
import UpcomingEvents    from '@/components/live/UpcomingEvents';

export default function Live(): JSX.Element {
  return (
    <div className="pb-12 animate-fade-up">
      {/* 1. Category filter pills */}
      <LiveCategoryPills />

      {/* 2. Hero — player + chat sidebar + title block + Save */}
      <LiveHero />

      {/* 3. Trending Channels — 4-up grid */}
      <TrendingChannels />

      {/* 4. Upcoming Events — premiere + sports + cinema cards */}
      <UpcomingEvents />
    </div>
  );
}