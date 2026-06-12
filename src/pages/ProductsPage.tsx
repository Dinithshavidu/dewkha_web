import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "motion/react";
import { useRef, useState, useMemo, useEffect } from "react";
import { ArrowRight, Search, SlidersHorizontal, X, ArrowLeft, ShoppingCart } from "lucide-react";
import { Customization } from "../components/Customization";
import { Link } from "react-router-dom";

// Inline WhatsApp SVG for the order button
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

// Expanded product list with descriptions and image arrays for the modal
const allProducts = [
  { 
    id: 1, code: "DC-TOYS-002", name: "BMW E46 GTR 100x50mm", category: "3D Printing", price: "Rs.3000.00", 
    image: "images/products/DC-TOYS-002.jpeg",
    images: ["images/products/DC-TOYS-002.jpeg"],
    description: "High-quality, precision 3D printed scale model of the legendary BMW E46 GTR. Crafted with durable PLA, perfect for collectors and automotive enthusiasts looking for a unique desk display."
  },
  { 
    id: 2, code: "DC-SIGN-002", name: "Custom WiFi QR Connect Sign", category: "3D Printing", price: "Rs.750.00", 
    image: "images/products/DC-SIGN-002.jpeg",
    images: ["images/products/DC-SIGN-002.jpeg"], // 2 images to show carousel
    description: "A customizable, dual-color 3D printed WiFi sign. Let your guests connect to your network instantly by simply scanning the 3D integrated QR code. Ideal for homes, cafes, and offices."
  },
  { 
    id: 3, code: "DC-TOYS-001", name: "Cute Penguin Wobble Toy", category: "3D Printing", price: "Rs.990.00", 
    image: "images/products/DC-TOYS-001.jpeg",
    images: ["images/products/DC-TOYS-001.jpeg"],
    description: "An adorable, weighted-bottom penguin toy that wobbles but never falls down. 3D printed using child-safe, non-toxic materials with a smooth finish."
  },
  { 
    id: 4, code: "DC-LMP-002", name: "Spiral Globe Pendant Lamp", category: "3D Printing", price: "Rs.1650.00", 
    image: "images/products/DC-LMP-002.jpeg",
    images: ["images/products/DC-LMP-002.jpeg"],
    description: "Modern spiral globe pendant lamp shade. Its unique geometric design casts beautiful, intricate shadows across the room. Designed to fit standard LED bulb fixtures."
  },
  { 
    id: 5, code: "DC-SIGN-001", name: "Personalized Pencil Name Tag", category: "3D Printing", price: "Rs.100.00", 
    image: "images/products/DC-SIGN-001.jpeg",
    images: ["images/products/DC-SIGN-001.jpeg"], // 2 images
    description: "A fun and practical personalized name tag shaped like a pencil. Perfect for school bags, backpacks, or as a creative luggage tag for kids and teachers."
  },
  { 
    id: 6, code: "DC-SIGN-003", name: "Custom Desk Nameplate", category: "3D Printing", price: "Rs.340.00", 
    image: "images/products/DC-SIGN-003.jpeg",
    images: ["images/products/DC-SIGN-003.jpeg"],
    description: "Professional customized desk nameplate with raised text. Features a sleek, dual-color extrusion that stands out perfectly in any office environment."
  },
  { 
    id: 7, code: "DC-OFFC-001", name: "Crumpled Paper Bag Pen Holder", category: "3D Printing", price: "Rs.555.00", 
    image: "images/products/DC-OFFC-001.jpeg",
    images: ["images/products/DC-OFFC-001.jpeg"],
    description: "A quirky, creative pen and pencil holder designed to look exactly like a crumpled brown paper bag. A great conversation starter for your workspace."
  },
  { 
    id: 8, code: "DC-LMP-001", name: "Lava Drop Lamp", category: "3D Printing", price: "Rs.1850.00", 
    image: "images/products/DC-LMP-001.jpeg",
    images: ["images/products/DC-LMP-001.jpeg"],
    description: "An elegant, organic-shaped ambient lamp inspired by falling water drops. Emits a soft, warm glow perfect for bedside tables or living room accents."
  },
];

