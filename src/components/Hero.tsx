import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry.js";
import { IMG } from "../data";
import { CanvasBoundary, Reveal, usePrefersReducedMotion } from "./ui";

/* ---------- three.js: gold rings + dust ---------- */

function GoldRings() {
  const root = useMemo(() => {
    const group = new THREE.Group();
    const cfg = [
      { radius: 3.3, tilt: [0.5, 0, 0.2], speed: 0.12, opacity: 0.9, segments: 90 },
      { radius: 3.9, tilt: [-0.35, 0, -0.5], speed: -0.08, opacity: 0.6, segments: 70 },
      { radius: 4.5, tilt: [0.15, 0, 0.9], speed: 0.05, opacity: 0.38, segments: 50 },
    ];
    cfg.forEach((c) => {
      const pts: number[] = [];
      for (let i = 0; i < c.segments; i++) {
        const a0 = (i / c.segments) * Math.PI * 2;
        const a1 = ((i + 0.55) / c.segments) * Math.PI * 2;
        pts.push(Math.cos(a0) * c.radius, Math.sin(a0) * c.radius, 0, Math.cos(a1) * c.radius, Math.sin(a1) * c.radius, 0);
      }
      const geo = new LineSegmentsGeometry();
      geo.setPositions(pts);
      const mat = new LineMaterial({
        color: 0xd4b48c,
        linewidth: 1.5,
        transparent: true,
        opacity: c.opacity,
      });
      mat.resolution.set(1024, 1024);
      const seg = new LineSegments2(geo, mat);
      seg.rotation.set(c.tilt[0], c.tilt[1], c.tilt[2]);
      seg.userData.speed = c.speed;
      seg.userData.offset = Math.random() * Math.PI;
      group.add(seg);
    });

    const count = 130;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 3.2;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.75;
      pos[i * 3 + 2] = r * Math.cos(ph) * 0.55 - 1;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: 0xb8976e, size: 0.045, transparent: true, opacity: 0.5, sizeAttenuation: true, depthWrite: false })
    );
    group.add(dust);
    return group;
  }, []);

  useFrame(({ pointer, clock }) => {
    root.rotation.y += (pointer.x * 0.4 - root.rotation.y) * 0.04;
    root.rotation.x += (-pointer.y * 0.3 - root.rotation.x) * 0.04;
    const t = clock.elapsedTime;
    root.children.forEach((child) => {
      if (child instanceof LineSegments2) child.rotation.z = t * child.userData.speed + child.userData.offset;
      else if (child instanceof THREE.Points) child.rotation.y = t * 0.02;
    });
  });

  return <primitive object={root} />;
}

function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

function OrbitCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 35 }} dpr={[1, 1.75]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
      <GoldRings />
    </Canvas>
  );
}

/* ---------- facial analysis overlay ---------- */

