import { TIERS } from "../data";
import { Eyebrow, Reveal } from "./ui";

export default function Vip({ onReserve }: { onReserve: (id: string) => void }) {
  return (
    <section id="vip" className="relative overflow-hidden bg-brand-ink py-28 text-white lg:py-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 15% 0%, rgba(212,180,140,0.12), transparent 55%), radial-gradient(700px 500px at 90% 100%, rgba(45,90,61,0.5), transparent 60%)",
        }}
      />
      <span
        aria-hidden="true"
        className="text-stroke-gold pointer-events-none absolute -right-10 top-4 hidden select-none font-display text-[260px] italic leading-none opacity-30 xl:block"
      >
        Privé
      </span>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow kr="프라이빗 멤버십" light>Privé Surgical Programs</Eyebrow></Reveal>
            <h2 className="mt-8 font-display text-5xl font-medium leading-[1.04] md:text-6xl">
              <Reveal mask delay={100}><span className="block">Surgery deserves</span></Reveal>
              <Reveal mask delay={220}><span className="block">a <em className="italic text-gold">private floor</em>.</span></Reveal>
            </h2>
          </div>
          <Reveal delay={300} className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-relaxed text-white/65 lg:ml-auto">
              Every YEON patient receives hospital-grade care. Privé adds the layer our
              international patients ask for — privacy, logistics, language and time handled
              before you ask.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {TIERS.map((t, i) => (
            <Reveal key={t.id} delay={i * 130} className={t.featured ? "lg:col-span-5" : "lg:col-span-3.5 lg:col-span-4"}>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-8 transition-all duration-700 md:p-10 ${
                  t.featured
                    ? "border-gold/60 bg-gold text-brand-ink shadow-[0_40px_120px_rgba(212,180,140,0.25)]"
                    : "border-white/12 bg-white/[0.04] hover:-translate-y-2 hover:border-gold/50 hover:bg-white/[0.07]"
                }`}
                data-hover
              >
                {t.featured && (
                  <span className="absolute right-8 top-8 rounded-full border border-brand-ink/30 px-4 py-1.5 text-[9.5px] font-semibold tracking-[0.26em] uppercase">
                    Most chosen
                  </span>
                )}
                <p className={`font-kr text-sm tracking-[0.3em] ${t.featured ? "text-brand/70" : "text-gold"}`}>{t.kr}</p>
                <h3 className="mt-3 font-display text-4xl font-medium">{t.name}</h3>
                <p className={`mt-2 font-display text-xl italic ${t.featured ? "text-brand/80" : "text-white/50"}`}>{t.note}</p>

                <div className="mt-7 flex items-baseline gap-3">
                  <span className="font-display text-4xl font-semibold">{t.price}</span>
                  <span className={`text-[10.5px] tracking-[0.24em] uppercase ${t.featured ? "text-brand/60" : "text-white/45"}`}>
                    {t.period}
                  </span>
                </div>

                <ul className={`mt-8 space-y-3.5 border-t pt-7 ${t.featured ? "border-brand-ink/15" : "border-white/10"}`}>
                  {t.perks.map((p) => (
                    <li key={p} className={`flex items-start gap-3 text-[14px] leading-relaxed ${t.featured ? "text-brand-ink/85" : "text-white/70"}`}>
                      <svg
                        width="15"
                        height="12"
                        viewBox="0 0 15 12"
                        fill="none"
                        stroke={t.featured ? "#16301F" : "#D4B48C"}
                        strokeWidth="1.6"
                        className="mt-1.5 shrink-0"
                      >
                        <path d="M1 6.5L5 10.5 14 1" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onReserve(t.id)}
                  className={`mt-10 w-full rounded-full py-4 text-[11px] font-semibold tracking-[0.28em] uppercase transition-all duration-500 ${
                    t.featured
                      ? "bg-brand-ink text-gold hover:bg-brand-deep"
                      : "border border-gold/50 text-gold hover:bg-gold hover:text-brand-ink"
                  } ${i === 2 ? "mt-auto pt-4" : ""}`}
                >
                  {t.id === "imperial" ? "Request invitation" : "Enquire"}
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-12 text-center text-[11px] tracking-[0.3em] text-white/40 uppercase">
            Imperial Council limited to 100 names worldwide · reviewed annually
          </p>
        </Reveal>
      </div>
    </section>
  );
}
