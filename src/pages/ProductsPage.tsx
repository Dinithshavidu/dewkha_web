import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { Customization } from "../components/Customization";

// Expanded product list for the full page
const allProducts = [
  { id: 1, code: "DWK-001", name: "Custom Architect Model", category: "3D Printing", price: "From $45", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800" },
  { id: 2, code: "DWK-002", name: "Precision Engine Parts", category: "Laser Cutting", price: "From $85", image: "https://images.unsplash.com/photo-1583122621175-57356c802bc6?auto=format&fit=crop&q=80&w=800" },
  { id: 3, code: "DWK-003", name: "Artisanal Vase Collection", category: "3D Printing", price: "From $30", image: "https://images.unsplash.com/photo-1612015900222-0a1a01acb5f1?auto=format&fit=crop&q=80&w=800" },
  { id: 4, code: "DWK-004", name: "Acrylic Signage", category: "Laser Cutting", price: "From $60", image: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?auto=format&fit=crop&q=80&w=800" },
  { id: 5, code: "DWK-005", name: "Mechanical Keyboard Case", category: "3D Printing", price: "From $110", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800" },
  { id: 6, code: "DWK-006", name: "Custom Wedding Invites", category: "Laser Cutting", price: "From $15", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800" },
  { id: 7, code: "DWK-007", name: "Topographical Map", category: "3D Printing", price: "From $200", image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800" },
  { id: 8, code: "DWK-008", name: "Leather Wallets Pattern", category: "Laser Cutting", price: "From $40", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800" },
];

const categories = ["All", "3D Printing", "Laser Cutting"];

// ─── Reusable 3D Product Card ─────────────────────────────────────────────────
function ProductCard({ product, index }: { product: typeof allProducts[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-40px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  const depthFactor = 0.05 + (index % 4) * 0.02;
  const rawY = useTransform(scrollYProgress, [0, 1], [40 * depthFactor, -40 * depthFactor]);
  const smoothY = useSpring(rawY, { stiffness: 70, damping: 18 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 0.08s linear";
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  }
  
  function handleMouseLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "";
  }

  const flipAxis = index % 2 === 0 ? { rotateY: -20 } : { rotateX: 15 };

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
    >
      <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-[#eaf3f3] border border-[#004445]/10 group-hover:border-[#004445]/30 group-hover:shadow-[0_20px_60px_rgba(0,68,69,0.15)] transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a1a] via-[#0a1a1a]/40 to-transparent opacity-70 z-10" />
        
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
        />

        <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-[#004445] to-[#4db8b8] group-hover:w-full transition-all duration-500 ease-out z-30 rounded-t-[2rem]" />

        <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end h-full">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[#4db8b8] mb-2">
              {product.category}
            </p>
            <h3 className="text-xl font-bold text-white leading-tight mb-1">
              {product.name}
            </h3>
            <p className="text-xs font-mono text-white/60 tracking-widest mb-3">
              {product.code}
            </p>
            <div className="h-px w-8 bg-[#4db8b8] mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-[#b5eded] font-medium block text-base">
              {product.price}
            </span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center backdrop-blur-sm">
            <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
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
    // Top padding reduced from pt-24 to pt-6 for better spacing
    <div className="min-h-screen bg-[#f8fafa] relative overflow-hidden pt-6 pb-32">
      
      {/* Background Parallax Grid & Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #0a1a1a08 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[200px] opacity-[0.07] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-teal-700 rounded-full mix-blend-multiply filter blur-[180px] opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Hero Section ─── */}
        <div className="text-center md:text-left mb-12 pt-4">
          <motion.div
            className="inline-flex items-center justify-center md:justify-start gap-3 mb-4 w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="h-[2px] w-8 bg-teal-500 block" />
            <span className="text-teal-700 text-sm font-bold tracking-widest uppercase">
              Full Catalog
            </span>
            <span className="h-[2px] w-8 bg-teal-500 block md:hidden" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-[#0a1a1a] mb-6 tracking-tight leading-[1.05]">
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
              className="text-[#004445] block"
            >
              Collection
            </motion.span>
          </h1>
          
          <motion.p
            className="text-[#0a1a1a]/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto md:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore our wide range of premium 3D printed and expertly laser-cut products. Standard models or fully customized, we bring your vision to reality.
          </motion.p>
        </div>

        {/* ─── Filters & Search ─── */}
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-16 border-y border-[#004445]/10 py-6"
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
                className={`relative px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-colors duration-300 whitespace-nowrap ${
                  activeCategory === category 
                    ? "text-white" 
                    : "text-[#004445]/60 hover:text-[#004445] hover:bg-[#004445]/5"
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-[#004445] rounded-full z-0 shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>

          {/* Working Search Bar */}
          <div className="flex gap-3 w-full lg:w-auto">
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004445]/40" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or code..." 
                className="w-full bg-white border border-[#004445]/10 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all shadow-sm text-[#0a1a1a] placeholder:text-[#004445]/30"
              />
            </div>
            <button className="p-2.5 bg-white border border-[#004445]/10 rounded-full text-[#004445] hover:bg-[#eaf3f3] transition-colors shadow-sm shrink-0">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* ─── Product Grid ─── */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 min-h-[400px]"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
          
          {filteredProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-20 text-[#004445]/50"
            >
              <Search className="w-12 h-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No products found.</p>
              <p className="text-sm opacity-70">Try adjusting your search or category filter.</p>
            </motion.div>
          )}
        </motion.div>

        {/* ─── Static Bottom Divider ─── */}
        {filteredProducts.length > 0 && (
          <motion.div
            className="mt-24 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-[#004445]/20" />
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#004445]/40">
              End of Results
            </span>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-[#004445]/20" />
          </motion.div>
        )}

      </div>
      <Customization />
    </div>
  );
}