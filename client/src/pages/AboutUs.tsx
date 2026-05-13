// import AboutPageHeader  from '@/components/about/AboutPageHeader';
import AboutHero        from '@/components/about/AboutHero';
import AboutWhy         from '@/components/about/AboutWhy';
import AboutFeatures    from '@/components/about/AboutFeatures';
import AboutStories     from '@/components/about/AboutStories';
import AboutReliability from '@/components/about/AboutReliability';
import AboutCta         from '@/components/about/AboutCta';

export default function AboutUs(): JSX.Element {
  return (
    <div className="pb-12 animate-fade-up">
      {/* 1. "About Us" small page title */}
      {/* <AboutPageHeader /> */}

      {/* 2. Global Movie Watching Experience banner */}
      <AboutHero />

      {/* 3. Why We Built This Platform */}
      <AboutWhy />

      {/* 4. 6-feature icon row */}
      <AboutFeatures />

      {/* 5. Stories Behind the Stars (3 portraits) */}
      <AboutStories />

      {/* 6. Smooth. Reliable. Cinematic. */}
      <AboutReliability />

      {/* 7. Final CTA card */}
      <AboutCta />
    </div>
  );
}