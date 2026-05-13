import { aboutWhy } from '@/utils/aboutData';

export default function AboutWhy(): JSX.Element {
  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-16 md:mt-20"
      aria-label="Why we built this platform"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

        {/* ── Left: title + paragraphs ──────────────────────────── */}
        <div>
          {/* Title with yellow underline */}
          <div className="relative inline-block">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {aboutWhy.title}
            </h2>
            <span
              className="absolute -bottom-2 left-0 h-[3px] w-16 bg-yellow-400 rounded-full"
              aria-hidden="true"
            />
          </div>

          <div className="mt-8 space-y-4 max-w-md">
            {aboutWhy.paragraphs.map((para, idx) => (
              <p key={idx} className="text-sm md:text-base text-gray-400 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* ── Right: director's chair image ─────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden bg-bg-card aspect-[16/10] lg:aspect-[16/11]">
          <img
            src="/assets/images/Cinematic production equipment.png"
            alt="Director's chair and film equipment"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}