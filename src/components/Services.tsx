import { useState } from "react";
import { PROCEDURES, type Procedure } from "../data";
import { Eyebrow, Reveal } from "./ui";

/* ---------- anatomical diagram ---------- */

function FaceDiagram({ zone }: { zone: Procedure["zone"] }) {
  return (
    <svg viewBox="0 0 320 400" className="h-full w-full" fill="none" aria-hidden="true">
      <g stroke="#2D5A3D" strokeWidth="0.5" opacity="0.1">
        {[60, 120, 180, 240, 300].map((y) => (
          <line key={y} x1="20" y1={y} x2="300" y2={y} />
        ))}
        {[70, 130, 190, 250].map((x) => (
          <line key={x} x1={x} y1="20" x2={x} y2="340" />
        ))}
      </g>
      <path
        d="M150 34 C190 38 212 68 208 98 C206 112 200 118 200 126 C200 132 202 138 208 146 C216 158 222 164 222 170 C222 178 214 182 206 183 C201 184 199 187 202 192 C207 199 208 206 202 210 C198 213 198 217 202 221 C208 227 209 236 202 242 C195 248 194 254 197 262 C200 274 194 284 182 290 C164 299 138 302 120 298"
        stroke="#2D5A3D"
        strokeWidth="1.8"
      />
      <path d="M198 150 C186 178 178 204 178 232 C178 258 166 280 146 292" stroke="#2D5A3D" strokeWidth="1" strokeDasharray="3 6" opacity="0.5" />
      <path d="M186 114 C191 111 197 111 202 114" stroke="#2D5A3D" strokeWidth="1.2" opacity="0.7" />
      <path d="M150 34 C128 36 112 52 106 74 C100 98 104 130 96 160" stroke="#2D5A3D" strokeWidth="1" opacity="0.35" />

      {zone.kind === "face" ? (
        <g key={`${zone.cx}-${zone.cy}`} className="animate-fade-in">
          <circle cx={zone.cx} cy={zone.cy} r={zone.r} stroke="#D4B48C" strokeWidth="1.4" strokeDasharray="4 5" />
          <circle cx={zone.cx} cy={zone.cy} r={zone.r * 0.45} stroke="#D4B48C" strokeWidth="0.8" opacity="0.55" />
          <circle cx={zone.cx} cy={zone.cy} r="3.5" fill="#B8976E" />
          <line x1={zone.cx} y1={zone.cy} x2={zone.cx + zone.r + 26} y2={zone.cy - zone.r * 0.5} stroke="#B8976E" strokeWidth="1" />
          <circle cx={zone.cx + zone.r + 26} cy={zone.cy - zone.r * 0.5} r="2.5" fill="#B8976E" />
        </g>
      ) : (
        <g className="animate-fade-in">
          <path d="M70 70 C104 76 122 104 122 138 C122 176 100 196 96 228 C94 252 104 274 126 290" stroke="#2D5A3D" strokeWidth="1.8" />
          <path d="M250 70 C216 76 198 104 198 138 C198 176 220 196 224 228 C226 252 216 274 194 290" stroke="#2D5A3D" strokeWidth="1.8" />
          <path d="M96 205 C120 196 200 196 224 205" stroke="#D4B48C" strokeWidth="1.4" strokeDasharray="4 5" />
          <path d="M100 240 C124 232 196 232 220 240" stroke="#D4B48C" strokeWidth="1.4" strokeDasharray="4 5" />
          <circle cx="160" cy="220" r="30" stroke="#D4B48C" strokeWidth="1.4" strokeDasharray="4 5" />
          <circle cx="160" cy="220" r="3.5" fill="#B8976E" />
        </g>
      )}
    </svg>
  );
}