function FaceAnalysis() {
  const markers = [
    { x: 66, y: 26, label: "Nasal Projection", side: "right" },
    { x: 52, y: 16, label: "Zygoma Point", side: "left" },
    { x: 60, y: 74, label: "Mandibular Angle", side: "right" },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <line x1="50" y1="2" x2="50" y2="98" stroke="#D4B48C" strokeWidth="0.25" strokeDasharray="1 2" opacity="0.55" className="analysis-line" />
        <line x1="8" y1="26" x2="92" y2="26" stroke="#D4B48C" strokeWidth="0.2" strokeDasharray="1 2" opacity="0.4" className="analysis-line" />
        <line x1="8" y1="74" x2="92" y2="74" stroke="#D4B48C" strokeWidth="0.2" strokeDasharray="1 2" opacity="0.4" className="analysis-line" />
      </svg>
      {markers.map((m, i) => (
        <div key={m.label} className="absolute" style={{ left: `${m.x}%`, top: `${m.y}%` }}>
          <span className="relative -ml-1.5 -mt-1.5 block h-3 w-3">
            <span className="absolute inset-0 rounded-full bg-gold animate-pulse-ring" />
            <span className="absolute inset-0 rounded-full border border-gold bg-gold/40" />
          </span>
          <span
            className={`absolute top-1/2 hidden -translate-y-1/2 items-center gap-2 lg:flex ${
              m.side === "right" ? "left-5" : "right-5 flex-row-reverse"
            }`}
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <span className="h-px w-10 bg-gold/70" />
            <span className="whitespace-nowrap rounded-full border border-gold/50 bg-brand-ink/70 px-3.5 py-1.5 text-[9px] font-medium tracking-[0.26em] text-gold uppercase backdrop-blur-sm">
              {m.label}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ---------- hero ---------- */

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const [glOK, setGlOK] = useState(true);

  useEffect(() => {
    setGlOK(supportsWebGL());
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-white pb-24 pt-32 md:pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 30%, rgba(212,180,140,0.14), transparent 60%), radial-gradient(45% 40% at 12% 78%, rgba(45,90,61,0.10), transparent 65%)",
        }}
      />
      <span
        aria-hidden="true"
        className="text-stroke-brand pointer-events-none absolute -bottom-10 left-0 hidden select-none font-display text-[220px] italic leading-none opacity-40 xl:block"
      >
        Seoul
      </span>

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-8">
        {/* left copy */}
        <div className="relative z-10 lg:col-span-6">
          <Reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-gold/60 bg-gold-pale px-5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              <span className="text-[10.5px] font-medium tracking-[0.32em] text-brand-deep uppercase">
                Gangnam · Seoul — Plastic Surgery Atelier
              </span>
            </div>
          </Reveal>

          <h1 className="mt-9 font-display text-[13.5vw] leading-[0.95] font-medium text-brand-ink sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
            <Reveal mask delay={80}><span className="block">The face you</span></Reveal>
            <Reveal mask delay={200}>
              <span className="block italic text-brand">
                were meant
                <span className="ml-4 align-middle font-kr text-3xl text-gold-deep md:text-5xl">연</span>
              </span>
            </Reveal>
            <Reveal mask delay={320}><span className="block">to have.</span></Reveal>
          </h1>

          <Reveal delay={420}>
            <p className="mt-8 max-w-md text-[15.5px] leading-relaxed text-ink/65">
              Rhinoplasty, V-line contouring and cheekbone architecture by three board-certified
              surgeons — planned in 3D simulation, executed once, beautifully.
            </p>
          </Reveal>

          <Reveal delay={520}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo("booking")}
                className="group flex items-center gap-3 rounded-full bg-brand px-9 py-4 text-[11.5px] font-semibold tracking-[0.28em] text-white uppercase shadow-[0_18px_45px_rgba(45,90,61,0.3)] transition-all duration-500 hover:bg-brand-ink hover:shadow-[0_24px_60px_rgba(22,48,31,0.4)]"
              >
                Book consultation
                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" stroke="currentColor" strokeWidth="1.4" className="transition-transform duration-500 group-hover:translate-x-1.5">
                  <path d="M0 4.5h14M10.5 1l3.5 3.5L10.5 8" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo("procedures")}
                className="rounded-full border border-ink/20 px-8 py-4 text-[11.5px] font-medium tracking-[0.28em] text-ink uppercase transition-all duration-400 hover:border-gold-deep hover:text-gold-deep"
              >
                Our procedures
              </button>
            </div>
          </Reveal>

          <Reveal delay={620}>
            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-brand/10 pt-7 text-[10.5px] tracking-[0.24em] text-ink/50 uppercase">
              <span className="flex items-center gap-2.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B8976E" strokeWidth="1.6"><path d="M12 3l2.3 6.7L21 12l-6.7 2.3L12 21l-2.3-6.7L3 12l6.7-2.3z" /></svg>
                3 board-certified surgeons
              </span>
              <span className="flex items-center gap-2.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B8976E" strokeWidth="1.6"><path d="M3 12h4l3-8 4 16 3-8h4" /></svg>
                Live 3D facial simulation
              </span>
              <span className="flex items-center gap-2.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B8976E" strokeWidth="1.6"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
                Est. 2007 · 21,400+ procedures
              </span>
            </div>
          </Reveal>
        </div>

        {/* right visual */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto max-w-[480px]">
            {glOK && !reduced && (
              <div className="pointer-events-none absolute -inset-10 z-0">
                <CanvasBoundary>
                  <OrbitCanvas />
                </CanvasBoundary>
              </div>
            )}

            <Reveal delay={200}>
              <div className="relative z-10 overflow-hidden rounded-t-full rounded-b-[2.5rem] border-[10px] border-brand-tint shadow-[0_40px_120px_rgba(22,48,31,0.22)]">
                <div className={`h-full overflow-hidden ${reduced ? "" : "animate-kb"}`}>
                  <img
                    src={IMG.portrait}
                    alt="Post-operative portrait, signature rhinoplasty, week six"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/45 via-transparent to-transparent" />
                <FaceAnalysis />
                <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between gap-3 rounded-[1.4rem] border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-md">
                  <p className="text-[11px] tracking-[0.2em] text-white/85 uppercase">
                    Live analysis <span className="ml-2 font-kr text-[12px] text-gold">안면 분석</span>
                  </p>
                  <span className="flex items-center gap-2 text-[10px] tracking-[0.22em] text-gold uppercase">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" /> Symmetry 98.2%
                  </span>
                </div>
              </div>
            </Reveal>

            {/* rotating seal */}
            <div className="absolute -left-8 top-6 z-20 hidden h-32 w-32 md:block lg:-left-14">
              <div className="h-full w-full animate-spin-slow">
                <svg viewBox="0 0 120 120" className="h-full w-full">
                  <defs>
                    <path id="sealCircle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                  </defs>
                  <text fontSize="9.2" letterSpacing="2.6" fill="#B8976E" fontFamily="Jost, sans-serif">
                    <textPath href="#sealCircle">GANGNAM · SEOUL · SINCE 2007 · PRIVÉ ·</textPath>
                  </text>
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-kr text-3xl text-brand">연</span>
              </div>
            </div>

            {/* floating result card */}
            <Reveal delay={500}>
              <div className="absolute -right-4 bottom-16 z-20 hidden animate-float-y rounded-[1.5rem] border border-gold/40 bg-white/95 p-5 shadow-[0_24px_70px_rgba(22,48,31,0.18)] backdrop-blur sm:block lg:-right-10">
                <p className="text-[10px] tracking-[0.3em] text-gold-deep uppercase">Signature result</p>
                <p className="mt-1.5 font-display text-2xl text-brand-ink">Rhinoplasty · week 6</p>
                <div className="mt-3 h-1 w-36 overflow-hidden rounded-full bg-brand/10">
                  <div className="h-full w-[94%] rounded-full bg-gold" />
                </div>
                <p className="mt-2 text-[10.5px] tracking-[0.18em] text-ink/50 uppercase">94% of simulated outcome</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
