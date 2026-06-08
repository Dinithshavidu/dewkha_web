import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";

// ─── Social icon button with magnetic + spring-pop ────────────────────────────
function SocialButton({
  href,
  delay,
  children,
}: {
  href: string;
  delay: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 220, damping: 16 });
  const springY = useSpring(my, { stiffness: 220, damping: 16 });

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    my.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }
  function handleMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      className="w-16 h-16 rounded-2xl bg-white border border-[#004445]/15 flex items-center justify-center shadow-sm relative overflow-hidden group transition-colors duration-300"
      initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 18,
        delay,
      }}
      whileHover={{
        scale: 1.18,
        borderColor: "rgba(0,68,69,0.35)",
        boxShadow: "0 8px 28px rgba(0,68,69,0.18)",
      }}
      whileTap={{ scale: 0.92 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Teal shimmer sweep on hover */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={{ x: "100%", opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(45,212,191,0.15), transparent)",
        }}
      />
      {children}
    </motion.a>
  );
}

// ─── Animated form field ──────────────────────────────────────────────────────
function FormField({
  id,
  label,
  type = "text",
  placeholder,
  delay,
  textarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  delay: number;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  const inputClass =
    "w-full px-6 py-5 rounded-2xl bg-[#f8fafa] border outline-none transition-all placeholder:text-[#0a1a1a]/30 text-[#0a1a1a] " +
    (focused
      ? "border-[#004445]/50 ring-2 ring-[#004445]/20"
      : "border-[#004445]/15");

  return (
    <motion.div
      initial={{ opacity: 0, x: 28, rotateY: -12 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 700 }}
    >
      {/* Label slides down when focused/filled */}
      <motion.label
        htmlFor={id}
        className="block text-sm font-bold mb-3 tracking-wide"
        animate={{
          color: focused ? "#004445" : "#0a1a1a",
          x: focused ? 2 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
        {/* Teal dot appears on focus */}
        <motion.span
          className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 ml-2 mb-0.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={
            focused
              ? { scale: 1, opacity: 1 }
              : { scale: 0, opacity: 0 }
          }
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        />
      </motion.label>

      <div className="relative">
        {textarea ? (
          <textarea
            id={id}
            rows={4}
            className={inputClass + " resize-none"}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              setFocused(false);
              setFilled(e.target.value.length > 0);
            }}
          />
        ) : (
          <input
            type={type}
            id={id}
            className={inputClass}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              setFocused(false);
              setFilled(e.target.value.length > 0);
            }}
          />
        )}

        {/* Teal bottom-border draw on focus */}
        <motion.span
          className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-[#004445] via-teal-400 to-transparent pointer-events-none"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />

        {/* Filled checkmark */}
        {filled && !focused && (
          <motion.span
            className="absolute right-5 top-1/2 -translate-y-1/2 text-teal-500 text-sm font-bold pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
          >
            ✓
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Left info column ─────────────────────────────────────────────────────────
function LeftColumn() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const smoothX = useSpring(rawX, { stiffness: 55, damping: 16 });

  return (
    <motion.div ref={ref} style={{ x: smoothX }}>
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
          Get in Touch
        </span>
      </motion.div>

      {/* Heading words fan in */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold mb-8 text-[#0a1a1a] tracking-tight leading-tight">
        {["Let's", "Build", "Together"].map((word, wi) => (
          <motion.span
            key={word}
            className={`inline-block mr-4 ${wi === 2 ? "text-[#004445]" : ""}`}
            initial={{ opacity: 0, y: 48, rotateX: -40 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.75,
              delay: 0.1 + wi * 0.12,
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
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />

      <motion.p
        className="text-[#0a1a1a]/55 text-lg md:text-xl mb-12 font-light leading-relaxed"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        Have a question about our products, need a custom quote, or want to
        inquire about a machine? Send us a message and our team will get back
        to you shortly.
      </motion.p>

      {/* Social heading */}
      <motion.h4
        className="text-xl font-bold text-[#0a1a1a] mb-6 tracking-tight"
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Connect with us on
      </motion.h4>

      {/* Social icons */}
      <div className="flex gap-4 mb-14">
        <SocialButton href="#" delay={0.65}>
          <FaWhatsapp className="w-8 h-8 text-[#25D366] relative z-10" />
        </SocialButton>

        <SocialButton href="#" delay={0.75}>
          <FaFacebookF className="w-6 h-6 text-[#1877F2] relative z-10" />
        </SocialButton>

        <SocialButton href="#" delay={0.85}>
          <FaInstagram className="w-8 h-8 text-[#E1306C] relative z-10" />
        </SocialButton>

        <SocialButton href="#" delay={0.95}>
          <FaTiktok className="w-7 h-7 text-[#000000] relative z-10" />
        </SocialButton>
      </div>

      {/* Email */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <p className="text-xs font-bold tracking-widest text-[#004445]/60 uppercase mb-2">
          Email Us
        </p>

        <a
          href="mailto:dewkha@gmail.com"
          className="text-xl md:text-2xl font-bold text-[#0a1a1a] hover:text-teal-500 transition-colors inline-flex items-center gap-3"
        >
          <FaEnvelope className="w-5 h-5" />
          dewkha@gmail.com
        </a>
      </motion.div>

      {/* ─── NEW: Stacked Phone Numbers Section ─── */}
      <motion.div
        className="flex flex-col gap-8"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.05 }}
      >
        <div className="group">
          <p className="text-xs font-bold tracking-widest text-[#004445]/60 uppercase mb-2 group-hover:text-[#004445] transition-colors">
            Sales & Inquiries
          </p>
          <p
            className="text-2xl md:text-3xl font-black text-[#0a1a1a] group-hover:text-teal-500 transition-colors inline-block"
          >
            +94 71 160 9341
          </p>
        </div>
        
        <div className="group">
          <p className="text-xs font-bold tracking-widest text-[#004445]/60 uppercase mb-2 group-hover:text-[#004445] transition-colors">
            Technical Support
          </p>
          <p
          
            className="text-2xl md:text-3xl font-black text-[#0a1a1a] group-hover:text-teal-500 transition-colors inline-block"
          >
            +1 (555) 987-6543
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Right form panel ─────────────────────────────────────────────────────────
function FormPanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(panelRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  // Panel parallax + rotateY sway + rotateZ tilt
  const rawY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const smoothY = useSpring(rawY, { stiffness: 65, damping: 18 });

  const rawRotY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [6, 0, 0, -6]);
  const smoothRotY = useSpring(rawRotY, { stiffness: 65, damping: 18 });

  const rawRotZ = useTransform(scrollYProgress, [0, 1], [1, -1]);
  const smoothRotZ = useSpring(rawRotZ, { stiffness: 50, damping: 18 });

  // Mouse tilt
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 0.08s linear";
    el.style.transform = `perspective(1100px) rotateY(${x * 10}deg) rotateX(${-y * 7}deg) scale(1.015)`;
  }
  function handleMouseLeave() {
    const el = panelRef.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "";
  }

  const [submitted, setSubmitted] = useState(false);

  return (
    <motion.div
      ref={panelRef}
      className="bg-white p-10 sm:p-14 rounded-[3rem] border border-[#004445]/10 shadow-sm relative overflow-hidden"
      style={{
        y: smoothY,
        rotateY: smoothRotY,
        rotateZ: smoothRotZ,
        transformPerspective: 1100,
      }}
      initial={{ opacity: 0, x: 60, rotateY: 22, scale: 0.93 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0, scale: 1 } : {}}
      transition={{ duration: 0.95, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Teal shimmer top bar */}
      <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-[#004445] to-[#4db8b8] group-hover:w-full transition-all duration-500 ease-out rounded-t-[3rem]" />

      {/* Scan-line sweeps panel on entry */}
      <motion.div
        className="absolute left-0 w-full h-[2px] z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #2dd4bf 30%, #2dd4bf 70%, transparent 100%)",
          boxShadow: "0 0 12px 3px rgba(45,212,191,0.45)",
        }}
        initial={{ top: "0%", opacity: 0 }}
        animate={isInView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.5, delay: 0.35, ease: "easeInOut" }}
      />

      {/* Ambient glow behind form */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 bg-teal-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-[0.07] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.11, 0.07] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {!submitted ? (
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <FormField
            id="name"
            label="Full Name"
            placeholder="John Doe"
            delay={0.3}
          />
          <FormField
            id="email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            delay={0.42}
          />
          <FormField
            id="message"
            label="Message or Requirement"
            placeholder="Tell us about your project..."
            delay={0.54}
            textarea
          />

          {/* Submit button */}
          <motion.button
            type="submit"
            className="w-full py-5 text-white bg-[#004445] hover:bg-[#003334] rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(0,68,69,0.15)] relative overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
            whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(0,68,69,0.28)" }}
            whileTap={{ scale: 0.97 }}
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
            Send Message
          </motion.button>
        </form>
      ) : (
        // ── Success state ──
        <motion.div
          className="flex flex-col items-center justify-center py-16 text-center gap-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18 }}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-[#004445] flex items-center justify-center shadow-[0_0_40px_rgba(0,68,69,0.3)]"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
          >
            <motion.svg
              className="w-10 h-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              />
            </motion.svg>
          </motion.div>

          <motion.h3
            className="text-2xl font-black text-[#0a1a1a]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Message Sent!
          </motion.h3>
          <motion.p
            className="text-[#0a1a1a]/55 font-light"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            We'll get back to you shortly.
          </motion.p>

          {/* Teal scan-line celebrates */}
          <motion.div
            className="w-full h-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #2dd4bf, transparent)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const sectionScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.96, 1, 1, 0.96]
  );
  const sectionRotX = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [5, 0, 0, -5]
  );
  const smoothScale = useSpring(sectionScale, { stiffness: 60, damping: 20 });
  const smoothRotX  = useSpring(sectionRotX,  { stiffness: 60, damping: 20 });

  return (
    <motion.section
      ref={sectionRef}
      className="py-32 bg-[#f8fafa] relative overflow-hidden"
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
      <div className="absolute top-1/4 -left-48 w-[460px] h-[460px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[180px] opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-[400px] h-[400px] bg-teal-700 rounded-full mix-blend-multiply filter blur-[160px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <LeftColumn />
          <FormPanel />
        </div>
      </div>
    </motion.section>
  );
}