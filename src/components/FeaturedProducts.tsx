import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, X, ArrowLeft, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

// Inline WhatsApp SVG for the order button
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

// ─── UPDATED PRODUCT DATA ─────────────────────────────────────────────────────
const products = [
  {
    id: 1,
    code: "DC-TOYS-002",
    name: "BMW E46 GTR 100x50mm",
    category: "3D Printing",
    price: "Rs.3000.00",
    image: "images/products/DC-TOYS-002.jpeg", // Thumbnail
    images: ["images/products/DC-TOYS-002.jpeg"], // Modal gallery
    description: "High-quality, precision 3D printed scale model of the legendary BMW E46 GTR. Crafted with durable PLA, perfect for collectors and automotive enthusiasts looking for a unique desk display."
  },
  {
    id: 2,
    code: "DC-SIGN-002",
    name: "Custom WiFi QR Connect Sign",
    category: "3D Printing",
    price: "Rs.750.00",
    image: "images/products/DC-SIGN-002.jpeg",
    // Added a dummy second image to demonstrate the carousel functionality
    images: ["images/products/DC-SIGN-002.jpeg"],
    description: "A customizable, dual-color 3D printed WiFi sign. Let your guests connect to your network instantly by simply scanning the 3D integrated QR code. Ideal for homes, cafes, and offices."
  },
  {
    id: 3,
    code: "DC-TOYS-001",
    name: "Cute Penguin Wobble Toy",
    category: "3D Printing",
    price: "Rs.990.00",
    image: "images/products/DC-TOYS-001.jpeg",
    images: ["images/products/DC-TOYS-001.jpeg"],
    description: "An adorable, weighted-bottom penguin toy that wobbles but never falls down. 3D printed using child-safe, non-toxic materials with a smooth finish."
  },
  {
    id: 4,
    code: "DC-LMP-002",
    name: "Spiral Globe Pendant Lamp",
    category: "3D Printing",
    price: "Rs.1650.00",
    image: "images/products/DC-LMP-002.jpeg",
    images: ["images/products/DC-LMP-002.jpeg"],
    description: "Modern spiral globe pendant lamp shade. Its unique geometric design casts beautiful, intricate shadows across the room. Designed to fit standard LED bulb fixtures."
  },
];

type Product = typeof products[0];

