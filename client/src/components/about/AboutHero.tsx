import { aboutHero } from '@/utils/aboutData';

export default function AboutHero(): JSX.Element {
  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-6"
      aria-label="Global movie watching experience"
    >
      <div className="relative rounded-2xl overflow-hidden bg-bg-card
                      min-h-[280px] md:min-h-[360px] lg:h-[380px]">

        {/* Background image — cinema theater seats */}
        <img
          src={aboutHero.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />

        {/* Strong left-side dark gradient for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r
                        from-black via-black/85 md:via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center
                        p-6 md:p-10 lg:p-14 h-full min-h-[280px] md:min-h-[360px] lg:h-[380px] max-w-xl">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {aboutHero.title}
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-400 mt-1 leading-tight">
            {aboutHero.highlight}
          </p>

          <p className="mt-4 text-sm md:text-base text-gray-300 leading-relaxed max-w-md">
            {aboutHero.description}
          </p>

          <button className="btn-primary mt-6 self-start">
            {aboutHero.ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}