import { useEffect, useState } from "react";
import { NAV } from "../data";
import { useLockBody } from "./ui";

export default function Header({ onContact }: { onContact: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  useLockBody(open);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80]">
        <div
          className="absolute left-0 top-0 z-10 h-[2px] w-full origin-left bg-gold-deep"
          style={{ transform: `scaleX(${progress})` }}
        />
        <div
          className={`hidden items-center justify-between bg-brand-ink px-6 py-2 text-[11px] tracking-[0.22em] text-white/70 uppercase transition-all duration-500 lg:flex ${
            scrolled ? "h-0 overflow-hidden py-0 opacity-0" : "opacity-100"
          }`}
        >
          <span>Concierge 24/7 · +82 2 516 8890</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            128 Apgujeong-ro, Gangnam-gu, Seoul
          </span>
        </div>

        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "border-b border-gold/25 bg-white/92 shadow-[0_10px_40px_rgba(22,48,31,0.07)] backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
            <a href="#top" className="group flex items-baseline gap-2.5" aria-label="YEON Plastic Surgery home">
              <span className="font-display text-[30px] leading-none font-semibold tracking-[0.14em] text-brand-deep">YEON</span>
              <span className="font-kr text-lg leading-none text-gold-deep transition-transform duration-500 group-hover:-translate-y-0.5">연</span>
              <span className="ml-1 hidden text-[9px] font-medium tracking-[0.4em] text-ink/45 uppercase sm:block">
                Plastic Surgery
              </span>
            </a>

            <nav className="hidden items-center gap-9 lg:flex">
              {NAV.slice(0, 4).map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="nav-link text-[12px] font-medium tracking-[0.28em] text-ink/75 uppercase transition-colors hover:text-brand-deep"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={onContact}
                className="hidden items-center gap-2 rounded-full border border-brand/30 px-5 py-2.5 text-[11px] font-medium tracking-[0.28em] text-brand-deep uppercase transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white md:flex"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Contact
              </button>
              <a
                href="#booking"
                className="hidden items-center gap-3 rounded-full bg-gold px-6 py-2.5 text-[11px] font-semibold tracking-[0.28em] text-brand-ink uppercase transition-all duration-300 hover:bg-brand-ink hover:text-gold sm:flex"
              >
                Reserve
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M0 4h12M9 1l3 3-3 3" />
                </svg>
              </a>
              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="flex h-11 w-11 flex-col items-center justify-center gap-[7px] rounded-full border border-brand/25 lg:hidden"
              >
                <span className="block h-px w-5 bg-brand-deep" />
                <span className="block h-px w-5 bg-brand-deep" />
                <span className="block h-px w-3.5 self-center bg-gold-deep" style={{ marginLeft: "6px" }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col bg-brand-ink transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <span className="font-display text-2xl font-semibold tracking-[0.14em] text-white">
            YEON <span className="font-kr text-lg text-gold">연</span>
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.2"><path d="M2 2l12 12M14 2L2 14" /></svg>
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`group flex items-baseline gap-4 border-b border-white/10 py-4 transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              <span className="font-display text-sm italic text-gold">0{i + 1}</span>
              <span className="font-display text-4xl text-white transition-colors group-hover:text-gold">{n.label}</span>
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onContact();
            }}
            className="group mt-6 flex items-baseline gap-4 py-2 text-left"
          >
            <span className="font-display text-sm italic text-gold">✦</span>
            <span className="font-display text-4xl text-gold transition-colors group-hover:text-white">Contact Channels</span>
          </button>
        </nav>
        <p className="px-8 pb-10 text-[10px] tracking-[0.4em] text-white/40 uppercase">Gangnam · Seoul · Est. 2007</p>
      </div>
    </>
  );
}
