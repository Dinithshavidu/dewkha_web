import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import { useRef } from "react";
import { Wrench, Send, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

// Updated icon sizes to be slightly larger on sm screens and up
const steps = [
  {
    icon: <Send className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    title: "Send Product Code",
    description:
      "Already see something close to what you want? Send us the product code and tell us how to tweak it.",
  },
  {
    icon: <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    title: "Share Your Idea",
    description:
      "Have a completely new concept? Send us your sketches, CAD files, or just a description and we'll design it.",
  },
  {
    icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
    title: "We Build It",
    description:
      "Our experts use high-end 3D printers and laser cutters to bring your custom design to life.",
  },
];

// ─── Animated connector line between steps ────────────────────────────────────
function StepConnector({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <motion.div
      // Adjusted left offset and height for mobile scaling
      className="absolute left-7 sm:left-8 top-14 sm:top-16 w-[2px] h-10 sm:h-12 origin-top"
      style={{
        background: "linear-gradient(to bottom, #004445, transparent)",
      }}
      initial={{ scaleY: 0 }}
      animate={inView ? { scaleY: 1 } : {}}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
    />
  );
}

// ─── Individual step row ──────────────────────────────────────────────────────
function StepRow({
  step,
  index,
  isLast,
  sectionInView,
}: {
  step: (typeof steps)[0];
  index: number;
  isLast: boolean;
  sectionInView: boolean;
}) {
  const baseDelay = 0.5 + index * 0.18;

  return (
    <div className="flex gap-4 sm:gap-6 relative">
      {/* Icon box — spins + scales in */}
      <motion.div
        // Shrunk slightly for mobile
        className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-[1rem] sm:rounded-2xl bg-[#004445] border border-[#004445]/20 flex items-center justify-center shadow-lg shadow-[#004445]/15 relative z-10"
        initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
        animate={
          sectionInView ? { opacity: 1, scale: 1, rotate: 0 } : {}
        }
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 18,
          delay: baseDelay,
        }}
        whileHover={{
          scale: 1.12,
          boxShadow: "0 0 24px rgba(0,68,69,0.45)",
          rotate: 6,
        }}
      >
        {/* Nozzle glow ring on hover */}
        <motion.span
          className="absolute inset-0 rounded-[1rem] sm:rounded-2xl border-2 border-teal-400/0"
          whileHover={{ borderColor: "rgba(45,212,191,0.5)", scale: 1.15 }}
          transition={{ duration: 0.3 }}
        />
        {step.icon}
      </motion.div>

      {/* Connector line to next step */}
      {!isLast && <StepConnector inView={sectionInView} delay={baseDelay + 0.25} />}

      {/* Text slides in from left */}
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        animate={sectionInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: 0.55,
          delay: baseDelay + 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <h3 className="text-xl sm:text-2xl font-bold text-[#0a1a1a] mb-1 sm:mb-2">{step.title}</h3>
        <p className="text-[#0a1a1a]/55 font-light text-base sm:text-lg">{step.description}</p>
      </motion.div>
    </div>
  );
}

// ─── Left content column ──────────────────────────────────────────────────────
function LeftColumn({ isInView }: { isInView: boolean }) {
  return (
    <div>
      {/* Eyebrow */}
      <motion.div
        className="inline-flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -20 }}
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
          Custom Work
        </span>
      </motion.div>

      {/* Heading — words fan in */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#0a1a1a] mb-6 tracking-tight leading-tight">
        {[
          { text: "Customize", accent: false },
          { text: "Anything.", accent: false },
          { text: "Build", accent: false },
          { text: "Something", accent: true },
          { text: "New.", accent: true },
        ].map((word, wi) => (
          <motion.span
            key={wi}
            className={`inline-block mr-2 sm:mr-3 ${word.accent ? "text-[#004445]" : ""}`}
            initial={{ opacity: 0, y: 44, rotateX: -40 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.1 + wi * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformPerspective: 800, display: "inline-block" }}
          >
            {word.text}
          </motion.span>
        ))}
      </h2>

      {/* Laser underline */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-teal-500 via-teal-300 to-transparent mb-8 rounded-full"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />

      <motion.p
        className="text-[#0a1a1a]/55 text-base sm:text-lg md:text-xl mb-10 sm:mb-12 font-light leading-relaxed"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
      >
        At DEWKHA, your imagination is the only limit. We offer full
        customization for all our existing products, and a complete
        build-from-scratch service for your unique ideas.
      </motion.p>

      {/* Steps */}
      <div className="space-y-8 sm:space-y-12">
        {steps.map((step, index) => (
          <StepRow
            key={index}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
            sectionInView={isInView}
          />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="mt-12 sm:mt-16 w-full sm:w-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
      >
        <motion.div
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block w-full sm:w-auto"
        >
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-black rounded-xl sm:rounded-full text-white bg-[#004445] hover:bg-[#003334] transition-colors shadow-[0_0_30px_rgba(0,68,69,0.15)] relative overflow-hidden group"
          >
            {/* Shimmer sweep */}
            <motion.span
              className="absolute inset-0 pointer-events-none"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent)",
              }}
            />
            Start Custom Project
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Right image panel ────────────────────────────────────────────────────────
function RightPanel() {
  const panelRef = useRef<HTMLDivElement>(null);

  // Scroll-driven parallax for image
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });
  
  // Reduced parallax on mobile
  const rawY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const smoothY = useSpring(rawY, { stiffness: 65, damping: 18 });

  // Scroll rotateY — panel slowly rotates as it passes (disabled effect on mobile)
  const rawRotY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [4, 0, 0, -4]);
  const smoothRotY = useSpring(rawRotY, { stiffness: 65, damping: 18 });

  // Scroll rotateZ — very subtle tilt
  const rawRotZ = useTransform(scrollYProgress, [0, 1], [1, -1]);
  const smoothRotZ = useSpring(rawRotZ, { stiffness: 50, damping: 18 });

  const isInView = useInView(panelRef, { once: true, margin: "-80px" });

  // Mouse tilt (Disabled on mobile)
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 0.08s linear";
    el.style.transform = `perspective(1100px) rotateY(${x * 12}deg) rotateX(${-y * 9}deg) scale(1.02)`;
  }
  
  function handleMouseLeave() {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = panelRef.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "";
  }

  return (
    <motion.div
      ref={panelRef}
      // Scaled height for different devices
      className="relative h-[400px] sm:h-[500px] lg:h-[700px] mt-12 lg:mt-0"
      style={{
        y: smoothY,
        rotateY: typeof window !== 'undefined' && window.innerWidth >= 1024 ? smoothRotY : 0,
        rotateZ: typeof window !== 'undefined' && window.innerWidth >= 1024 ? smoothRotZ : 0,
        transformPerspective: 1100,
      }}
      initial={{ 
        opacity: 0, 
        x: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 60, 
        y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 40 : 0,
        rotateY: typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 20, 
        scale: 0.95 
      }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1 } : {}}
      transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Rotating background glow tile */}
      <motion.div
        className="absolute inset-0 bg-[#004445]/10 rounded-[2rem] sm:rounded-[3rem] border border-[#004445]/10 blur-xl"
        animate={{ rotate: [2, 4, 2], scale: [1.02, 1.05, 1.02] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Second glow layer, counter-rotates */}
      <motion.div
        className="absolute inset-0 rounded-[2rem] sm:rounded-[3rem] border border-teal-400/10 hidden sm:block"
        animate={{ rotate: [-2, -4, -2], scale: [1.01, 1.03, 1.01] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(45,212,191,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Image */}
      <motion.img
        src="https://images.unsplash.com/photo-1536697246787-1f7ae568d89a?auto=format&fit=crop&q=80&w=800"
        alt="Designer customizing 3D model"
        className="relative z-10 w-full h-full object-cover rounded-[2rem] sm:rounded-[3rem] shadow-lg border border-[#004445]/10"
        style={{ y: useTransform(scrollYProgress, [0, 1], [15, -15]) }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
      />

      {/* Scan-line sweeps image on entry */}
      <motion.div
        className="absolute left-0 w-full h-[2px] z-20 pointer-events-none rounded-[2rem] sm:rounded-[3rem]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #2dd4bf 30%, #2dd4bf 70%, transparent 100%)",
          boxShadow: "0 0 12px 3px rgba(45,212,191,0.5)",
        }}
        initial={{ top: "0%", opacity: 0 }}
        animate={isInView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.6, delay: 0.3, ease: "easeInOut" }}
      />

      {/* Corner accent badge */}
      <motion.div
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 bg-white/90 backdrop-blur-sm border border-[#004445]/15 rounded-xl sm:rounded-2xl px-4 py-2 sm:px-5 sm:py-3 shadow-lg"
        initial={{ opacity: 0, y: 20, scale: 0.85 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.7 }}
        whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,68,69,0.18)" }}
      >
        <p className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#004445]">
          Custom Design
        </p>
        <p className="text-xs sm:text-sm text-[#0a1a1a]/60 font-light mt-0.5">
          From concept to print
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function Customization() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax dot grid
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Section scale + rotateX on scroll (Reduced for mobile)
  const sectionScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.98, 1, 1, 0.98]
  );
  const sectionRotX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [2, 0, 0, -2]
  );
  const smoothScale = useSpring(sectionScale, { stiffness: 60, damping: 20 });
  const smoothRotX = useSpring(sectionRotX, { stiffness: 60, damping: 20 });

  return (
    <motion.section
      ref={sectionRef}
      // Adjusted padding for mobile screens
      className="py-16 md:py-32 bg-[#f8fafa] relative overflow-hidden border-b border-[#004445]/10"
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

      {/* Ambient blobs - Scaled down for mobile */}
      <div className="absolute top-1/3 -left-32 sm:-left-48 w-[300px] sm:w-[460px] h-[300px] sm:h-[460px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[120px] sm:blur-[180px] opacity-[0.07] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-32 sm:-right-48 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-teal-700 rounded-full mix-blend-multiply filter blur-[100px] sm:blur-[160px] opacity-[0.07] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <LeftColumn isInView={isInView} />
          <RightPanel />
        </div>
      </div>
    </motion.section>
  );
}