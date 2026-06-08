import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useAnimationFrame } from "motion/react";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    code: "DWK-001",
    name: "Custom Architect Model",
    category: "3D Printing",
    price: "From $45",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    code: "DWK-002",
    name: "Precision Engine Parts",
    category: "Laser Cutting",
    price: "From $85",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    code: "DWK-003",
    name: "Artisanal Vase Collection",
    category: "3D Printing",
    price: "From $30",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    code: "DWK-004",
    name: "Acrylic Signage",
    category: "Laser Cutting",
    price: "From $60",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800",
  },
];

// ─── Teal scan-line that sweeps down the section on entry ─────────────────────
function SectionScanLine({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      className="absolute left-0 w-full h-[2px] z-30 pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, #2dd4bf 30%, #2dd4bf 70%, transparent 100%)",
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
    <div ref={ref} className="max-w-2xl">
      <motion.div
        className="inline-flex items-center gap-3 mb-6"
        initial={{ opacity: 0, x: -24 }}
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
          Handpicked
        </span>
      </motion.div>

      <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-[#0a1a1a] mb-6 tracking-tight leading-[1.05]">
        {["Featured", "Collection"].map((word, wi) => (
          <motion.span
            key={word}
            className="inline-block mr-4"
            initial={{ opacity: 0, y: 48, rotateX: -40 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.15 + wi * 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformPerspective: 800, display: "inline-block" }}
          >
            {wi === 1 ? (
              <span className="text-[#004445]">{word}</span>
            ) : (
              word
            )}
          </motion.span>
        ))}
      </h2>

      <motion.div
        className="h-[2px] bg-gradient-to-r from-teal-500 via-teal-300 to-transparent mb-6 rounded-full"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />

      <motion.p
        className="text-[#0a1a1a]/55 text-lg md:text-xl font-light leading-relaxed"
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
      >
        Discover our top-selling 3D printed and laser-cut items, crafted with
        precision and care for both personal and industrial use.
      </motion.p>
    </div>
  );
}

// ─── Product card: scroll parallax + 3-D mouse tilt + flip entrance ───────────
function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  // Scroll-driven vertical parallax, staggered depth per card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const depthFactor = 0.1 + index * 0.04;
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [70 * depthFactor, -70 * depthFactor]
  );
  const smoothY = useSpring(rawY, { stiffness: 70, damping: 18 });

  // Scroll-driven rotateX for a "falling into place" feel
  const rawRotX = useTransform(scrollYProgress, [0, 0.4, 1], [8, 0, -8]);
  const smoothRotX = useSpring(rawRotX, { stiffness: 70, damping: 18 });

  // Horizontal scroll drift — odd cards drift left, even right
  const driftDir = index % 2 === 0 ? 1 : -1;
  const rawX = useTransform(scrollYProgress, [0, 1], [0, 18 * driftDir]);
  const smoothX = useSpring(rawX, { stiffness: 50, damping: 16 });

  // Live mouse-tilt via direct DOM style for zero-lag feel
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 0.08s linear";
    el.style.transform = `perspective(900px) rotateY(${x * 16}deg) rotateX(${-y * 12}deg) scale(1.04)`;
  }
  function handleMouseLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "";
  }

  // Entrance: cards flip in from alternating axes with stagger
  const flipAxis = index % 2 === 0 ? { rotateY: -35 } : { rotateX: 25 };

  return (
    <motion.div
      ref={cardRef}
      style={{
        y: smoothY,
        x: smoothX,
        rotateX: smoothRotX,
        transformPerspective: 1100,
      }}
      initial={{ opacity: 0, y: 80, scale: 0.9, ...flipAxis }}
      animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1, rotateY: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.85,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-[#eaf3f3] border border-[#004445]/10 group-hover:border-[#004445]/30 group-hover:shadow-[0_28px_80px_rgba(0,68,69,0.18)] transition-all duration-500"
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a1a] to-transparent opacity-60 z-10" />

        {/* Image with zoom + slight rotation on hover */}
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
        />

        {/* Teal shimmer bar — top */}
        <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-[#004445] to-[#4db8b8] group-hover:w-full transition-all duration-500 ease-out z-30 rounded-t-[2.5rem]" />

        {/* Scan-line sweep on hover — echoes the hero printer nozzle */}
        <motion.div
          className="absolute left-0 w-full h-[2px] z-25 pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(90deg, transparent, #2dd4bf 40%, #2dd4bf 60%, transparent)",
            boxShadow: "0 0 8px 2px rgba(45,212,191,0.5)",
          }}
          animate={{ top: ["10%", "90%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />

        {/* Diagonal glare */}
        <div
          className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)",
          }}
        />

        {/* Content block */}
        <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex flex-col justify-end h-full">
          <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <motion.p
              className="text-xs font-bold tracking-widest uppercase text-[#4db8b8] mb-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {product.category}
            </motion.p>

            <h3 className="text-2xl font-bold text-white leading-tight mb-2">
              {product.name}
            </h3>
            <p className="text-sm font-mono text-white/70 tracking-widest mb-4">
              {product.code}
            </p>

            <div className="h-px w-12 bg-[#4db8b8] mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <span className="text-[#b5eded] font-medium block text-lg">
              {product.price}
            </span>
          </div>
        </div>

        {/* Corner arrow */}
        <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Stat ticker with scroll-driven horizontal slide ─────────────────────────
function StatTicker({
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

  // Each stat drifts horizontally at a unique rate
  const directions = [-1, 0, 1];
  const rawX = useTransform(scrollYProgress, [0, 1], [30 * directions[index % 3], -30 * directions[index % 3]]);
  const smoothX = useSpring(rawX, { stiffness: 60, damping: 18 });

  return (
    <motion.div
      ref={ref}
      className="text-center"
      style={{ x: smoothX }}
      initial={{ opacity: 0, y: 24, scale: 0.85 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated number pops in with a spring scale */}
      <motion.p
        className="text-3xl font-black text-[#004445] tracking-tight"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: delay + 0.1 }}
      >
        {value}
      </motion.p>
      <p className="text-xs font-bold tracking-widest uppercase text-[#0a1a1a]/40 mt-1">
        {label}
      </p>
    </motion.div>
  );
}

// ─── Magnetic CTA button ──────────────────────────────────────────────────────
function MagneticCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, x: 32, rotateY: -20 }}
      animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to="/products"
        className="inline-flex items-center gap-2 px-10 py-4 bg-white border border-[#004445]/20 text-[#0a1a1a] font-bold rounded-full hover:bg-[#eaf3f3] hover:border-[#004445]/40 transition-all shadow-sm group/btn"
      >
        View All
        <motion.span
          className="inline-flex"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.span>
      </Link>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax dot grid
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Section scale + rotateX as it enters viewport (matches Hero parallax feel)
  const sectionScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.96, 1, 1, 0.96]);
  const sectionRotX  = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [4, 0, 0, -4]);
  const smoothScale  = useSpring(sectionScale, { stiffness: 60, damping: 20 });
  const smoothRotX   = useSpring(sectionRotX,  { stiffness: 60, damping: 20 });

  return (
    <motion.section
      ref={sectionRef}
      className="py-32 bg-[#f8fafa] relative border-b border-[#004445]/10 overflow-hidden"
      style={{
        scale: smoothScale,
        rotateX: smoothRotX,
        transformPerspective: 1200,
        transformOrigin: "center top",
      }}
    >
      {/* Teal scan-line sweeps section on entry */}
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

      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[180px] opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-700 rounded-full mix-blend-multiply filter blur-[160px] opacity-[0.06] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header row */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <SectionHeading />
          <MagneticCTA />
        </div>

        {/* Stats row — each drifts at its own horizontal rate */}
        <div className="flex gap-12 mb-16">
          {[
            { value: "200+", label: "Products",    delay: 0.1 },
            { value: "98%",  label: "Satisfaction", delay: 0.2 },
            { value: "3–5 days", label: "Turnaround", delay: 0.3 },
          ].map((s, i) => (
            <StatTicker key={s.label} {...s} index={i} />
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Bottom divider */}
        <motion.div
          className="mt-20 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-teal-400/40" />
          <span className="text-xs font-bold tracking-widest uppercase text-[#004445]/35">
            More below
          </span>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-teal-400/40" />
        </motion.div>
      </div>
    </motion.section>
  );
}