import { aboutStories } from '@/utils/aboutData';

export default function AboutStories(): JSX.Element {
  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-16 md:mt-20"
      aria-label="Stories behind the stars"
    >
      {/* Header */}
      <div className="mb-8 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          {aboutStories.title}
        </h2>
        <p className="mt-3 text-sm md:text-base text-gray-400 leading-relaxed max-w-xl">
          {aboutStories.description}
        </p>
      </div>

      {/* 3 portrait images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {aboutStories.portraits.map((portrait) => (
          <div
            key={portrait.id}
            className="relative aspect-[3/4] md:aspect-[4/5] rounded-xl overflow-hidden
                       bg-bg-card group cursor-pointer"
          >
            <img
              src={portrait.image}
              alt={portrait.name ?? 'Actor portrait'}
              className="absolute inset-0 w-full h-full object-cover grayscale
                         group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        ))}
      </div>
    </section>
  );
}