type Product = typeof allProducts[0];
const categories = ["All", "3D Printing", "Laser Cutting"];

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

      {/* Modal Container - Adjusted sizing and overflow for mobile */}
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
        <div className="relative w-full md:w-1/2 bg-[#f8fafa] flex items-center justify-center p-6 sm:p-8 min-h-[250px] sm:min-h-[300px] shrink-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImg}
              src={product.images[currentImg]}
              alt={product.name}
              className="w-full h-full max-h-[300px] sm:max-h-[500px] object-contain mix-blend-multiply drop-shadow-xl"
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
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button onClick={nextImg} className="absolute right-2 sm:right-4 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md text-[#004445] transition-all hover:scale-105 border border-[#004445]/10">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${idx === currentImg ? "w-5 sm:w-6 bg-teal-500" : "w-1.5 sm:w-2 bg-teal-500/30"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-start md:justify-center overflow-y-auto">
          <button 
            onClick={onClose}
            className="hidden md:flex absolute top-6 right-6 w-10 h-10 bg-[#f8fafa] hover:bg-red-50 rounded-full items-center justify-center text-[#0a1a1a]/50 hover:text-red-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-teal-600 mb-2 sm:mb-3 block mt-2 md:mt-0">
            {product.category}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1a1a] mb-2 leading-tight">
            {product.name}
          </h2>
          <p className="text-xs sm:text-sm font-mono font-bold text-[#0a1a1a]/40 tracking-wider mb-4 sm:mb-6">
            Product Code: {product.code}
          </p>
          
          <div className="h-px w-full bg-gradient-to-r from-[#004445]/10 to-transparent mb-4 sm:mb-6 shrink-0" />

          <p className="text-[#0a1a1a]/70 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
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

