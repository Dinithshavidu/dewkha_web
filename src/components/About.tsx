import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import { useRef } from "react";

// Replace these with your actual logo image paths
const partnerLogos = [
  "/images/logos/Dewkha-logo.png", // e.g., Replace with your actual paths
  "/images/logos/Dewkha-logo.png",
  "/images/logos/Dewkha-logo.png",
  "/images/logos/Dewkha-logo.png",
  "/images/logos/Dewkha-logo.png",
  "/images/logos/Dewkha-logo.png",
];

// ─── Stat counter block ───────────────────────────────────────────────────────
function StatBlock({
  value,
  label,
  delay,
  index,
}: {
  value: string;
  label: string;
  delay: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Each stat drifts horizontally at opposite directions
  const driftDir = index === 0 ? -1 : 1;
  const rawX = useTransform(scrollYProgress, [0, 1], [0, 24 * driftDir]);
  const smoothX = useSpring(rawX, { stiffness: 55, damping: 16 });

  return (
    <motion.div ref={ref} style={{ x: smoothX }}>
      {/* Number spring-scales in */}
      <motion.h4
        className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#004445] mb-2"
        initial={{ opacity: 0, scale: 0.4, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 16,
          delay,
        }}
      >
        {value}
      </motion.h4>
      <motion.p
        className="text-[#0a1a1a]/50 uppercase tracking-widest text-xs sm:text-sm font-bold"
        initial={{ opacity: 0, x: -12 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, delay: delay + 0.15, ease: "easeOut" }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

// ─── Left image panel ─────────────────────────────────────────────────────────
function ImagePanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(panelRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  // Panel-level parallax
  const rawY = useTransform(scrollYProgress, [0, 1], [30, -30]); // Reduced for mobile
  const smoothY = useSpring(rawY, { stiffness: 65, damping: 18 });

  // Slow rotateY sway (disabled on mobile via media query classes later, but kept small here)
  const rawRotY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [4, 0, 0, -4]); 
  const smoothRotY = useSpring(rawRotY, { stiffness: 65, damping: 18 });

  // Subtle rotateZ
  const rawRotZ = useTransform(scrollYProgress, [0, 1], [1, -1]);
  const smoothRotZ = useSpring(rawRotZ, { stiffness: 50, damping: 18 });

  // Image 1: faster upward parallax
  const img1Y = useTransform(scrollYProgress, [0, 1], [15, -25]); // Reduced
  const smoothImg1Y = useSpring(img1Y, { stiffness: 70, damping: 18 });

  // Image 2: opposite / slower
  const img2Y = useTransform(scrollYProgress, [0, 1], [-10, 20]); // Reduced
  const smoothImg2Y = useSpring(img2Y, { stiffness: 55, damping: 18 });

  // Mouse tilt (Desktop only effect)
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (window.innerWidth < 1024) return; // Disable on touch/mobile
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 0.08s linear";
    el.style.transform = `perspective(1100px) rotateY(${x * 12}deg) rotateX(${-y * 9}deg) scale(1.02)`;
  }
  function handleMouseLeave() {
    if (window.innerWidth < 1024) return;
    const el = panelRef.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "";
  }

  return (
    <motion.div
      ref={panelRef}
      className="order-2 lg:order-1 relative mt-12 lg:mt-0"
      style={{
        y: smoothY,
        rotateY: smoothRotY,
        rotateZ: smoothRotZ,
        transformPerspective: 1100,
      }}
      initial={{ opacity: 0, x: -40, rotateY: -15, scale: 0.95 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0, scale: 1 } : {}}
      transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="grid grid-cols-2 gap-4 sm:gap-6 relative">
        {/* Breathing glow tile */}
        <motion.div
          className="absolute inset-0 bg-[#004445]/10 rounded-[2rem] sm:rounded-[3rem] z-0 blur-xl"
          animate={{ rotate: [-2, -4, -2], scale: [1.02, 1.05, 1.02] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Counter-rotating teal ring */}
        <motion.div
          className="absolute inset-0 rounded-[2rem] sm:rounded-[3rem] border border-teal-400/10 hidden sm:block"
          animate={{ rotate: [2, 4, 2], scale: [1.02, 1.04, 1.02] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(45,212,191,0.05) 0%, transparent 70%)",
          }}
        />

        {/* Image 1 — offset downward, faster scroll */}
        <motion.div
          className="mt-6 sm:mt-12 relative z-10"
          style={{ y: smoothImg1Y }}
          initial={{ opacity: 0, y: 20, rotateX: 10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03, zIndex: 20 }}
        >
          {/* Scan-line entry */}
          <motion.div
            className="absolute left-0 w-full h-[2px] z-20 pointer-events-none rounded-[1.5rem] sm:rounded-[2rem]"
            style={{
              background:
                "linear-gradient(90deg, transparent, #2dd4bf 40%, #2dd4bf 60%, transparent)",
              boxShadow: "0 0 10px 3px rgba(45,212,191,0.45)",
            }}
            initial={{ top: "0%", opacity: 0 }}
            animate={isInView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
            transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
          />
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
            alt="Workshop"
            className="rounded-[1.5rem] sm:rounded-[2rem] h-48 sm:h-64 lg:h-96 object-cover w-full shadow-lg border border-[#004445]/10"
          />
        </motion.div>

        {/* Image 2 — higher, slower counter-scroll */}
        <motion.div
          className="relative z-10"
          style={{ y: smoothImg2Y }}
          initial={{ opacity: 0, y: -20, rotateX: -10 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.03, zIndex: 20 }}
        >
          {/* Scan-line entry — delayed so it feels sequential */}
          <motion.div
            className="absolute left-0 w-full h-[2px] z-20 pointer-events-none rounded-[1.5rem] sm:rounded-[2rem]"
            style={{
              background:
                "linear-gradient(90deg, transparent, #2dd4bf 40%, #2dd4bf 60%, transparent)",
              boxShadow: "0 0 10px 3px rgba(45,212,191,0.45)",
            }}
            initial={{ top: "0%", opacity: 0 }}
            animate={isInView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
            transition={{ duration: 1.4, delay: 0.85, ease: "easeInOut" }}
          />
          <img
            src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=800"
            alt="Engineering"
            className="rounded-[1.5rem] sm:rounded-[2rem] h-48 sm:h-64 lg:h-96 object-cover w-full shadow-lg border border-[#004445]/10"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Right text column ────────────────────────────────────────────────────────
function TextColumn() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Gentle rightward drift on scroll (disabled on mobile)
  const rawX = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const smoothX = useSpring(rawX, { stiffness: 55, damping: 16 });

  return (
    <motion.div
      ref={ref}
      className="order-1 lg:order-2"
      style={{ x: typeof window !== 'undefined' && window.innerWidth >= 1024 ? smoothX : 0 }}
    >
      {/* Eyebrow */}
      <motion.div
        className="inline-flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: 24 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.span
          className="h-[2px] bg-teal-500 block"
          initial={{ width: 0 }}
          animate={isInView ? { width: 28 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <span className="text-teal-700 text-xs font-bold tracking-widest uppercase">
          Our Story
        </span>
      </motion.div>

      {/* Heading words fan in */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-8 text-[#0a1a1a] tracking-tight leading-tight">
        {["About", "DEWKHA"].map((word, wi) => (
          <motion.span
            key={word}
            className={`inline-block mr-3 md:mr-4 ${wi === 1 ? "text-[#004445]" : ""}`}
            initial={{ opacity: 0, y: 30, rotateX: -20 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.75,
              delay: 0.1 + wi * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformPerspective: 800, display: "inline-block" }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Laser underline */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-teal-500 via-teal-300 to-transparent mb-8 rounded-full"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />

      {/* Paragraphs fade + slide */}
      {[
        "Founded with a passion for digital fabrication, DEWKHA bridges the gap between imagination and physical form. We started as a small workshop and have grown into a full-service manufacturing hub.",
        "Whether you need a single prototype, a batch of custom laser-cut signage, or you want to equip your own business with reliable machines, we are here to provide top-tier service and expertise.",
      ].map((text, i) => (
        <motion.p
          key={i}
          className="text-[#0a1a1a]/60 text-base sm:text-lg lg:text-xl mb-6 leading-relaxed font-medium"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.45 + i * 0.14,
            ease: "easeOut",
          }}
        >
          {text}
        </motion.p>
      ))}

      {/* Stats row */}
      <motion.div
        className="grid grid-cols-2 gap-6 sm:gap-10 border-t border-[#004445]/10 pt-8 mt-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.7 }}
      >
        {/* Animated teal divider draws across */}
        <motion.div
          className="col-span-2 h-[1px] bg-gradient-to-r from-teal-500/40 to-transparent -mt-8 mb-8 rounded-full"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
        <StatBlock value="99%" label="Precision Rate" delay={0.8} index={0} />
        <StatBlock value="10k+" label="Parts Delivered" delay={0.95} index={1} />
      </motion.div>
    </motion.div>
  );
}

// ─── Partners marquee ─────────────────────────────────────────────────────────
function PartnersMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Strip lifts gently as you scroll
  const rawY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const smoothY = useSpring(rawY, { stiffness: 60, damping: 18 });

  return (
    <motion.div
      ref={ref}
      className="pt-16 pb-16 lg:pt-20 lg:pb-20 border-t border-[#004445]/10 bg-[#eaf3f3]/40 relative overflow-hidden"
      style={{ y: smoothY }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Scan-line sweeps the strip on entry */}
      <motion.div
        className="absolute left-0 w-full h-[2px] z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #2dd4bf 30%, #2dd4bf 70%, transparent 100%)",
          boxShadow: "0 0 12px 3px rgba(45,212,191,0.45)",
        }}
        initial={{ top: "0%", opacity: 0 }}
        animate={isInView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
      />

      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 lg:mb-12 text-center">
        <motion.p
          className="text-xs sm:text-sm font-bold tracking-widest text-[#004445] uppercase mb-3"
          initial={{ opacity: 0, y: -12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Trusted by industry leaders
        </motion.p>
        <motion.h3
          className="text-2xl sm:text-3xl font-heading font-bold text-[#0a1a1a]"
          initial={{ opacity: 0, y: 16, rotateX: -20 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformPerspective: 600 }}
        >
          Our Best Customers & Partners
        </motion.h3>

        {/* Laser underline */}
        <motion.div
          className="h-[2px] bg-gradient-to-r from-transparent via-teal-500 to-transparent mx-auto mt-4 rounded-full"
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: "40%", opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Scrolling logo strip (Image Version) */}
      <div className="relative flex overflow-hidden py-6 lg:py-8">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 md:w-64 bg-gradient-to-r from-[#f5f9f9] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 md:w-64 bg-gradient-to-l from-[#f5f9f9] to-transparent z-10 pointer-events-none" />

        {/* Main marquee — left */}
        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
        >
          {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((logoSrc, index) => (
            <motion.div
              key={index}
              className="px-8 sm:px-12 lg:px-20 flex items-center justify-center shrink-0 cursor-default select-none"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img 
                src={logoSrc} 
                alt="Partner Logo" 
                className="h-10 sm:h-12 md:h-16 object-contain opacity-50 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Second row — slower, opposite direction */}
      <div className="relative flex overflow-hidden py-3 lg:py-4 mt-1 lg:mt-2">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 md:w-64 bg-gradient-to-r from-[#f5f9f9] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 md:w-64 bg-gradient-to-l from-[#f5f9f9] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap items-center"
          animate={{ x: [-2000, 0] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
        >
          {[...partnerLogos, ...partnerLogos, ...partnerLogos].reverse().map((logoSrc, index) => (
            <motion.div
              key={index}
              className="px-8 sm:px-12 lg:px-20 flex items-center justify-center shrink-0 cursor-default select-none"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img 
                src={logoSrc} 
                alt="Partner Logo" 
                className="h-8 sm:h-10 md:h-12 object-contain opacity-30 hover:opacity-80 transition-opacity duration-300 filter grayscale"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax dot grid
  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  // Section scale + rotateX
  const sectionScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.98, 1, 1, 0.98] // Reduced scale variance for mobile
  );
  const sectionRotX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [2, 0, 0, -2] // Reduced rotation for mobile
  );
  const smoothScale = useSpring(sectionScale, { stiffness: 60, damping: 20 });
  const smoothRotX = useSpring(sectionRotX, { stiffness: 60, damping: 20 });

  return (
    <motion.section
      ref={sectionRef}
      className="pt-16 lg:pt-8 pb-0 bg-[#f8fafa] relative overflow-hidden border-b border-[#004445]/10"
      style={{
        scale: smoothScale,
        rotateX: smoothRotX,
        transformPerspective: 1200,
        transformOrigin: "center top",
      }}
    >
      {/* Section entry scan-line */}
      <motion.div
        className="absolute left-0 w-full h-[2px] z-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #2dd4bf 30%, #2dd4bf 70%, transparent 100%)",
          boxShadow: "0 0 12px 3px rgba(45,212,191,0.45)",
        }}
        initial={{ top: "0%", opacity: 0 }}
        animate={isInView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.5, delay: 0.1, ease: "easeInOut" }}
      />

      {/* Parallax dot grid */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          y: bgY,
          backgroundImage:
            "radial-gradient(circle, #0a1a1a14 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-1/4 -left-48 w-[300px] lg:w-[460px] h-[300px] lg:h-[460px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[120px] lg:blur-[180px] opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-[250px] lg:w-[400px] h-[250px] lg:h-[400px] bg-teal-700 rounded-full mix-blend-multiply filter blur-[100px] lg:blur-[160px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-20 lg:mb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <TextColumn />
          <ImagePanel />
        </div>
      </div>

      <PartnersMarquee />
    </motion.section>
  );
}