// ─── PRODUCT MODAL (QUICK VIEW) ───────────────────────────────────────────────
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [currentImg, setCurrentImg] = useState(0);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const nextImg = () => setCurrentImg((prev) => (prev + 1) % product.images.length);
  const prevImg = () => setCurrentImg((prev) => (prev - 1 + product.images.length) % product.images.length);

  const whatsappMsg = `Hi DEWKHA! I would like to order the ${product.name} (${product.code}).`;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Blurred overlay */}
      <div 
        className="absolute inset-0 bg-[#0a1a1a]/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container - adjusted sizing for mobile */}
      <motion.div
        className="relative bg-white rounded-3xl sm:rounded-[2.5rem] w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#004445]/10 max-h-[90vh] md:max-h-[85vh]"
        initial={{ y: 50, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close Button (Mobile Absolute) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 md:hidden w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-[#0a1a1a]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery */}
        <div className="relative w-full md:w-1/2 bg-[#f8fafa] flex items-center justify-center p-6 sm:p-8 min-h-[250px] md:min-h-[300px] shrink-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImg}
              src={product.images[currentImg]}
              alt={product.name}
              className="w-full h-full max-h-[350px] md:max-h-[500px] object-contain mix-blend-multiply drop-shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Carousel Controls */}
          {product.images.length > 1 && (
            <>
              <button onClick={prevImg} className="absolute left-2 sm:left-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md text-[#004445] transition-all hover:scale-105 border border-[#004445]/10">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImg} className="absolute right-2 sm:right-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md text-[#004445] transition-all hover:scale-105 border border-[#004445]/10">
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentImg ? "w-6 bg-teal-500" : "w-2 bg-teal-500/30"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right: Product Details - scrollable on mobile if content is too long */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-start md:justify-center overflow-y-auto">
          {/* Close Button (Desktop) */}
          <button 
            onClick={onClose}
            className="hidden md:flex absolute top-6 right-6 w-10 h-10 bg-[#f8fafa] hover:bg-red-50 rounded-full items-center justify-center text-[#0a1a1a]/50 hover:text-red-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-teal-600 mb-2 sm:mb-3 block">
            {product.category}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1a1a] mb-2 leading-tight">
            {product.name}
          </h2>
          <p className="text-xs sm:text-sm font-mono font-bold text-[#0a1a1a]/40 tracking-wider mb-4 sm:mb-6">
            Product Code: {product.code}
          </p>
          
          <div className="h-px w-full bg-gradient-to-r from-[#004445]/10 to-transparent mb-4 sm:mb-6 shrink-0" />

          <p className="text-sm sm:text-base text-[#0a1a1a]/70 leading-relaxed mb-6 sm:mb-8">
            {product.description}
          </p>

          <div className="mt-auto shrink-0 pt-2">
            <span className="text-2xl sm:text-3xl font-black text-[#004445] block mb-4 sm:mb-6">
              {product.price}
            </span>
            
            <a 
              href={`https://wa.me/0779727375?text=${encodeURIComponent(whatsappMsg)}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 sm:gap-3 px-6 py-4 sm:px-8 sm:py-5 bg-[#004445] hover:bg-[#003334] text-white text-sm sm:text-base font-bold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Order via WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
    <div ref={ref} className="max-w-2xl text-center md:text-left">
      <motion.div
        className="inline-flex items-center justify-center md:justify-start gap-3 mb-6 w-full"
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
        <motion.span
          className="h-[2px] bg-teal-500 block md:hidden"
          initial={{ width: 0 }}
          animate={isInView ? { width: 28 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </motion.div>

      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-[#0a1a1a] mb-6 tracking-tight leading-[1.05]">
        {["Featured", "Collection"].map((word, wi) => (
          <motion.span
            key={word}
            className="inline-block mr-3 lg:mr-4"
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
        className="h-[2px] bg-gradient-to-r from-transparent md:from-teal-500 via-teal-500 md:via-teal-300 to-transparent md:to-transparent mb-6 rounded-full mx-auto md:mx-0 w-3/4 md:w-full"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
      />

      <motion.p
        className="text-[#0a1a1a]/55 text-base sm:text-lg md:text-xl font-light leading-relaxed px-4 md:px-0"
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
  onClick,
}: {
  product: Product;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const depthFactor = 0.1 + index * 0.04;
  const rawY = useTransform(scrollYProgress, [0, 1], [40 * depthFactor, -40 * depthFactor]); // Reduced for mobile
  const smoothY = useSpring(rawY, { stiffness: 70, damping: 18 });

  const rawRotX = useTransform(scrollYProgress, [0, 0.4, 1], [5, 0, -5]); // Reduced for mobile
  const smoothRotX = useSpring(rawRotX, { stiffness: 70, damping: 18 });

  const driftDir = index % 2 === 0 ? 1 : -1;
  const rawX = useTransform(scrollYProgress, [0, 1], [0, typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : 18 * driftDir]);
  const smoothX = useSpring(rawX, { stiffness: 50, damping: 16 });

  // Disabled 3D tilt on mobile
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 0.08s linear";
    el.style.transform = `perspective(900px) rotateY(${x * 16}deg) rotateX(${-y * 12}deg) scale(1.04)`;
  }
  function handleMouseLeave() {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "";
  }

  const flipAxis = index % 2 === 0 ? { rotateY: -25 } : { rotateX: 20 };

  return (
    <motion.div
      ref={cardRef}
      style={{
        y: smoothY,
        x: smoothX,
        rotateX: smoothRotX,
        transformPerspective: 1100,
      }}
      initial={{ opacity: 0, y: 50, scale: 0.95, ...flipAxis }}
      animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1, rotateY: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.85,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] aspect-[4/5] sm:aspect-square md:aspect-[4/5] bg-[#eaf3f3] border border-[#004445]/10 lg:group-hover:border-[#004445]/30 lg:group-hover:shadow-[0_28px_80px_rgba(0,68,69,0.18)] transition-all duration-500">
        
        {/* Gradient overlay always present on mobile for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a1a] via-[#0a1a1a]/40 to-transparent opacity-70 z-10" />

        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transform lg:group-hover:scale-110 lg:group-hover:rotate-1 transition-transform duration-700 ease-out"
        />

        {/* Teal shimmer bar — top */}
        <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-[#004445] to-[#4db8b8] lg:group-hover:w-full transition-all duration-500 ease-out z-30 rounded-t-[2rem]" />

        {/* Scan-line sweep on hover - always visible on mobile */}
        <motion.div
          className="absolute left-0 w-full h-[2px] z-25 pointer-events-none opacity-50 lg:opacity-0 lg:group-hover:opacity-100"
          style={{
            background: "linear-gradient(90deg, transparent, #2dd4bf 40%, #2dd4bf 60%, transparent)",
            boxShadow: "0 0 8px 2px rgba(45,212,191,0.5)",
          }}
          animate={{ top: ["10%", "90%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />

        {/* Content block - Visible by default on mobile, slides up on desktop */}
        <div className="absolute bottom-0 left-0 w-full p-5 lg:p-8 z-20 flex flex-col justify-end h-full">
          <div className="transform translate-y-0 lg:translate-y-6 lg:group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <motion.p
              className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#4db8b8] mb-1.5 lg:mb-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              {product.category}
            </motion.p>

            <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-1 lg:mb-2">
              {product.name}
            </h3>
            <p className="text-[10px] sm:text-sm font-mono text-white/70 tracking-widest mb-3 lg:mb-4">
              {product.code}
            </p>

            <div className="h-px w-8 lg:w-12 bg-[#4db8b8] mb-3 lg:mb-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />

            <span className="text-[#b5eded] font-medium block text-base sm:text-lg">
              {product.price}
            </span>
          </div>
        </div>

        {/* Corner arrow - Always visible on mobile */}
        <div className="absolute bottom-4 right-4 z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 translate-x-0 lg:translate-x-2 lg:group-hover:translate-x-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-500/30 border border-teal-400/50 flex items-center justify-center backdrop-blur-md">
            <ShoppingCart className="w-4 h-4 text-white" />
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

  const directions = [-1, 0, 1];
  // Reduce horizontal drift on mobile screens to prevent overflow
  const rawX = useTransform(scrollYProgress, [0, 1], [typeof window !== 'undefined' && window.innerWidth < 768 ? 10 * directions[index % 3] : 30 * directions[index % 3], typeof window !== 'undefined' && window.innerWidth < 768 ? -10 * directions[index % 3] : -30 * directions[index % 3]]);
  const smoothX = useSpring(rawX, { stiffness: 60, damping: 18 });

  return (
    <motion.div
      ref={ref}
      className="text-center px-4"
      style={{ x: smoothX }}
      initial={{ opacity: 0, y: 24, scale: 0.85 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        className="text-3xl sm:text-4xl font-black text-[#004445] tracking-tight"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 18, delay: delay + 0.1 }}
      >
        {value}
      </motion.p>
      <p className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#0a1a1a]/40 mt-1 sm:mt-2">
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

  // Disable magnetism on mobile
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  }
  function handleMouseLeave() {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="mt-6 md:mt-0"
    >
      <Link
        to="/products"
        className="inline-flex items-center gap-2 px-8 sm:px-10 py-3 sm:py-4 bg-white border border-[#004445]/20 text-[#0a1a1a] text-sm sm:text-base font-bold rounded-full hover:bg-[#eaf3f3] hover:border-[#004445]/40 transition-all shadow-sm group/btn"
      >
        View All
        <motion.span
          className="inline-flex"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
        </motion.span>
      </Link>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export function FeaturedProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  // Reduced scale & tilt variance for mobile constraints
  const sectionScale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.98, 1, 1, 0.98]);
  const sectionRotX  = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [2, 0, 0, -2]);
  const smoothScale  = useSpring(sectionScale, { stiffness: 60, damping: 20 });
  const smoothRotX   = useSpring(sectionRotX,  { stiffness: 60, damping: 20 });

  return (
    <>
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

        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            y: bgY,
            backgroundImage: "radial-gradient(circle, #0a1a1a14 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Scaled down ambient blobs for mobile */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[180px] opacity-[0.06] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-teal-700 rounded-full mix-blend-multiply filter blur-[90px] md:blur-[160px] opacity-[0.06] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-20 gap-4 md:gap-8 text-center md:text-left">
            <SectionHeading />
            <MagneticCTA />
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-8 md:gap-12 mb-12 md:mb-16">
            {[
              { value: "200+", label: "Products",    delay: 0.1 },
              { value: "98%",  label: "Satisfaction", delay: 0.2 },
              { value: "3–5 days", label: "Turnaround", delay: 0.3 },
            ].map((s, i) => (
              <StatTicker key={s.label} {...s} index={i} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                onClick={() => setSelectedProduct(product)} 
              />
            ))}
          </div>

          <motion.div
            className="mt-16 md:mt-20 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-r from-transparent to-teal-400/40" />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#004445]/35 whitespace-nowrap">
              More below
            </span>
            <div className="h-px flex-1 max-w-[80px] sm:max-w-[120px] bg-gradient-to-l from-transparent to-teal-400/40" />
          </motion.div>
        </div>
      </motion.section>

      {/* Render the Modal if a product is selected */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}