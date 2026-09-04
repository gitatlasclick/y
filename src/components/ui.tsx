import { Component, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ---------------- hooks ---------------- */

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(threshold = 0.16) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function useLockBody(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}

/* ---------------- error boundary (WebGL safety) ---------------- */

export class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/* ---------------- reveal ---------------- */

export function Reveal({
  children,
  className = "",
  delay = 0,
  mask = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  mask?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const style = { "--rv-delay": `${delay}ms` } as CSSProperties;
  if (mask) {
    return (
      <div ref={ref} style={style} className={`rv-mask ${inView ? "is-in" : ""} ${className}`}>
        <span className="rv-mask-inner">{children}</span>
      </div>
    );
  }
  return (
    <div ref={ref} style={style} className={`rv ${inView ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

/* ---------------- eyebrow ---------------- */

export function Eyebrow({ kr, children, light = false }: { kr: string; children: ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className="hairline-gold w-12 shrink-0" />
      <span className={`font-kr text-[13px] tracking-[0.35em] ${light ? "text-gold" : "text-gold-deep"}`}>{kr}</span>
      <span className={`text-[11px] font-medium uppercase tracking-[0.42em] ${light ? "text-white/70" : "text-ink/50"}`}>
        {children}
      </span>
    </div>
  );
}

/* ---------------- counter ---------------- */

export function Counter({ to, suffix = "", duration = 1600, className = "" }: { to: number; suffix?: string; duration?: number; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const reduced = usePrefersReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);
  return (
    <span ref={ref} className={className}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------------- marquee ---------------- */

export function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = [...items, ...items, ...items];
  return (
    <div
      className={`overflow-hidden border-y py-4 select-none ${dark ? "border-gold/20 bg-brand-ink" : "border-gold/25 bg-brand"}`}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-xl italic tracking-wide text-gold md:text-2xl">{item}</span>
            <svg width="10" height="10" viewBox="0 0 10 10" className="text-gold-deep">
              <path d="M5 0l1.2 3.8L10 5 6.2 6.2 5 10 3.8 6.2 0 5l3.8-1.2z" fill="currentColor" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- noise overlay ---------------- */

export function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] opacity-[0.05] mix-blend-multiply"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  );
}

/* ---------------- custom cursor ---------------- */

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("has-cursor");
    let x = -100, y = -100, rx = -100, ry = -100;
    let hovered = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as HTMLElement;
      hovered = !!t.closest("a, button, input, select, textarea, [data-hover]");
    };

    const loop = () => {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      if (dotRef.current) dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) scale(${hovered ? 2.1 : 1})`;
        ringRef.current.style.borderColor = hovered ? "rgba(212,180,140,0.9)" : "rgba(184,151,110,0.45)";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[110] -ml-[22px] -mt-[22px] h-11 w-11 rounded-full border transition-[border-color] duration-300"
        style={{ borderColor: "rgba(184,151,110,0.45)" }}
      />
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[110] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold" />
    </>
  );
}

/* ---------------- preloader ---------------- */

export function Preloader({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const t1 = setTimeout(() => setLeaving(true), 1650);
    const t2 = setTimeout(() => onDone(), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <div
      className={`fixed inset-0 z-[120] flex flex-col items-center justify-center bg-brand-ink transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
      aria-hidden="true"
    >
      <span className="font-kr text-8xl text-gold">연</span>
      <span className="mt-6 font-display text-2xl tracking-[0.5em] text-white uppercase">Yeon Surgery</span>
      <div className="mt-8 h-px w-56 overflow-hidden bg-white/15">
        <div className="loader-bar h-full w-full bg-gold" />
      </div>
      <span className="mt-4 text-[10px] tracking-[0.5em] text-white/40 uppercase">Gangnam · Seoul</span>
    </div>
  );
}
