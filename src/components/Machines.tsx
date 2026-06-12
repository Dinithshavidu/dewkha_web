import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Added string IDs to match the database routing
const machines = [
  {
    id: "M-001",
    name: "Bambu Lab A1 Combo 3D Printer",
    type: "3D Printers",
    price: "$399",
    image: "/images/A1-combo-1.jpg",
    features: [
      "Full-Auto Calibration",
      "Seamless Multi-Color Printing",
      "49dB Whisper-Quiet Operation",
      "Best-In-Class Print Quality",
      "One-Click MakerWorld Integration",
      "Full-Scale Build Volume"
    ],
  },
  {
     id: "M-002",
    name: "Bambu Lab A1 3D Printer",
    type: "3D Printers",
    price: "$299",
    image: "/images/A1-1.jpg",
    features: [
      "Full-Auto Calibration",
      "49dB Whisper-Quiet Operation",
      "Best-In-Class Print Quality",
      "One-Click MakerWorld Integration",
      "Full-Scale Build Volume"
    ],
  },
];

// ─── Section heading with 3-D word fan-in ────────────────────────────────────
function SectionHeading() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4 sm:px-0">
      <motion.div
        className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 justify-center w-full"
        initial={{ opacity: 0, y: -16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.span className="h-[2px] bg-teal-500 block" initial={{ width: 0 }} animate={isInView ? { width: 28 } : {}} transition={{ duration: 0.6, delay: 0.2 }} />
        <span className="text-teal-700 text-[10px] sm:text-xs font-bold tracking-widest uppercase whitespace-nowrap">Our Machines</span>
        <motion.span className="h-[2px] bg-teal-500 block" initial={{ width: 0 }} animate={isInView ? { width: 28 } : {}} transition={{ duration: 0.6, delay: 0.2 }} />
      </motion.div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#0a1a1a] mb-4 sm:mb-6 tracking-tight leading-tight">
        {["Professional", "Machines"].map((word, wi) => (
          <motion.span
            key={word}
            className="inline-block mr-2 sm:mr-4"
            initial={{ opacity: 0, y: 50, rotateX: -45 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.1 + wi * 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 800, display: "inline-block" }}
          >
            {wi === 1 ? <span className="text-[#004445]">{word}</span> : word}
          </motion.span>
        ))}
      </h2>

      <motion.div
        className="h-[2px] bg-gradient-to-r from-transparent via-teal-500 to-transparent mx-auto mb-6 sm:mb-8 rounded-full w-4/5 sm:w-[60%]"
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: "100%", opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      />

      <motion.p
        className="text-[#0a1a1a]/55 text-base sm:text-lg md:text-xl font-medium sm:font-light leading-relaxed"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      >
        Ready to start your own production? We sell the exact industrial-grade machines we use in our own workshop, ensuring absolute reliability.
      </motion.p>
    </div>
  );
}

// ─── Feature list item: staggered slide-in with teal check draw ──────────────
function FeatureItem({ feature, index, cardInView }: { feature: string; index: number; cardInView: boolean }) {
  return (
    <motion.li
      className="flex items-start sm:items-center text-[#0a1a1a]/60 font-light text-sm sm:text-base lg:text-lg"
      initial={{ opacity: 0, x: -24 }}
      animate={cardInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.55 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        initial={{ scale: 0, rotate: -90 }}
        animate={cardInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.6 + index * 0.08 }}
        className="mr-3 sm:mr-4 flex-shrink-0 mt-0.5 sm:mt-0"
      >
        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#004445]" />
      </motion.span>
      <span className="leading-snug">{feature}</span>
    </motion.li>
  );
}

