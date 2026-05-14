import type { ActorDetailData } from '@/utils/actorsData';

interface ActorBiographyProps {
  actor: ActorDetailData;
}

export default function ActorBiography({ actor }: ActorBiographyProps): JSX.Element {
  return (
    <section
      className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 mt-8 md:mt-10"
      aria-label="Biography and details"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-6 lg:gap-10">

        {/* ── Biography text ─────────────────────────────────── */}
        <div>
          <h2 className="text-white font-bold text-base mb-4">Biography</h2>
          <div className="space-y-4">
            {actor.biography.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm md:text-base text-gray-300 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* ── Details card ───────────────────────────────────── */}
        <div
          className="bg-bg-card border border-line rounded-xl p-5 md:p-6 self-start"
          aria-label="Actor details"
        >
          <h3 className="text-white font-bold text-sm mb-5">Details</h3>

          <dl className="space-y-5">
            {/* Born */}
            <div>
              <dt className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase mb-1">
                Born
              </dt>
              <dd className="text-sm text-white">{actor.born}</dd>
            </div>

            {/* Major Awards */}
            <div>
              <dt className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase mb-1">
                Major Awards
              </dt>
              <dd className="text-sm text-white">{actor.majorAwards}</dd>
            </div>

            {/* Training */}
            <div>
              <dt className="text-[10px] font-bold tracking-[0.2em] text-muted uppercase mb-1">
                Training
              </dt>
              <dd className="text-sm text-white">{actor.training}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}