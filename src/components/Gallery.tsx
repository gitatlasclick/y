import { useEffect, useState } from "react";
import { IMG, PRESS, SURGEONS, TESTIMONIALS } from "../data";
import { Eyebrow, Reveal } from "./ui";

const CARDS = [
  { img: IMG.consult, cap: "3D consultation theatre — planning in progress", pos: "lg:absolute lg:left-0 lg:top-6 lg:w-[30%] lg:-rotate-3", ratio: "aspect-[4/3]" },
  { img: IMG.lobby, cap: "The lobby — marble, emerald lacquer and brass", pos: "lg:absolute lg:left-[26%] lg:top-40 lg:w-[38%] lg:rotate-2 lg:z-10", ratio: "aspect-[4/3]" },
  { img: IMG.portrait, cap: "Result — V-line contouring, week 8", pos: "lg:absolute lg:right-0 lg:top-0 lg:w-[30%] lg:rotate-3", ratio: "aspect-[3/4]" },
  { img: IMG.suite, cap: "Privé recovery suite, first night", pos: "lg:absolute lg:left-[8%] lg:bottom-0 lg:w-[28%] lg:rotate-2", ratio: "aspect-[3/4]" },
  { img: IMG.makeup, cap: "Result — signature rhinoplasty, week 6", pos: "lg:absolute lg:left-[40%] lg:bottom-6 lg:w-[32%] lg:-rotate-2", ratio: "aspect-[3/4]" },
  { img: IMG.serum, cap: "Scar-management protocol, drawn to order", pos: "lg:absolute lg:right-0 lg:bottom-16 lg:w-[26%] lg:rotate-6", ratio: "aspect-[3/4]" },
];

