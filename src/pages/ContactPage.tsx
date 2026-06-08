import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { Contact } from "../components/Contact";

export function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"],
  });

  // Parallax dot grid drifts upward as you scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  // Hero text parallaxes up slower than scroll
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const smoothHeroY = useSpring(heroY, { stiffness: 60, damping: 18 });

  // Hero fades out as you scroll down
  const heroOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  return (
    <div
      ref={pageRef}
      className="bg-[#f8fafa] min-h-screen relative overflow-x-hidden"
    >
      {/* ── Parallax dot grid ── */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          y: bgY,
          backgroundImage:
            "radial-gradient(circle, #0a1a1a14 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Ambient blobs ── */}
      <div className="fixed top-1/4 -left-48 w-[460px] h-[460px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[180px] opacity-[0.07] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 -right-48 w-[400px] h-[400px] bg-teal-700 rounded-full mix-blend-multiply filter blur-[160px] opacity-[0.07] pointer-events-none z-0" />

      {/* ── Hero header ── */}
      <motion.div
        className="relative z-10 pt-40 pb-20 px-4"
        style={{ y: smoothHeroY, opacity: heroOpacity }}
      >
        <div className="max-w-7xl mx-auto">

          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              className="h-[2px] bg-teal-500 block"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            />
            <span className="text-teal-700 text-xs font-bold tracking-widest uppercase">
              We'd love to hear from you
            </span>
          </motion.div>

          {/* Heading — words fan in with rotateX */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-[#0a1a1a] tracking-tight leading-[1.05] mb-6">
            {[
              { text: "Get",     accent: false },
              { text: "in",      accent: false },
              { text: "Touch",   accent: true  },
            ].map((word, wi) => (
              <motion.span
                key={wi}
                className={`inline-block mr-5 ${word.accent ? "text-[#004445]" : ""}`}
                initial={{ opacity: 0, y: 56, rotateX: -45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.15 + wi * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ transformPerspective: 900, display: "inline-block" }}
              >
                {word.text}
              </motion.span>
            ))}
          </h1>

          {/* Laser underline draws left → right */}
          <motion.div
            className="h-[3px] bg-gradient-to-r from-teal-500 via-teal-300 to-transparent rounded-full mb-8"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.6, ease: "easeOut" }}
            style={{ transformOrigin: "left", maxWidth: "420px" }}
          />

          {/* Subtitle */}
          <motion.p
            className="text-[#0a1a1a]/50 text-lg md:text-xl font-light leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55, ease: "easeOut" }}
          >
            Send us a message, request a custom quote, or ask about our
            machines — our team responds fast.
          </motion.p>

          {/* Scroll hint */}
          <motion.div
            className="mt-12 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            <span className="text-xs font-bold tracking-widest uppercase text-[#004445]/35">
              Scroll
            </span>
            <motion.div
              className="w-[1px] h-7 bg-gradient-to-b from-teal-500 to-transparent"
              animate={{ scaleY: [0, 1, 0], originY: "top" }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Floating stat chips */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-5">
          {[
            { value: "< 24h",   label: "Response time" },
            { value: "100%",    label: "Custom orders"  },
            { value: "Free",    label: "Consultation"   },
          ].map(({ value, label }, i) => (
            <motion.div
              key={label}
              className="bg-white/80 backdrop-blur-sm border border-[#004445]/12 rounded-2xl px-5 py-3 shadow-sm text-right"
              initial={{ opacity: 0, x: 40, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.5 + i * 0.14,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,68,69,0.13)" }}
              style={{ transformPerspective: 600 }}
            >
              <motion.p
                className="text-xl font-black text-[#004445]"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 16,
                  delay: 0.65 + i * 0.14,
                }}
              >
                {value}
              </motion.p>
              <p className="text-xs font-bold tracking-widest uppercase text-[#0a1a1a]/40">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Teal divider line between hero and form */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        />
      </motion.div>

      {/* ── Contact section ── */}
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Contact />
      </motion.div>
    </div>
  );
}