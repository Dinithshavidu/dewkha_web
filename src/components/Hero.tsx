import { motion, useScroll, useTransform, useSpring, animate } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ─── Each SVG object is revealed bottom→top with a moving nozzle ─────────────
type PrintedObjectProps = {
  children: React.ReactNode;
  viewBox: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  delay: number;
  duration?: number;
  opacity?: number;
};

function PrintedObject({
  children,
  viewBox,
  width,
  height,
  style,
  delay,
  duration = 3.5,
  opacity = 0.18,
}: PrintedObjectProps) {
  const clipId = useRef(`clip-${Math.random().toString(36).slice(2)}`).current;
  const nozzleRef = useRef<SVGRectElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const vbHeight = parseFloat(viewBox.split(" ")[3]);
    const startDelay = delay * 1000;
    const stepDuration = (duration * 1000) / vbHeight;

    const timer = setTimeout(() => {
      let frame = 0;
      const interval = setInterval(() => {
        frame++;
        const revealedFromBottom = frame; // px from bottom revealed
        const clipY = vbHeight - revealedFromBottom;

        if (clipRectRef.current) {
          clipRectRef.current.setAttribute("y", String(clipY));
          clipRectRef.current.setAttribute("height", String(revealedFromBottom + 2));
        }
        if (nozzleRef.current) {
          nozzleRef.current.setAttribute("y", String(clipY - 2));
        }

        if (frame >= vbHeight) {
          clearInterval(interval);
          // hide nozzle after done
          setTimeout(() => {
            if (nozzleRef.current) nozzleRef.current.setAttribute("opacity", "0");
          }, 400);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [delay, duration, viewBox]);

  const vbParts = viewBox.split(" ").map(Number);
  const vbW = vbParts[2];
  const vbH = vbParts[3];

  return (
    <div className="absolute pointer-events-none" style={style}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity, scale: 1 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
      >
        <svg viewBox={viewBox} width={width} height={height} overflow="visible">
          <defs>
            <clipPath id={clipId}>
              <rect ref={clipRectRef} x="-10" y={vbH} width={vbW + 20} height="2" />
            </clipPath>
          </defs>

          {/* Base plate */}
          <rect x="0" y={vbH - 2} width={vbW} height="3" rx="1" fill="#0a1a1a" opacity="0.5" />

          {/* Object clipped to revealed region */}
          <g clipPath={`url(#${clipId})`}>
            {children}
          </g>

          {/* Nozzle glow line */}
          <rect
            ref={nozzleRef}
            x="-4"
            y={vbH}
            width={vbW + 8}
            height="2.5"
            rx="1"
            fill="#2dd4bf"
            opacity="0.85"
            filter="url(#glow)"
          />
          <defs>
            <filter id="glow" x="-50%" y="-200%" width="200%" height="500%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
        </svg>
      </motion.div>
    </div>
  );
}

// ─── OBJECTS ──────────────────────────────────────────────────────────────────

// 1. Vase
function VaseSVG() {
  return (
    <>
      {/* Vase body */}
      <path
        d="M 30 120 Q 10 100 8 70 Q 6 40 20 20 Q 28 8 40 6 Q 52 4 60 6 Q 72 8 80 20 Q 94 40 92 70 Q 90 100 70 120 Z"
        fill="#0f1f1f"
        stroke="#1a3a3a"
        strokeWidth="1"
      />
      {/* Neck */}
      <rect x="32" y="2" width="36" height="8" rx="3" fill="#0a1a1a" />
      {/* Rim */}
      <ellipse cx="50" cy="4" rx="20" ry="4" fill="#152525" />
      {/* Layer lines for FDM texture */}
      {[20,30,40,50,60,70,80,90,100,110].map(y => (
        <line key={y} x1="12" y1={y} x2="88" y2={y} stroke="#2dd4bf" strokeWidth="0.4" opacity="0.15" />
      ))}
      {/* Highlight ridge */}
      <path d="M 22 80 Q 18 60 26 35" stroke="#1e3535" strokeWidth="3" fill="none" strokeLinecap="round" />
    </>
  );
}

// 2. Gear
function GearSVG() {
  const teeth = 10;
  const r1 = 38, r2 = 46, cx = 55, cy = 55;
  let path = "";
  for (let i = 0; i < teeth; i++) {
    const a1 = (i / teeth) * Math.PI * 2 - 0.12;
    const a2 = (i / teeth) * Math.PI * 2 + 0.12;
    const a3 = ((i + 0.5) / teeth) * Math.PI * 2 - 0.12;
    const a4 = ((i + 0.5) / teeth) * Math.PI * 2 + 0.12;
    const x1 = cx + r1 * Math.cos(a1), y1 = cy + r1 * Math.sin(a1);
    const x2 = cx + r2 * Math.cos(a2), y2 = cy + r2 * Math.sin(a2);
    const x3 = cx + r2 * Math.cos(a3), y3 = cy + r2 * Math.sin(a3);
    const x4 = cx + r1 * Math.cos(a4), y4 = cy + r1 * Math.sin(a4);
    path += `${i === 0 ? "M" : "L"} ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} L ${x3.toFixed(1)} ${y3.toFixed(1)} L ${x4.toFixed(1)} ${y4.toFixed(1)} `;
  }
  path += "Z";
  return (
    <>
      <path d={path} fill="#0f1f1f" stroke="#1e3535" strokeWidth="1" />
      <circle cx={cx} cy={cy} r="18" fill="#0a1414" stroke="#1a3a3a" strokeWidth="1" />
      <circle cx={cx} cy={cy} r="7" fill="#152525" />
      {[35,45,55,65,75].map(y => (
        <line key={y} x1="10" y1={y} x2="100" y2={y} stroke="#2dd4bf" strokeWidth="0.4" opacity="0.12" />
      ))}
    </>
  );
}

// 3. Isometric cube
function CubeSVG() {
  return (
    <>
      {/* Top face */}
      <polygon points="50,8 90,30 50,52 10,30" fill="#152828" stroke="#1e3535" strokeWidth="0.8" />
      {/* Left face */}
      <polygon points="10,30 50,52 50,95 10,73" fill="#0a1a1a" stroke="#1a2e2e" strokeWidth="0.8" />
      {/* Right face */}
      <polygon points="90,30 50,52 50,95 90,73" fill="#0f2020" stroke="#1a3030" strokeWidth="0.8" />
      {/* Edge highlights */}
      <line x1="50" y1="8" x2="50" y2="52" stroke="#2dd4bf" strokeWidth="0.6" opacity="0.3" />
      <line x1="50" y1="52" x2="50" y2="95" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.2" />
      {/* Layer lines */}
      {[40,52,64,76].map(y => (
        <line key={y} x1="10" y1={y} x2="90" y2={y} stroke="#2dd4bf" strokeWidth="0.35" opacity="0.13" />
      ))}
    </>
  );
}

// 4. Trophy
function TrophySVG() {
  return (
    <>
      {/* Cup */}
      <path d="M 25 10 Q 15 30 18 55 Q 22 75 50 80 Q 78 75 82 55 Q 85 30 75 10 Z" fill="#0f1f1f" stroke="#1a3030" strokeWidth="1" />
      {/* Handles */}
      <path d="M 25 25 Q 6 30 8 50 Q 10 65 25 62" fill="none" stroke="#0a1a1a" strokeWidth="6" strokeLinecap="round" />
      <path d="M 75 25 Q 94 30 92 50 Q 90 65 75 62" fill="none" stroke="#0a1a1a" strokeWidth="6" strokeLinecap="round" />
      {/* Stem */}
      <rect x="44" y="80" width="12" height="22" rx="2" fill="#0a1a1a" />
      {/* Base */}
      <rect x="28" y="100" width="44" height="8" rx="3" fill="#0a1414" />
      <rect x="32" y="106" width="36" height="6" rx="2" fill="#0f1f1f" />
      {/* Star */}
      <polygon points="50,30 53,40 63,40 55,46 58,56 50,50 42,56 45,46 37,40 47,40" fill="#152828" stroke="#1e3535" strokeWidth="0.5" />
      {/* Layer lines */}
      {[20,35,50,65,80,95].map(y => (
        <line key={y} x1="16" y1={y} x2="84" y2={y} stroke="#2dd4bf" strokeWidth="0.4" opacity="0.12" />
      ))}
    </>
  );
}

// 5. Phone stand
function PhoneStandSVG() {
  return (
    <>
      {/* Back support */}
      <path d="M 30 10 L 40 10 L 70 85 L 60 85 Z" fill="#0f1f1f" stroke="#1a3030" strokeWidth="0.8" />
      {/* Front leg */}
      <path d="M 48 55 L 56 55 L 65 85 L 57 85 Z" fill="#0a1a1a" stroke="#152525" strokeWidth="0.8" />
      {/* Phone slot ledge */}
      <rect x="22" y="28" width="56" height="7" rx="2" fill="#152828" stroke="#1e3535" strokeWidth="0.7" />
      {/* Base */}
      <rect x="20" y="83" width="60" height="7" rx="3" fill="#0a1414" />
      {/* Layer lines */}
      {[20,35,50,65,80].map(y => (
        <line key={y} x1="20" y1={y} x2="80" y2={y} stroke="#2dd4bf" strokeWidth="0.4" opacity="0.12" />
      ))}
    </>
  );
}

// 6. Pyramid
function PyramidSVG() {
  return (
    <>
      {/* Left face */}
      <polygon points="50,5 10,90 50,90" fill="#0f1f1f" stroke="#1a3030" strokeWidth="0.8" />
      {/* Right face */}
      <polygon points="50,5 90,90 50,90" fill="#152828" stroke="#1e3535" strokeWidth="0.8" />
      {/* Base */}
      <rect x="10" y="88" width="80" height="5" rx="1" fill="#0a1414" />
      {/* Apex glow */}
      <circle cx="50" cy="5" r="3" fill="#2dd4bf" opacity="0.4" />
      {/* Layer lines */}
      {[20,35,50,65,80].map(y => (
        <line key={y} x1={10 + (y-5)*0.44} y1={y} x2={90 - (y-5)*0.44} y2={y} stroke="#2dd4bf" strokeWidth="0.4" opacity="0.15" />
      ))}
    </>
  );
}

// 7. Abstract arch / doorway
function ArchSVG() {
  return (
    <>
      {/* Arch body */}
      <path d="M 15 100 L 15 50 Q 15 5 50 5 Q 85 5 85 50 L 85 100 Z" fill="#0f1f1f" stroke="#1a3030" strokeWidth="1" />
      {/* Inner cutout */}
      <path d="M 28 100 L 28 52 Q 28 20 50 20 Q 72 20 72 52 L 72 100 Z" fill="#f8fafa" />
      {/* Base */}
      <rect x="12" y="98" width="76" height="6" rx="2" fill="#0a1414" />
      {/* Layer lines */}
      {[25,40,55,70,85].map(y => (
        <line key={y} x1="15" y1={y} x2="85" y2={y} stroke="#2dd4bf" strokeWidth="0.4" opacity="0.13" />
      ))}
    </>
  );
}

// ─── Positioned objects config ────────────────────────────────────────────────
const OBJECTS = [
  { id: "vase",       Component: VaseSVG,      vb: "0 0 100 125", w: 72,  h: 90,  pos: { left: "4%",  top: "8%"  }, delay: 0.2,  dur: 3.2  },
  { id: "gear",       Component: GearSVG,      vb: "0 0 110 110", w: 88,  h: 88,  pos: { left: "76%", top: "5%"  }, delay: 0.6,  dur: 3.0  },
  { id: "cube",       Component: CubeSVG,      vb: "0 0 100 100", w: 80,  h: 80,  pos: { left: "88%", top: "50%" }, delay: 1.0,  dur: 2.8  },
  { id: "trophy",     Component: TrophySVG,    vb: "0 0 100 115", w: 70,  h: 80,  pos: { left: "2%",  top: "55%" }, delay: 1.4,  dur: 3.4  },
  { id: "stand",      Component: PhoneStandSVG,vb: "0 0 100 95",  w: 64,  h: 60,  pos: { left: "60%", top: "72%" }, delay: 0.9,  dur: 2.6  },
  { id: "pyramid",    Component: PyramidSVG,   vb: "0 0 100 95",  w: 70,  h: 65,  pos: { left: "38%", top: "4%"  }, delay: 1.7,  dur: 2.5  },
  { id: "arch",       Component: ArchSVG,      vb: "0 0 100 108", w: 68,  h: 72,  pos: { left: "22%", top: "66%" }, delay: 1.2,  dur: 3.0  },
];

// ─── Main Hero ────────────────────────────────────────────────────────────────
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const yContent  = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity   = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale3d   = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const rotateX   = useTransform(scrollYProgress, [0, 0.5], [0, 5]);
  const ySpring   = useSpring(yContent, { stiffness: 60, damping: 18 });

  // Parallax for each object at different rates
  const depths = [0.4, 0.55, 0.5, 0.45, 0.6, 0.35, 0.5];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#f8fafa]"
    >
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(circle, #0a1a1a18 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-1/4 -left-64 w-[480px] h-[480px] bg-teal-400 rounded-full mix-blend-multiply filter blur-[160px] opacity-[0.07] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-[480px] h-[480px] bg-teal-700 rounded-full mix-blend-multiply filter blur-[160px] opacity-[0.07] pointer-events-none" />

      {/* ── Scattered 3D printed objects ── */}
      {OBJECTS.map(({ id, Component, vb, w, h, pos, delay, dur }, i) => {
        const yObj = useTransform(scrollYProgress, [0, 1], [0, -260 * depths[i]]);
        return (
          <motion.div key={id} style={{ y: yObj, position: "absolute", ...pos, zIndex: 5 }}>
            <PrintedObject viewBox={vb} width={w} height={h} delay={delay} duration={dur} opacity={0.22}>
              <Component />
            </PrintedObject>
          </motion.div>
        );
      })}

      {/* ── Center content ── */}
      <motion.div
        className="relative z-20 text-center px-4 sm:px-8 max-w-4xl mx-auto"
        style={{
          opacity,
          scale: scale3d,
          rotateX,
          y: ySpring,
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.span className="h-[2px] bg-teal-500 block" initial={{ width: 0 }} animate={{ width: 32 }} transition={{ duration: 0.6, delay: 0.3 }} />
          <span className="text-teal-700 text-sm md:text-base font-bold tracking-widest uppercase">Welcome to DEWKHA</span>
          <motion.span className="h-[2px] bg-teal-500 block" initial={{ width: 0 }} animate={{ width: 32 }} transition={{ duration: 0.6, delay: 0.3 }} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-heading font-black text-[#0a1a1a] leading-[1.1] mb-8 tracking-tighter"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Precision 3D <br />
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-teal-900 via-teal-600 to-teal-400 inline-block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            & Laser Cutting
          </motion.span>
        </motion.h1>

        {/* Laser underline */}
        <motion.div
          className="h-[2px] bg-gradient-to-r from-transparent via-teal-500 to-transparent mx-auto mb-8"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "60%", opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        />

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-2xl text-[#0a1e1e]/55 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          From concepts to physical reality. We provide high-quality customized prints,
          premium cutting services, and sell industry-grade machines.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
        >
          <Link
            to="/products"
            className="inline-flex justify-center items-center px-12 py-5 text-lg font-black rounded-full text-[#f0fafa] bg-[#0a1a1a] hover:bg-black transition-all shadow-[0_0_40px_rgba(10,40,40,0.15)] transform hover:scale-105 hover:-translate-y-1"
          >
            Buy Products
          </Link>
          <Link
            to="/machines"
            className="inline-flex justify-center items-center px-12 py-5 text-lg font-black rounded-full text-[#0a1a1a] bg-transparent border-2 border-teal-600 hover:bg-teal-600/10 transition-all transform hover:scale-105 hover:-translate-y-1"
          >
            Buy Machines
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="text-xs font-bold tracking-widest uppercase text-[#004445]/40">Scroll</span>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-teal-500 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: "top" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}