export default function Services({ onReserve }: { onReserve: (id: string) => void }) {
  const [activeId, setActiveId] = useState(PROCEDURES[0].id);
  const active = PROCEDURES.find((p) => p.id === activeId) ?? PROCEDURES[0];

  return (
    <section id="procedures" className="relative overflow-hidden bg-paper py-28 lg:py-40">
      <span
        aria-hidden="true"
        className="text-stroke-gold pointer-events-none absolute -left-8 bottom-8 hidden select-none font-display text-[240px] italic leading-none opacity-60 xl:block"
      >
        수술
      </span>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow kr="수술 안내">Signature Procedures</Eyebrow></Reveal>
            <h2 className="mt-8 font-display text-5xl font-medium leading-[1.04] text-brand-ink md:text-6xl">
              <Reveal mask delay={100}><span className="block">Six ways to meet</span></Reveal>
              <Reveal mask delay={220}><span className="block">your <em className="italic text-brand">own face</em>.</span></Reveal>
            </h2>
          </div>
          <Reveal delay={300} className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-relaxed text-ink/60 lg:ml-auto">
              Select a procedure to open its surgical brief — duration, anaesthesia, recovery
              and exactly what the fee includes. Every plan begins with a complimentary 3D
              consultation.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* tabs */}
          <div className="flex gap-3 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0">
            {PROCEDURES.map((p) => {
              const on = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className={`group flex min-w-[240px] items-center gap-4 rounded-[1.4rem] border px-5 py-4 text-left transition-all duration-500 lg:min-w-0 ${
                    on
                      ? "border-brand bg-brand text-white shadow-[0_18px_50px_rgba(45,90,61,0.28)]"
                      : "border-brand/15 bg-white text-brand-ink hover:-translate-y-0.5 hover:border-gold/70 hover:shadow-[0_14px_40px_rgba(22,48,31,0.08)]"
                  }`}
                  aria-pressed={on}
                >
                  <span className={`font-display text-lg italic ${on ? "text-gold" : "text-gold-deep"}`}>{p.no}</span>
                  <span className="flex-1">
                    <span className="block font-display text-xl leading-tight">{p.name}</span>
                    <span className={`mt-0.5 block text-[10px] tracking-[0.22em] uppercase ${on ? "text-white/60" : "text-ink/40"}`}>
                      {p.tag} · {p.kr}
                    </span>
                  </span>
                  <svg width="15" height="9" viewBox="0 0 15 9" fill="none" stroke="currentColor" strokeWidth="1.3" className={`shrink-0 transition-all duration-500 ${on ? "translate-x-0 text-gold opacity-100" : "-translate-x-2 text-brand opacity-0"}`}>
                    <path d="M0 4.5h13M9.5 1l3.5 3.5L9.5 8" />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* detail panel */}
          <div className="lg:col-span-8">
            <div
              key={active.id}
              className="animate-fade-in overflow-hidden rounded-[2.25rem] border border-brand/15 bg-white shadow-[0_36px_100px_rgba(22,48,31,0.1)]"
            >
              <div className="grid md:grid-cols-12">
                <div className="relative flex items-center justify-center bg-brand-tint/70 p-8 md:col-span-5">
                  <div className="aspect-[4/5] w-full max-w-[300px]">
                    {active.img ? (
                      <img src={active.img} alt={active.name} className="h-full w-full rounded-[1.6rem] object-cover" loading="lazy" />
                    ) : (
                      <FaceDiagram zone={active.zone} />
                    )}
                  </div>
                  <span className="absolute left-6 top-6 rounded-full border border-gold/60 bg-white/85 px-4 py-1.5 text-[10px] font-medium tracking-[0.28em] text-gold-deep uppercase backdrop-blur-sm">
                    {active.tag}
                  </span>
                </div>

                <div className="p-8 md:col-span-7 md:p-12">
                  <p className="font-kr text-sm tracking-[0.3em] text-gold-deep">{active.kr}</p>
                  <h3 className="mt-2 font-display text-4xl font-medium leading-tight text-brand-ink md:text-5xl">{active.name}</h3>
                  <p className="mt-2 font-display text-lg italic text-brand">{active.tagline}</p>
                  <p className="mt-5 text-[15px] leading-relaxed text-ink/65">{active.desc}</p>

                  <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { l: "Duration", v: active.duration },
                      { l: "Anaesthesia", v: active.anesthesia },
                      { l: "Recovery", v: active.recovery },
                      { l: "From", v: active.price },
                    ].map((f) => (
                      <div key={f.l} className="rounded-[1.1rem] border border-brand/12 bg-brand-tint/60 px-4 py-3.5">
                        <p className="text-[9px] font-medium tracking-[0.24em] text-ink/45 uppercase">{f.l}</p>
                        <p className="mt-1 font-display text-lg leading-tight text-brand-deep">{f.v}</p>
                      </div>
                    ))}
                  </div>

                  <ul className="mt-7 space-y-2.5">
                    {active.includes.map((inc) => (
                      <li key={inc} className="flex items-start gap-3 text-[14px] text-ink/70">
                        <svg width="15" height="12" viewBox="0 0 15 12" fill="none" stroke="#B8976E" strokeWidth="1.6" className="mt-1 shrink-0">
                          <path d="M1 6.5L5 10.5 14 1" />
                        </svg>
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-wrap items-center gap-5">
                    <button
                      onClick={() => onReserve(active.id)}
                      className="group flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-[11px] font-semibold tracking-[0.26em] text-brand-ink uppercase transition-all duration-500 hover:bg-brand-ink hover:text-gold"
                    >
                      Reserve this procedure
                      <svg width="16" height="9" viewBox="0 0 16 9" fill="none" stroke="currentColor" strokeWidth="1.4" className="transition-transform duration-500 group-hover:translate-x-1.5">
                        <path d="M0 4.5h14M10.5 1l3.5 3.5L10.5 8" />
                      </svg>
                    </button>
                    <span className="font-display text-2xl text-brand-deep">{active.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Reveal delay={120}>
          <p className="mt-12 text-center text-[11px] tracking-[0.3em] text-ink/40 uppercase">
            All fees include 3D consultation · anaesthesia · theatre · first-year reviews · VAT
          </p>
        </Reveal>
      </div>
    </section>
  );
}