// ─── Machine card ─────────────────────────────────────────────────────────────
function MachineCard({ machine, index }: { machine: (typeof machines)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const depthFactor = 0.14 + index * 0.06;
  // Reduce vertical parallax on mobile
  const rawY = useTransform(scrollYProgress, [0, 1], [typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 80 * depthFactor, typeof window !== 'undefined' && window.innerWidth < 768 ? -40 : -80 * depthFactor]);
  const smoothY = useSpring(rawY, { stiffness: 65, damping: 18 });

  // Disable tilt rotation on mobile
  const rawRotX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 10, 0, 0, typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : -10]);
  const smoothRotX = useSpring(rawRotX, { stiffness: 65, damping: 18 });

  const driftDir = index === 0 ? -1 : 1;
  // Disable horizontal drift on mobile to prevent overflow
  const rawX = useTransform(scrollYProgress, [0, 1], [0, typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 22 * driftDir]);
  const smoothX = useSpring(rawX, { stiffness: 50, damping: 16 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 0.08s linear";
    el.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.025)`;
  }
  function handleMouseLeave() {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "";
  }

  // Prevent sliding in from left/right on mobile screens (causes layout overflow)
  const entranceX = typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : (index === 0 ? -60 : 60);
  const entranceRotY = typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : (index === 0 ? -25 : 25);

  return (
    <motion.div
      ref={cardRef}
      style={{ y: smoothY, x: smoothX, rotateX: smoothRotX, transformPerspective: 1100 }}
      initial={{ opacity: 0, x: entranceX, rotateY: entranceRotY, scale: 0.92 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-[#004445]/10 hover:border-[#004445]/30 transition-all duration-500 group flex flex-col shadow-sm hover:shadow-[0_20px_60px_rgba(0,68,69,0.12)] relative"
    >
      <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-[#004445] to-[#4db8b8] group-hover:w-full transition-all duration-500 ease-out z-30 rounded-t-[2rem] sm:rounded-t-[2.5rem] lg:rounded-t-[3rem]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#eaf3f3]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Sweep line */}
      <motion.div
        className="absolute left-0 w-full h-[2px] z-20 pointer-events-none opacity-50 lg:opacity-0 lg:group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, transparent, #2dd4bf 40%, #2dd4bf 60%, transparent)",
          boxShadow: "0 0 10px 3px rgba(45,212,191,0.45)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
      />

      {/* Image Container - Scaled heights for mobile */}
      <div className="h-56 sm:h-72 lg:h-96 overflow-hidden flex items-center justify-center relative p-6 sm:p-8 lg:p-12 bg-[#eaf3f3]/40">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 + index * 0.15 }}
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(45,212,191,0.10) 0%, transparent 80%)" }}
        />
        <motion.img
          src={machine.image}
          alt={machine.name}
          className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,68,69,0.15)] relative z-10"
          style={{ y: useTransform(scrollYProgress, [0, 1], [10, -20]) }}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.25 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08, y: -12 }}
        />
      </div>

      {/* Content Container - Scaled padding for mobile */}
      <div className="p-6 sm:p-8 lg:p-12 flex flex-col flex-grow relative z-20">
        <motion.div
          className="flex flex-col xl:flex-row justify-between items-start mb-6 sm:mb-10 gap-2 sm:gap-4 border-b border-[#004445]/10 pb-6 sm:pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 + index * 0.15, ease: "easeOut" }}
        >
          <div>
            <motion.span
              className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#004445] mb-2 sm:mb-3 block"
              initial={{ opacity: 0, x: -12 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
            >
              {machine.type}
            </motion.span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0a1a1a] leading-tight">{machine.name}</h3>
          </div>
          <motion.span
            className="text-3xl sm:text-4xl font-extrabold text-[#004445] mt-2 xl:mt-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.45 + index * 0.15 }}
          >
            {machine.price}
          </motion.span>
        </motion.div>

        <ul className="space-y-4 sm:space-y-5 mb-8 sm:mb-12 flex-grow">
          {machine.features.map((feature, i) => (
            <FeatureItem key={feature} feature={feature} index={i} cardInView={isInView} />
          ))}
        </ul>

        <Link
          to={`/machine/${machine.id}`}
          className="w-full py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-[#004445] text-white font-bold text-base sm:text-lg shadow-[0_0_30px_rgba(0,68,69,0.15)] relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,68,69,0.28)] active:scale-95 group/btn flex justify-center"
        >
          <motion.span
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
          />
          View Specifications
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function Machines() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  
  // Adjusted section scale/rotation for mobile
  const sectionScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.98, 1, 1, 0.98]);
  const sectionRotX = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [2, 0, 0, -2]);
  const smoothScale = useSpring(sectionScale, { stiffness: 60, damping: 20 });
  const smoothRotX  = useSpring(sectionRotX,  { stiffness: 60, damping: 20 });

  const buttonRef = useRef<HTMLDivElement>(null);
  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);
  const springX = useSpring(buttonX, { stiffness: 200, damping: 18 });
  const springY = useSpring(buttonY, { stiffness: 200, damping: 18 });

  // Disable magnetic button on mobile
  function handleButtonMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    buttonX.set((e.clientX - cx) * 0.3);
    buttonY.set((e.clientY - cy) * 0.3);
  }

  function handleButtonMouseLeave() {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    buttonX.set(0);
    buttonY.set(0);
  }

  return (
    <motion.section
      ref={sectionRef}
      className="py-16 md:py-32 bg-[#f8fafa] border-b border-[#004445]/10 relative overflow-hidden"
      style={{ scale: smoothScale, rotateX: smoothRotX, transformPerspective: 1200, transformOrigin: "center top" }}
    >
      <motion.div
        className="absolute left-0 w-full h-[2px] z-30 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #2dd4bf 30%, #2dd4bf 70%, transparent 100%)",
          boxShadow: "0 0 12px 3px rgba(45,212,191,0.45)",
        }}
        initial={{ top: "0%", opacity: 0 }}
        animate={isInView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.4, delay: 0.1, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: bgY, backgroundImage: "radial-gradient(circle, #0a1a1a14 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      {/* Scaled down ambient blobs for mobile */}
      <div className="absolute top-0 left-0 md:left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[120px] md:blur-[200px] opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-0 right-0 md:right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-teal-700 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[180px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {machines.map((machine, index) => (
            <MachineCard key={machine.name} machine={machine} index={index} />
          ))}
        </div>

        <motion.div
          ref={buttonRef}
          className="flex justify-center mt-12 md:mt-16 w-full"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleButtonMouseMove}
          onMouseLeave={handleButtonMouseLeave}
        >
          <Link
            to="/machines"
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 sm:px-10 py-4 bg-white border border-[#004445]/20 text-[#0a1a1a] font-bold text-base sm:text-lg rounded-xl sm:rounded-full hover:bg-[#eaf3f3] hover:border-[#004445]/40 transition-all shadow-sm group"
          >
            View All Machines
            <motion.span className="inline-flex" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}