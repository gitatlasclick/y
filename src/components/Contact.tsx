import type { ReactNode } from "react";
import { SOCIALS } from "../data";
import { useLockBody } from "./ui";

export const SOCIAL_ICONS: Record<string, ReactNode> = {
  kakao: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M12 3C6.5 3 2 6.6 2 11c0 2.9 1.9 5.4 4.8 6.8l-1.2 4.3c-.1.4.3.7.6.5l4.9-3.2c.3 0 .6.1.9.1 5.5 0 10-3.6 10-8.5S17.5 3 12 3zM7.7 13.6H6.3v-4H5.2V8.4h3.6v1.2H7.7v4zm4.9 0h-1.2l-.4-1.2H9.3l-.4 1.2H7.7l2.1-5.2h1.6l1.2 5.2zm-2-2.3l-.6-1.9-.6 1.9h1.2zm5.1 2.3h-2.6V8.4h2.6v1.2h-1.4v.9h1.3v1.1h-1.3v.9h1.4v1.1zm3.5-.4l-1-.5.9-1.3-1.5-2.9h1.4l.8 1.7.7-1.7h1.4l-1.5 3 1.2 1.7h-1.4l-1-1z" />
    </svg>
  ),
  naver: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M4 4h4.5L14 11.5V4h4.5v16H14l-5.5-7.5V20H4V4z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M22 12s0-3.3-.4-4.9a2.6 2.6 0 0 0-1.8-1.8C18.2 4.8 12 4.8 12 4.8s-6.2 0-7.8.5A2.6 2.6 0 0 0 2.4 7.1C2 8.7 2 12 2 12s0 3.3.4 4.9a2.6 2.6 0 0 0 1.8 1.8c1.6.5 7.8.5 7.8.5s6.2 0 7.8-.5a2.6 2.6 0 0 0 1.8-1.8C22 15.3 22 12 22 12zM10 15.2V8.8L15.5 12 10 15.2z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z" />
      <path d="M8.8 8.5c.3-.7.7-.7 1-.7h.6l.5 1.4-.7.9c.5 1.2 1.5 2.2 2.7 2.7l.9-.7 1.4.5v.6c0 .3 0 .7-.7 1-1.9.7-5.4-1.8-5.7-5.7z" fill="currentColor" stroke="none" />
    </svg>
  ),
  wechat: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M9 3C4.9 3 1.5 5.8 1.5 9.3c0 1.9 1 3.6 2.6 4.7l-.7 2.4 2.8-1.4c.9.3 1.8.4 2.8.4h.5a5.6 5.6 0 0 1-.3-1.8c0-3.2 3.1-5.8 6.9-5.8h.4C15.9 5.2 12.8 3 9 3zm-2.6 4a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8zm5.2 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" />
      <path d="M22.5 13.6c0-2.9-2.8-5.2-6.2-5.2s-6.2 2.3-6.2 5.2 2.8 5.2 6.2 5.2c.7 0 1.4-.1 2-.3l2.4 1.2-.6-2.1c1.4-1 2.4-2.4 2.4-4zm-8.3-.9a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6zm4.2 0a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z" />
    </svg>
  ),
  line: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 3.5c-5 0-9 3.2-9 7.2 0 2.2 1.2 4.1 3.1 5.4-.1.6-.5 1.9-1.3 2.7 0 0 2.6-.2 4.3-1.4.9.2 1.9.4 2.9.4 5 0 9-3.2 9-7.1s-4-7.2-9-7.2z" />
      <path d="M6.5 9.2v4.8M6.5 14h2.8M14.6 9.2v4.8h2.9M11.5 9.2v4.8" strokeWidth="1.4" />
    </svg>
  ),
  telegram: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M21.5 4.6L2.9 11.8c-.9.4-.9 1.6.1 1.9l4.6 1.4 1.8 5.4c.3.8 1.3 1 1.9.4l2.6-2.5 4.6 3.4c.7.5 1.7.1 1.9-.8l2.6-14.7c.2-1-.7-1.8-1.5-1.7zM9.4 14.5l8.2-7.4c.3-.2.6.2.4.4l-6.8 6.4-.3 3.2-1.5-2.6z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  ),
};

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useLockBody(open);

  return (
    <div
      className={`fixed inset-0 z-[95] transition-all duration-500 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Contact channels"
    >
      <div className="absolute inset-0 bg-brand-ink/85 backdrop-blur-sm" onClick={onClose} />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col overflow-hidden rounded-l-[2rem] bg-white transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="relative overflow-hidden bg-brand px-8 py-9 text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(212,180,140,0.25), transparent 65%)" }}
          />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="font-kr text-sm tracking-[0.3em] text-gold">연락처 · 컨시어지</p>
              <h3 className="mt-3 font-display text-4xl font-medium">
                Contact <span className="italic text-gold">Channels</span>
              </h3>
              <p className="mt-2 text-[11px] tracking-[0.26em] text-white/60 uppercase">
                Consult · reserve · 24/7 surgical concierge
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close contact panel"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-brand"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="1.2"><path d="M2 2l12 12M14 2L2 14" /></svg>
            </button>
          </div>
        </header>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          {SOCIALS.map((s, i) => (
            <a
              key={s.key}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`group flex items-center gap-4 rounded-[1.2rem] px-4 py-[15px] transition-all duration-500 hover:bg-brand-tint ${
                open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${140 + i * 55}ms` : "0ms" }}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-deep/50 text-brand-deep transition-all duration-500 group-hover:border-brand group-hover:bg-brand group-hover:text-gold">
                {SOCIAL_ICONS[s.key]}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2.5">
                  <span className="font-display text-xl text-brand-ink">{s.name}</span>
                  <span className="truncate text-[12px] text-ink/45">{s.handle}</span>
                </span>
                <span className="mt-1 inline-block rounded-full border border-gold/50 bg-gold-pale px-2.5 py-0.5 text-[9px] font-medium tracking-[0.2em] text-gold-deep uppercase">
                  {s.tag}
                </span>
              </span>
              <svg width="16" height="9" viewBox="0 0 16 9" fill="none" stroke="currentColor" strokeWidth="1.3" className="text-brand opacity-0 transition-all duration-400 group-hover:translate-x-1 group-hover:opacity-100">
                <path d="M0 4.5h14M10.5 1l3.5 3.5L10.5 8" />
              </svg>
            </a>
          ))}
        </nav>

        <footer className="border-t border-brand/15 bg-paper px-8 py-5">
          <p className="text-[10px] leading-relaxed tracking-[0.22em] text-ink/45 uppercase">
            KakaoTalk & Telegram answered within minutes · 한국어 English 中文 日本語
          </p>
        </footer>
      </aside>
    </div>
  );
}

export function ContactFab({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open contact channels"
      className="group fixed bottom-6 right-6 z-[85] flex items-center gap-3 rounded-full border border-gold/70 bg-brand py-3 pl-4 pr-5 text-white shadow-[0_18px_50px_rgba(22,48,31,0.4)] transition-all duration-500 hover:bg-brand-ink md:bottom-8 md:right-8"
      data-hover
    >
      <span className="relative flex h-9 w-9 items-center justify-center">
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-gold/40 animate-pulse-ring" />
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#D4B48C" strokeWidth="1.6">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </span>
      <span className="hidden text-[11px] font-semibold tracking-[0.28em] uppercase sm:block">Contact Us</span>
    </button>
  );
}
