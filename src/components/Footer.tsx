import { useState } from "react";
import { PROCEDURES, SOCIALS } from "../data";
import { SOCIAL_ICONS } from "./Contact";

const QUICK = [
  { label: "The Standard", href: "#standard" },
  { label: "Procedures", href: "#procedures" },
  { label: "Surgeons", href: "#council" },
  { label: "Privé Programs", href: "#vip" },
  { label: "Reserve", href: "#booking" },
];

export default function Footer({ onContact }: { onContact: () => void }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-brand-ink text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(700px 400px at 85% 0%, rgba(212,180,140,0.12), transparent 60%)" }}
      />

      <div className="relative mx-auto max-w-[1400px] px-5 pt-20 md:px-8">
        <div className="flex items-end justify-between gap-8 border-b border-white/10 pb-14">
          <div>
            <p className="font-display text-[16vw] leading-[0.85] font-semibold tracking-[0.08em] text-white/95 md:text-[11rem]">
              YEON<span className="text-gold">.</span>
            </p>
            <p className="mt-5 flex items-center gap-3 font-kr text-sm tracking-[0.4em] text-gold">
              연 성형외과 <span className="h-px w-10 bg-gold/50" /> GANGNAM · SEOUL
            </p>
          </div>
          <button
            onClick={onContact}
            className="group hidden shrink-0 flex-col items-center gap-3 self-center md:flex"
            aria-label="Open contact channels"
          >
            <span className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/50 transition-all duration-500 group-hover:bg-gold group-hover:text-brand-ink">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </span>
            <span className="text-[10px] tracking-[0.3em] text-white/60 uppercase group-hover:text-gold">All Channels</span>
          </button>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-display text-2xl italic text-gold">Facial architecture, practised with restraint.</p>
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-white/60">
              Three board-certified surgeons, one floor of private theatres, and a promise:
              your own face, refined — never replaced.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {["kakao", "instagram", "youtube", "telegram"].map((k) => {
                const s = SOCIALS.find((x) => x.key === k)!;
                return (
                  <a
                    key={k}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-400 hover:border-gold hover:bg-gold hover:text-brand-ink"
                  >
                    {SOCIAL_ICONS[k]}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-[10px] font-medium tracking-[0.4em] text-gold uppercase">Clinic</p>
            <ul className="mt-6 space-y-3.5">
              {QUICK.map((q) => (
                <li key={q.href}>
                  <a href={q.href} className="nav-link text-[13.5px] text-white/65 transition-colors hover:text-white">
                    {q.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] font-medium tracking-[0.4em] text-gold uppercase">Procedures</p>
            <ul className="mt-6 space-y-3.5">
              {PROCEDURES.map((p) => (
                <li key={p.id}>
                  <a href="#procedures" className="nav-link text-[13.5px] text-white/65 transition-colors hover:text-white">
                    {p.name} <span className="font-kr text-[11px] text-white/35">{p.kr}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[10px] font-medium tracking-[0.4em] text-gold uppercase">Concierge</p>
            <address className="mt-6 space-y-3.5 text-[13.5px] not-italic leading-relaxed text-white/65">
              <p>128 Apgujeong-ro, Gangnam-gu<br />Seoul 06012, Republic of Korea</p>
              <p>Tue – Sun · 10:00 – 21:00 KST</p>
              <p>
                <a href="tel:+8225168890" className="transition-colors hover:text-gold">+82 2 516 8890</a><br />
                <a href="mailto:prive@yeon-surgery.kr" className="transition-colors hover:text-gold">prive@yeon-surgery.kr</a>
              </p>
            </address>
            <form
              className="mt-7"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSubscribed(true);
              }}
            >
              <p className="text-[10px] tracking-[0.3em] text-white/45 uppercase">Quiet letters, twice a season</p>
              <div className="mt-3 flex items-center gap-2 rounded-full border border-white/20 bg-white/5 p-1.5 pl-5 transition-colors focus-within:border-gold">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-transparent text-[13px] text-white placeholder:text-white/35 outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-gold px-5 py-2.5 text-[10px] font-semibold tracking-[0.24em] text-brand-ink uppercase transition-all duration-400 hover:bg-white"
                >
                  {subscribed ? "Sealed ✦" : "Join"}
                </button>
              </div>
              {subscribed && (
                <p className="mt-2.5 animate-fade-in text-[11px] tracking-[0.2em] text-gold uppercase">
                  Welcome to the inner circle.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-7 text-[10.5px] tracking-[0.2em] text-white/40 uppercase">
          <p>© 2026 YEON Plastic Surgery · 대표 한재현 · 사업자등록 211-88-01907</p>
          <div className="flex items-center gap-6">
            <a href="#top" className="transition-colors hover:text-gold">Privacy</a>
            <a href="#top" className="transition-colors hover:text-gold">Consent</a>
            <a
              href="#top"
              className="flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-2.5 transition-all duration-400 hover:border-gold hover:text-gold"
            >
              Back to top
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M5 11V1M1 4.5L5 1l4 3.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
