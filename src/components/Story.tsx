import { IMG } from "../data";
import { Counter, Eyebrow, Reveal } from "./ui";

const PRINCIPLES = [
  {
    no: "01",
    title: "Only board-certified",
    kr: "전문의",
    desc: "Three KSPRS-certified surgeons. No locums, no shadow surgeons, no rotating staff — the face you plan with is the face you operate with.",
  },
  {
    no: "02",
    title: "1:1 responsibility",
    kr: "책임진료",
    desc: "One surgeon from the first sketch to the final suture, and personally accountable for the twelve months of reviews that follow.",
  },
  {
    no: "03",
    title: "3D before the knife",
    kr: "3D 시뮬레이션",
    desc: "CT-based simulation and angle mapping on a life-size screen, so consent is built on sight — not imagination.",
  },
  {
    no: "04",
    title: "Safety, absolute",
    kr: "안전 시스템",
    desc: "University-hospital anaesthesia protocol, real-time nerve monitoring in contouring, and a surgeon-led recovery ward.",
  },
];

const JOURNEY = [
  { step: "Consultation", kr: "상담", time: "Day 0", desc: "60 minutes with your surgeon. 3D scan, angle mapping and an honest written plan — including what we would not do." },
  { step: "Simulation", kr: "시뮬레이션", time: "Day 0–3", desc: "Your projected outcome rendered on a life-size 3D model. You approve the geometry before anything is scheduled." },
  { step: "Surgery", kr: "수술", time: "Chosen day", desc: "Private theatre, university-protocol anaesthesia, and your surgeon — only your surgeon — from first incision to closure." },
  { step: "Recovery", kr: "회복", time: "Weeks 1–2", desc: "Privé recovery suite, daily nurse rounds, chef-prepared meals and a 24/7 line that rings your surgeon's team." },
  { step: "Reveal", kr: "완성", time: "Week 6", desc: "Swelling settles into the plan. Scar-management protocol begins; reviews continue to month twelve, on us." },
];

export default function Story() {
  return (
    <section id="standard" className="relative overflow-hidden bg-white py-28 lg:py-40">
      <span
        aria-hidden="true"
        className="text-stroke-gold pointer-events-none absolute -right-6 top-6 hidden select-none font-display text-[260px] italic leading-none opacity-60 xl:block"
      >
        Standard
      </span>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* sticky left */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal><Eyebrow kr="우리의 기준">The YEON Standard</Eyebrow></Reveal>
              <h2 className="mt-8 font-display text-5xl font-medium leading-[1.04] text-brand-ink md:text-6xl">
                <Reveal mask delay={100}><span className="block">Surgery is a</span></Reveal>
                <Reveal mask delay={220}><span className="block">promise. We</span></Reveal>
                <Reveal mask delay={340}><span className="block italic text-brand">keep ours.</span></Reveal>
              </h2>
              <Reveal delay={440}>
                <p className="mt-8 max-w-md text-[15.5px] leading-relaxed text-ink/60">
                  Gangnam performs more facial surgery per square kilometre than anywhere on
                  earth. We built YEON to be the atelier that refuses the factory — fewer
                  patients, longer consultations, one accountable hand.
                </p>
              </Reveal>
              <Reveal delay={520}>
                <div className="mt-10 flex items-end gap-10">
                  <div>
                    <Counter to={18} className="font-display text-6xl font-semibold text-brand-deep md:text-7xl" />
                    <p className="mt-2 text-[10.5px] tracking-[0.26em] text-ink/45 uppercase">Years of practice</p>
                  </div>
                  <div>
                    <Counter to={21400} suffix="+" className="font-display text-6xl font-semibold text-brand-deep md:text-7xl" />
                    <p className="mt-2 text-[10.5px] tracking-[0.26em] text-ink/45 uppercase">Procedures</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* right: principles + journey */}
          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {PRINCIPLES.map((p, i) => (
                <Reveal key={p.no} delay={i * 100}>
                  <article
                    className={`group h-full rounded-[1.8rem] border p-7 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(22,48,31,0.12)] ${
                      i % 3 === 0
                        ? "border-transparent bg-brand text-white hover:bg-brand-deep"
                        : "border-brand/12 bg-white hover:border-gold/60"
                    }`}
                    data-hover
                  >
                    <div className="flex items-start justify-between">
                      <span className={`font-display text-3xl italic ${i % 3 === 0 ? "text-gold" : "text-gold-deep"}`}>{p.no}</span>
                      <span className={`font-kr text-sm ${i % 3 === 0 ? "text-gold/80" : "text-gold-deep"}`}>{p.kr}</span>
                    </div>
                    <h3 className={`mt-5 font-display text-2xl leading-tight ${i % 3 === 0 ? "text-white" : "text-brand-ink"}`}>
                      {p.title}
                    </h3>
                    <p className={`mt-3 text-[13.5px] leading-relaxed ${i % 3 === 0 ? "text-white/70" : "text-ink/60"}`}>{p.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* patient journey */}
            <Reveal delay={120}>
              <div className="mt-16 overflow-hidden rounded-[2rem] border border-brand/12 bg-paper p-8 md:p-10">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl font-medium text-brand-ink">
                    The patient journey <span className="font-kr text-base text-gold-deep">여정</span>
                  </h3>
                  <span className="hidden text-[10px] tracking-[0.3em] text-ink/40 uppercase sm:block">Consult → Reveal</span>
                </div>
                <ol className="relative mt-9 space-y-8 before:absolute before:bottom-3 before:left-[9px] before:top-3 before:w-px before:bg-gold/50">
                  {JOURNEY.map((j, i) => (
                    <Reveal key={j.step} delay={i * 110}>
                      <li className="group relative pl-12">
                        <span className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border border-gold-deep bg-white transition-all duration-500 group-hover:scale-125 group-hover:bg-gold">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-deep group-hover:bg-brand-ink" />
                        </span>
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span className="font-display text-2xl text-brand-deep">{j.step}</span>
                          <span className="font-kr text-sm text-gold-deep">{j.kr}</span>
                          <span className="rounded-full border border-brand/15 bg-white px-3 py-1 text-[9.5px] font-medium tracking-[0.22em] text-brand uppercase">
                            {j.time}
                          </span>
                        </div>
                        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink/60">{j.desc}</p>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>

        {/* wide image strip */}
        <div className="mt-24 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="group relative h-[420px] overflow-hidden rounded-[2rem] lg:h-[480px]">
              <img
                src={IMG.lobby}
                alt="The YEON lobby in Gangnam"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1800ms] group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-7 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[10.5px] tracking-[0.26em] text-white uppercase backdrop-blur-sm">
                The clinic · 4F Apgujeong-ro
              </p>
            </div>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-5">
            <div className="group relative h-[420px] overflow-hidden rounded-[2rem] lg:h-[480px]">
              <img
                src={IMG.consult}
                alt="3D facial simulation consultation"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1800ms] group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent to-transparent" />
              <p className="absolute bottom-6 left-7 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-[10.5px] tracking-[0.26em] text-white uppercase backdrop-blur-sm">
                3D simulation theatre
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
