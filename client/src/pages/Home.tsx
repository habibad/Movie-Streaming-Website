import HeroSection from '@/components/home/HeroSection';
import FeaturedActors from '@/components/home/FeaturedActors';
import MovieCarousel from '@/components/home/MovieCarousel';
import ExclusiveInterview from '@/components/home/ExclusiveInterview';
import AetherProSection from '@/components/home/AetherProSection';
import { vodContent, featuredMovies } from '@/utils/mockData';
import {getMe} from '../utils/authApi';

export default function Home(): JSX.Element {
  console.log('Fetching current user data on Home page load...', getMe().then(user => console.log('Current user:', user.id,' and name is: ', user.name)).catch(err => console.error('Error fetching user:', err)));

  return (
    <div className="pb-12 animate-fade-up">
      {/* 1. Hero — live stream player + live chat sidebar */}
      <HeroSection />

      {/* 2. Schedule — now playing / up next / playing later / requests */}
      {/* <ScheduleSection /> */}

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