function Voices() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 6200);
    return () => clearInterval(t);
  }, []);
  const q = TESTIMONIALS[idx];
  return (
    <div className="relative mx-auto mt-28 max-w-4xl text-center lg:mt-40">
      <span aria-hidden="true" className="font-display text-8xl italic leading-none text-gold/50">"</span>
      <div className="relative min-h-[230px] md:min-h-[190px]">
        <blockquote key={idx} className="animate-fade-in">
          <p className="font-display text-2xl italic leading-relaxed text-brand-ink md:text-[32px] md:leading-snug">
            {q.quote}
          </p>
          <footer className="mt-8">
            <p className="text-[13px] font-medium tracking-[0.3em] text-brand-deep uppercase">{q.name}</p>
            <p className="mt-1 text-[11px] tracking-[0.24em] text-ink/45 uppercase">{q.role}</p>
          </footer>
        </blockquote>
      </div>
      <div className="mt-10 flex items-center justify-center gap-5">
        <button
          onClick={() => setIdx((idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
          aria-label="Previous testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/25 text-brand transition-all hover:bg-brand hover:text-white"
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M14 4H2M5 1L2 4l3 3" /></svg>
        </button>
        <div className="flex gap-2.5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === idx ? "w-8 bg-gold-deep" : "w-1.5 bg-brand/25 hover:bg-brand/50"}`}
            />
          ))}
        </div>
        <button
          onClick={() => setIdx((idx + 1) % TESTIMONIALS.length)}
          aria-label="Next testimonial"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/25 text-brand transition-all hover:bg-brand hover:text-white"
        >
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M0 4h12M9 1l3 3-3 3" /></svg>
        </button>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="council" className="relative overflow-hidden bg-white py-28 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        {/* The Surgical Council */}
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="group relative mx-auto max-w-[560px]">
                <div className="overflow-hidden rounded-t-full rounded-b-[2.5rem] border-[6px] border-brand-tint shadow-[0_36px_110px_rgba(22,48,31,0.22)]">
                  <img
                    src={IMG.surgeons}
                    alt="The YEON surgical council"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                  />
                </div>
                <div className="absolute -bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-gold/50 bg-white px-6 py-3 shadow-[0_18px_50px_rgba(22,48,31,0.18)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8976E" strokeWidth="1.5"><path d="M12 3l2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3z" /></svg>
                  <span className="text-[10px] font-medium tracking-[0.28em] text-brand-ink uppercase">62 years of combined practice</span>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal><Eyebrow kr="의료진">The Surgical Council</Eyebrow></Reveal>
            <h2 className="mt-8 font-display text-5xl font-medium leading-[1.04] text-brand-ink md:text-6xl">
              <Reveal mask delay={100}><span className="block">Three names.</span></Reveal>
              <Reveal mask delay={220}><span className="block">One <em className="italic text-brand">signature</em>.</span></Reveal>
            </h2>
            <Reveal delay={300}>
              <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-ink/65">
                No rotating roster, no visiting hands. Three surgeons built YEON, and each
                operates only within their discipline — so the person you consult is the person
                holding the instrument.
              </p>
            </Reveal>
            <div className="mt-10 space-y-4">
              {SURGEONS.map((s, i) => (
                <Reveal key={s.name} delay={380 + i * 110}>
                  <article className="group flex items-start gap-5 rounded-[1.6rem] border border-brand/12 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_24px_60px_rgba(22,48,31,0.1)]">
                    <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-gold-pale px-4 py-3.5 font-kr text-lg text-brand-deep">
                      {s.kr.charAt(0)}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-brand-ink">
                        {s.name}
                        <span className="ml-3 font-kr text-sm text-gold-deep">{s.kr}</span>
                      </h3>
                      <p className="mt-0.5 text-[11px] font-medium tracking-[0.24em] text-brand uppercase">{s.role}</p>
                      <ul className="mt-3 space-y-1">
                        {s.creds.map((c) => (
                          <li key={c} className="flex items-center gap-2.5 text-[13px] text-ink/55">
                            <span className="h-1 w-1 rounded-full bg-gold-deep" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* The rooms */}
        <div className="mt-32 lg:mt-44">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal><Eyebrow kr="공간">The Rooms</Eyebrow></Reveal>
              <h2 className="mt-8 font-display text-5xl font-medium leading-[1.04] text-brand-ink md:text-6xl">
                <Reveal mask delay={100}><span className="block">A hospital that</span></Reveal>
                <Reveal mask delay={220}><span className="block">feels like a <em className="italic text-brand">hotel</em>.</span></Reveal>
              </h2>
            </div>
            <Reveal delay={300} className="lg:col-span-5">
              <p className="max-w-md text-[15px] leading-relaxed text-ink/60 lg:ml-auto">
                Operating standards behind the walls; marble, orchids and silence in front of
                them. Six postcards from four floors on Apgujeong-ro.
              </p>
            </Reveal>
          </div>

          <div className="relative mt-20 grid grid-cols-2 gap-5 md:gap-7 lg:block lg:h-[1000px]">
            {CARDS.map((c, i) => (
              <Reveal key={c.cap} delay={i * 90} className={`postcard-wrap ${c.pos}`}>
                <figure
                  className={`group relative rounded-[1.6rem] bg-white p-3 pb-5 shadow-[0_18px_50px_rgba(22,48,31,0.14)] transition-all duration-700 hover:rotate-0 hover:scale-[1.05] hover:shadow-[0_30px_80px_rgba(22,48,31,0.28)] ${c.pos.includes("rotate-3") ? "lg:rotate-3" : ""} ${c.pos.includes("-rotate-3") ? "lg:-rotate-3" : ""} ${c.pos.includes("rotate-2") ? "lg:rotate-2" : ""} ${c.pos.includes("-rotate-2") ? "lg:-rotate-2" : ""} ${c.pos.includes("rotate-6") ? "lg:rotate-6" : ""}`}
                  data-hover
                >
                  <div className={`overflow-hidden rounded-[1.2rem] ${c.ratio}`}>
                    <img src={c.img} alt={c.cap} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1600ms] group-hover:scale-110" />
                  </div>
                  <figcaption className="mt-3 flex items-center justify-between gap-2 px-1">
                    <span className="font-display text-[15px] italic text-brand-deep">{c.cap}</span>
                    <span className="font-kr text-xs text-gold-deep">연</span>
                  </figcaption>
                  <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-gold-deep/60 bg-gold shadow" />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <Voices />

        <Reveal delay={100}>
          <div className="mt-28 rounded-[2rem] border border-brand/12 bg-brand-tint/50 py-10 lg:mt-40">
            <p className="text-center text-[10px] tracking-[0.5em] text-ink/40 uppercase">As featured in</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-14 gap-y-5 px-6">
              {PRESS.map((p) => (
                <span key={p} className="font-display text-xl tracking-[0.18em] text-ink/30 transition-all duration-500 hover:text-brand-deep md:text-2xl">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
