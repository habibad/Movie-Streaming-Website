import { aboutCta } from '@/utils/aboutData';

export default function AboutCta(): JSX.Element {
  return (
    <section
      className="max-w-[900px] mx-auto px-4 md:px-6 lg:px-8 mt-16 md:mt-20 mb-12"
      aria-label="Join Blacktree"
    >
      <div className="bg-bg-panel border border-line rounded-2xl
                      px-6 md:px-10 lg:px-14 py-10 md:py-12 text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
          {aboutCta.title}
        </h2>

        <p className="mt-3 text-sm md:text-base text-gray-400 max-w-lg mx-auto">
          {aboutCta.description}
        </p>

        <div className="mt-7 flex items-center justify-center gap-3 flex-wrap">
          <button className="btn-primary">
            {aboutCta.primaryCta}
          </button>
          <button className="px-6 py-3 rounded-lg border border-white/20 text-white
                             font-semibold text-sm hover:bg-white/5 active:scale-[0.98]
                             transition-all duration-200">
            {aboutCta.secondaryCta}
          </button>
        </div>
      </div>
    </section>
  );
}