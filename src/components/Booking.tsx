import { useState } from "react";
import { PROCEDURES, TIERS } from "../data";
import { Eyebrow, Reveal } from "./ui";

const TIMES = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00"];

export default function Booking({
  service,
  onServiceChange,
  onContact,
}: {
  service: string;
  onServiceChange: (id: string) => void;
  onContact: () => void;
}) {
  const [form, setForm] = useState({ name: "", contact: "", date: "", time: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [refCode, setRefCode] = useState("");

  const options = [
    ...PROCEDURES.map((p) => ({ value: p.id, label: `${p.name} — ${p.price}` })),
    ...TIERS.map((t) => ({ value: t.id, label: `${t.name} Program — ${t.price}` })),
  ];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // POST to the Django REST endpoint backed by SQLite; falls back to local confirmation.
    try {
      await fetch("/api/reservations/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service }),
      });
    } catch {
      /* static preview — concierge confirms manually */
    }
    await new Promise((r) => setTimeout(r, 1100));
    setRefCode(`YEON-${Math.floor(1000 + Math.random() * 9000)}`);
    setStatus("done");
  };

  return (
    <section id="booking" className="relative overflow-hidden bg-white py-28 lg:py-40">
      <span
        aria-hidden="true"
        className="text-stroke-brand pointer-events-none absolute -left-8 top-8 hidden select-none font-display text-[240px] italic leading-none opacity-60 xl:block"
      >
        예약
      </span>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid overflow-hidden rounded-[2.5rem] border border-brand/15 shadow-[0_40px_120px_rgba(22,48,31,0.12)] lg:grid-cols-12">
          {/* concierge panel */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-brand p-10 text-white md:p-14 lg:col-span-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 h-[440px] w-[440px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(212,180,140,0.2), transparent 62%)" }}
            />
            <div>
              <Eyebrow kr="예약" light>Concierge Consultation</Eyebrow>
              <h2 className="mt-8 font-display text-5xl font-medium leading-[1.04] md:text-6xl">
                <Reveal mask><span className="block">An hour,</span></Reveal>
                <Reveal mask delay={120}><span className="block italic text-gold">kept for you.</span></Reveal>
              </h2>
              <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-white/70">
                Send your request and a personal concierge replies within two hours — in Korean,
                English, 中文 or 日本語. Privé members are answered within minutes, any hour.
              </p>
            </div>
            <div className="relative mt-12 space-y-5 text-[13px] tracking-[0.14em] text-white/80 uppercase">
              <div className="flex items-center gap-4">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D4B48C" strokeWidth="1.4"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
                Tue – Sun · 10:00 – 21:00 KST
              </div>
              <div className="flex items-center gap-4">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D4B48C" strokeWidth="1.4"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></svg>
                4F, 128 Apgujeong-ro, Gangnam-gu, Seoul
              </div>
              <div className="flex items-center gap-4">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#D4B48C" strokeWidth="1.4"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
                +82 2 516 8890 · prive@yeon-surgery.kr
              </div>
            </div>
          </div>

          {/* form */}
          <div className="bg-white p-10 md:p-14 lg:col-span-7">
            {status === "done" ? (
              <div className="flex h-full flex-col items-start justify-center animate-fade-in">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-gold-pale">
                  <svg width="26" height="20" viewBox="0 0 26 20" fill="none" stroke="#2D5A3D" strokeWidth="1.8"><path d="M2 10.5L9.5 18 24 2" /></svg>
                </span>
                <h3 className="mt-8 font-display text-5xl font-medium text-brand-ink">
                  Request received<span className="text-gold-deep">.</span>
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/60">
                  Your reference is <span className="font-display text-xl italic text-brand-deep">{refCode}</span>.
                  Our concierge will confirm on your preferred channel within two hours.
                </p>
                <div className="mt-9 flex flex-wrap gap-4">
                  <button
                    onClick={onContact}
                    className="flex items-center gap-3 rounded-full bg-brand px-7 py-3.5 text-[11px] font-semibold tracking-[0.28em] text-white uppercase transition-colors duration-400 hover:bg-brand-ink"
                  >
                    Continue on KakaoTalk
                  </button>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setForm({ name: "", contact: "", date: "", time: "", notes: "" });
                    }}
                    className="nav-link px-2 py-3.5 text-[11px] font-medium tracking-[0.28em] text-brand-deep uppercase"
                  >
                    Make another request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-x-6 gap-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bk-name" className="mb-2 block text-[10px] font-medium tracking-[0.34em] text-ink/50 uppercase">Full name</label>
                    <input id="bk-name" required className="field" placeholder="Kim Seo-yeon" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="bk-contact" className="mb-2 block text-[10px] font-medium tracking-[0.34em] text-ink/50 uppercase">Phone or Kakao ID</label>
                    <input id="bk-contact" required className="field" placeholder="+82 10 …" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label htmlFor="bk-service" className="mb-2 block text-[10px] font-medium tracking-[0.34em] text-ink/50 uppercase">Procedure or program</label>
                  <select id="bk-service" required className="field" value={service} onChange={(e) => onServiceChange(e.target.value)}>
                    {options.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bk-date" className="mb-2 block text-[10px] font-medium tracking-[0.34em] text-ink/50 uppercase">Preferred date</label>
                    <input id="bk-date" type="date" required className="field" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  </div>
                  <div>
                    <label htmlFor="bk-time" className="mb-2 block text-[10px] font-medium tracking-[0.34em] text-ink/50 uppercase">Preferred time</label>
                    <select id="bk-time" required className="field" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
                      <option value="" disabled>Select…</option>
                      {TIMES.map((t) => (
                        <option key={t} value={t}>{t} KST</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="bk-notes" className="mb-2 block text-[10px] font-medium tracking-[0.34em] text-ink/50 uppercase">
                    Concerns & goals <span className="text-ink/30">(optional)</span>
                  </label>
                  <textarea id="bk-notes" rows={3} className="field resize-none" placeholder="What you would like refined, previous procedures, photos available…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
                <div className="mt-2 flex flex-wrap items-center justify-between gap-5">
                  <p className="max-w-xs text-[11px] leading-relaxed tracking-wide text-ink/40">
                    No payment today. Your concierge confirms availability; payment happens at
                    the clinic or via secure link.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group flex items-center gap-4 rounded-full bg-gold px-10 py-4 text-[12px] font-semibold tracking-[0.3em] text-brand-ink uppercase transition-all duration-400 hover:bg-brand-ink hover:text-gold disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Request Consultation"}
                    <svg width="18" height="9" viewBox="0 0 18 9" fill="none" stroke="currentColor" strokeWidth="1.3" className="transition-transform duration-500 group-hover:translate-x-1.5">
                      <path d="M0 4.5h16M12.5 1l3.5 3.5L12.5 8" />
                    </svg>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <Reveal delay={150}>
          <p className="mt-8 text-center text-[10px] tracking-[0.3em] text-ink/35 uppercase">
            Reservation engine · React + Three.js front · Django REST + SQLite back
          </p>
        </Reveal>
      </div>
    </section>
  );
}
