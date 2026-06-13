import { motion, useScroll, useTransform, useInView, useSpring, Variants } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight,
  Mail,
  CheckCircle2,
  PenTool,
  UploadCloud,
  CreditCard,
  Box
} from "lucide-react";

// Inline WhatsApp SVG for cleaner icon representation
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

// ─── Reusable 3D Tilt Card (Desktop Only) ───────────────────────────────────
// Applying the tilt effect directly here to wrap OptionCards and Process Cards
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 0.1s ease-out";
    el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  }
  
  function handleMouseLeave() {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1)";
  }

  return (
    <div 
      ref={ref} 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave} 
      className={className}
    >
      {children}
    </div>
  );
}

// ─── Teal scan-line that sweeps down the section on entry ─────────────────────
function SectionScanLine({ isInView }: { isInView: boolean }) {
  return (
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
  );
}

// ─── Animated section heading ─────────────────────────────────────────────────
function SectionHeading() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="max-w-3xl mx-auto text-center relative z-10 mb-10 sm:mb-16">
      <motion.div
        className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.span
          className="h-[2px] bg-teal-500 block"
          initial={{ width: 0 }}
          animate={isInView ? { width: 20 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        <span className="text-teal-700 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
          Prototyping & Production
        </span>
        <motion.span
          className="h-[2px] bg-teal-500 block"
          initial={{ width: 0 }}
          animate={isInView ? { width: 20 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </motion.div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#0a1a1a] mb-6 tracking-tight leading-[1.1] sm:leading-[1.05]">
        {["Do", "you", "have", "a", "3D", "model", "or", "laser", "engraving", "design?"].map((word, wi) => (
          <motion.span
            key={wi}
            className="inline-block mr-2 lg:mr-4"
            initial={{ opacity: 0, y: 48, rotateX: -40 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15 + wi * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformPerspective: 800, display: "inline-block" }}
          >
            {wi === 4 || wi === 5 ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004445] to-teal-500">{word}</span>
            ) : (
              word
            )}
          </motion.span>
        ))}
      </h2>

      <motion.div
        className="h-[2px] bg-gradient-to-r from-transparent via-teal-500 to-transparent mx-auto w-4/5 sm:w-2/3"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

export function HomeServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Section scale + rotateX (Reduced for mobile)
  const sectionScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.98, 1, 1, 0.98]);
  const sectionRotX  = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [2, 0, 0, -2]);
  const smoothScale  = useSpring(sectionScale, { stiffness: 60, damping: 20 });
  const smoothRotX   = useSpring(sectionRotX,  { stiffness: 60, damping: 20 });

  const stepVariants: Variants = {
    hidden: { opacity: 0, y: 40, rotateX: -10 },
    show: (i) => ({
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { 
        delay: 0.2 + (i * 0.15), 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1] as const 
      }
    }),
  };

  const OptionCard = ({ type, title, icon, desc, delay, action }: { type: "yes" | "no", title: string, icon: React.ReactNode, desc: React.ReactNode, delay: number, action?: React.ReactNode }) => (
    <TiltCard className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const }}
        className={`relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 border transition-all duration-500 group flex flex-col h-full ${
          type === "yes" 
            ? "bg-[#004445] border-[#004445] text-white hover:shadow-[0_20px_60px_rgba(0,68,69,0.25)]" 
            : "bg-white border-[#004445]/10 hover:border-teal-400/50 hover:shadow-xl"
        }`}
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 ${type === "yes" ? "bg-teal-500/20 text-teal-400" : "bg-teal-50 text-teal-600"}`}>
              {icon}
            </div>
            <h3 className={`text-2xl sm:text-3xl font-black ${type === "yes" ? "text-white" : "text-[#0a1a1a]"}`}>
              {title}
            </h3>
          </div>
          <p className={`text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 flex-grow ${type === "yes" ? "text-white/80" : "text-[#0a1a1a]/70"}`}>
            {desc}
          </p>
          <div className="mt-auto pt-5 sm:pt-6 border-t border-current border-opacity-10">
            {action}
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );

  return (
    <motion.section
      ref={sectionRef}
      // Scaled padding for mobile
      className="py-16 md:py-32 bg-[#f8fafa] relative border-b border-[#004445]/10 overflow-hidden"
      style={{
        scale: smoothScale,
        rotateX: smoothRotX,
        transformPerspective: 1200,
        transformOrigin: "center top",
      }}
    >
      <SectionScanLine isInView={isInView} />

      {/* Parallax dot grid */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          y: bgY,
          backgroundImage: "radial-gradient(circle, #0a1a1a14 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient blobs - responsive sizes */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[120px] md:blur-[180px] opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-teal-700 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[160px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <SectionHeading />

        {/* ─── PART 1: DECISION SPLIT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-20 md:mb-32 items-stretch">
          
          {/* YES Option */}
          <OptionCard 
            type="yes"
            title="Yes, I do!"
            icon={<CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />}
            delay={0.1}
            desc={
              <>
                Excellent. Submit your <code>.STL</code>, <code>.STEP</code>, or <code>.OBJ</code> files directly to our engineering team for immediate slicing analysis and quotation.
              </>
            }
            action={
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
                <a 
                  href="mailto:dewkha.creation@gmail.com" 
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-4 sm:px-6 bg-teal-500 hover:bg-teal-400 text-[#004445] text-sm sm:text-base font-black rounded-xl transition-all"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" /> Email Files
                </a>
                <a 
                  href="https://wa.me/94711332442" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-4 sm:px-6 bg-transparent border border-teal-500/30 hover:border-teal-400 text-teal-300 hover:text-white text-sm sm:text-base font-bold rounded-xl transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" /> WhatsApp Us
                </a>
              </div>
            }
          />

          {/* NO Option */}
          <OptionCard 
            type="no"
            title="No, I don't"
            icon={<PenTool className="w-6 h-6 sm:w-8 sm:h-8" />}
            delay={0.2}
            desc={
              <>
                No problem at all. Our specialized CAD designers can translate your conceptual sketches or mechanical requirements into production-ready physical models.
              </>
            }
            action={
              <div className="w-full">
                 <Link 
                  to="/contact" 
                  className="w-full flex items-center justify-center gap-3 px-4 py-4 sm:px-6 bg-[#eaf3f3] hover:bg-[#004445] text-[#004445] hover:text-white text-sm sm:text-base font-black rounded-xl transition-all group"
                >
                  Request Design Consultation
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            }
          />
        </div>

        {/* ─── PART 2: THE PROCESS ─── */}
        <div className="pt-10 sm:pt-16 border-t border-[#004445]/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-16"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1a1a] tracking-tight px-4">
              3 Steps to Physical Reality
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {[
              { num: "01", icon: <UploadCloud className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Submit & Quote", desc: "Transfer files for manual review. We assess structural integrity and generate a material-specific quote." },
              { num: "02", icon: <CreditCard className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Confirm & Pay", desc: "Approve the engineered quotation profile and complete the secure payment gateway process." },
              { num: "03", icon: <Box className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Manufacture & Ship", desc: "Assets undergo printing and post-processing. Shipped directly or prepared for local pickup." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={stepVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                style={{ transformPerspective: 800 }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 border border-[#004445]/10 hover:border-teal-400/50 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col group">
                    
                    {/* Icon & Number Header */}
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#f8fafa] border border-[#004445]/5 flex items-center justify-center text-teal-600 group-hover:bg-teal-50 group-hover:scale-110 transition-all duration-300">
                        {step.icon}
                      </div>
                      <span className="text-4xl sm:text-5xl font-black text-[#0a1a1a]/10 group-hover:text-teal-500/20 transition-colors">
                        {step.num}
                      </span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-bold text-[#0a1a1a] mb-2 sm:mb-4">{step.title}</h4>
                    <p className="text-[#0a1a1a]/60 font-medium leading-relaxed text-xs sm:text-sm flex-grow">
                      {step.desc}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── CTA BUTTON ─── */}
        <motion.div 
          className="mt-16 sm:mt-20 flex justify-center w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
           <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-8 py-4 sm:px-12 sm:py-5 bg-[#0a1a1a] hover:bg-[#004445] text-white text-base sm:text-lg font-bold rounded-2xl sm:rounded-full transition-all shadow-[0_0_30px_rgba(10,26,26,0.15)] hover:shadow-[0_0_40px_rgba(0,68,69,0.3)] transform sm:hover:scale-105 sm:hover:-translate-y-1 active:scale-95 group"
          >
            Explore Complete Services
            <motion.span
              className="inline-flex"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
            </motion.span>
          </Link>
        </motion.div>

      </div>
    </motion.section>
  );
}