// ─── Reusable 3D Product Card ─────────────────────────────────────────────────
function ProductCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-40px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  const depthFactor = 0.05 + (index % 4) * 0.02;
  const rawY = useTransform(scrollYProgress, [0, 1], [40 * depthFactor, -40 * depthFactor]);
  const smoothY = useSpring(rawY, { stiffness: 70, damping: 18 });

  // Disable mouse tilt on mobile
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 0.08s linear";
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  }
  
  function handleMouseLeave() {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "";
  }

  // Remove flip axis entrance on mobile to prevent overflow
  const flipAxis = typeof window !== 'undefined' && window.innerWidth < 1024 ? {} : (index % 2 === 0 ? { rotateY: -20 } : { rotateX: 15 });

  return (
    <motion.div
      ref={cardRef}
      style={{ y: smoothY, transformPerspective: 1100 }}
      initial={{ opacity: 0, y: 60, scale: 0.95, ...flipAxis }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] sm:aspect-square md:aspect-[4/5] bg-[#eaf3f3] border border-[#004445]/10 lg:group-hover:border-[#004445]/30 lg:group-hover:shadow-[0_20px_60px_rgba(0,68,69,0.15)] transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a1a] via-[#0a1a1a]/40 to-transparent opacity-70 z-10" />
        
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transform lg:group-hover:scale-110 lg:group-hover:rotate-1 transition-transform duration-700 ease-out"
        />

        {/* Top border always visible on mobile, drawn on hover for desktop */}
        <div className="absolute top-0 left-0 h-1 w-full lg:w-0 bg-gradient-to-r from-[#004445] to-[#4db8b8] lg:group-hover:w-full transition-all duration-500 ease-out z-30 rounded-t-[2rem]" />

        <div className="absolute bottom-0 left-0 w-full p-5 lg:p-6 z-20 flex flex-col justify-end h-full">
          {/* Text content always visible on mobile, translated down on desktop */}
          <div className="transform translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#4db8b8] mb-1.5 lg:mb-2">
              {product.category}
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mb-1">
              {product.name}
            </h3>
            <p className="text-[10px] sm:text-xs font-mono text-white/60 tracking-widest mb-2 lg:mb-3">
              {product.code}
            </p>
            <div className="h-px w-8 bg-[#4db8b8] mb-2 lg:mb-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-[#b5eded] font-medium block text-sm sm:text-base">
              {product.price}
            </span>
          </div>
        </div>

        {/* Cart icon always visible on mobile */}
        <div className="absolute bottom-4 right-4 z-30 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 translate-x-0 lg:translate-x-2 lg:group-hover:translate-x-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-500/30 border border-teal-400/50 flex items-center justify-center backdrop-blur-md">
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(searchLower) || 
                            product.code.toLowerCase().includes(searchLower);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      <div className="min-h-screen bg-[#f8fafa] relative overflow-hidden pt-20 md:pt-24 pb-20 sm:pb-32">
        
        {/* Background Parallax Grid & Blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #0a1a1a08 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[120px] md:blur-[200px] opacity-[0.07] pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-teal-700 rounded-full mix-blend-multiply filter blur-[100px] md:blur-[180px] opacity-[0.05] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* ─── Hero Section ─── */}
          <div className="text-center md:text-left mb-10 sm:mb-12 pt-4">
            <motion.div
              className="inline-flex items-center justify-center md:justify-start gap-2 sm:gap-3 mb-4 w-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="h-[2px] w-6 sm:w-8 bg-teal-500 block" />
              <span className="text-teal-700 text-[10px] sm:text-sm font-bold tracking-widest uppercase">
                Full Catalog
              </span>
              <span className="h-[2px] w-6 sm:w-8 bg-teal-500 block md:hidden" />
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-[#0a1a1a] mb-4 sm:mb-6 tracking-tight leading-[1.1] md:leading-[1.05]">
              <motion.span 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.1 }}
                className="block"
              >
                Our Complete
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[#004445] block mt-1 md:mt-0"
              >
                Collection
              </motion.span>
            </h1>
            
            <motion.p
              className="text-[#0a1a1a]/60 text-base sm:text-lg md:text-xl font-medium sm:font-light leading-relaxed max-w-2xl mx-auto md:mx-0 px-2 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore our wide range of premium 3D printed and expertly laser-cut products. Standard models or fully customized, we bring your vision to reality.
            </motion.p>
          </div>

          {/* ─── Filters & Search ─── */}
          <motion.div 
            className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6 mb-12 sm:mb-16 border-y border-[#004445]/10 py-4 sm:py-6"
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-colors duration-300 whitespace-nowrap ${
                    activeCategory === category 
                      ? "text-white" 
                      : "text-[#004445]/60 hover:text-[#004445] hover:bg-[#004445]/5"
                  }`}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="active-pill-page"
                      className="absolute inset-0 bg-[#004445] rounded-full z-0 shadow-md"
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>

            {/* Working Search Bar */}
            <div className="flex gap-2 sm:gap-3 w-full lg:w-auto">
              <div className="relative w-full lg:w-72">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004445]/40" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or code..." 
                  className="w-full bg-white border border-[#004445]/10 rounded-full py-2.5 sm:py-3 pl-9 sm:pl-11 pr-4 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all shadow-sm text-[#0a1a1a] placeholder:text-[#004445]/30"
                />
              </div>
              <button className="p-2.5 sm:p-3 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white border border-[#004445]/10 rounded-full text-[#004445] hover:bg-[#eaf3f3] transition-colors shadow-sm shrink-0">
                <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </motion.div>

          {/* ─── Product Grid ─── */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-x-8 lg:gap-y-12 min-h-[400px]"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                onClick={() => setSelectedProduct(product)}
              />
            ))}
            
            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full flex flex-col items-center justify-center py-12 sm:py-20 text-[#004445]/50 text-center px-4"
              >
                <Search className="w-10 h-10 sm:w-12 sm:h-12 mb-4 opacity-20" />
                <p className="text-base sm:text-lg font-medium">No products found.</p>
                <p className="text-xs sm:text-sm opacity-70">Try adjusting your search or category filter.</p>
              </motion.div>
            )}
          </motion.div>

          {/* ─── Static Bottom Divider ─── */}
          {filteredProducts.length > 0 && (
            <motion.div
              className="mt-16 sm:mt-24 flex items-center justify-center gap-3 sm:gap-4 px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="h-px flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-r from-transparent to-[#004445]/20" />
              <span className="text-[8px] sm:text-[10px] font-bold tracking-widest uppercase text-[#004445]/40 whitespace-nowrap">
                End of Results
              </span>
              <div className="h-px flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-l from-transparent to-[#004445]/20" />
            </motion.div>
          )}

        </div>
        <Customization />
      </div>

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