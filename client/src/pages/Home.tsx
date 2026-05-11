import HeroSection from '@/components/home/HeroSection';
import ScheduleSection from '@/components/home/ScheduleSection';
import FeaturedActors from '@/components/home/FeaturedActors';
import MovieCarousel from '@/components/home/MovieCarousel';
import ExclusiveInterview from '@/components/home/ExclusiveInterview';
import AetherProSection from '@/components/home/AetherProSection';
import { vodContent, featuredMovies } from '@/utils/mockData';

export default function Home(): JSX.Element {
  return (
    <div className="pb-12 animate-fade-up">
      {/* 1. Hero — live stream player + live chat sidebar */}
      <HeroSection />

      {/* 2. Schedule — now playing / up next / playing later / requests */}
      <ScheduleSection />

      {/* 3. Featured Actors carousel */}
      <FeaturedActors />

      {/* 4. VOD Content (movie posters carousel) */}
      <MovieCarousel title="VOD Content" movies={vodContent} />

      {/* 5. Exclusive Interview banner */}
      <ExclusiveInterview />

      {/* 6. Featured Movies carousel */}
      <MovieCarousel title="Featured Movies" movies={featuredMovies} />

      {/* 7. Aether Pro+ upsell / pricing section */}
      <AetherProSection />
    </div>
  );
}
