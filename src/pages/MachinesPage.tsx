import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { CheckCircle2, Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Added string IDs to match the database routing
const allMachines = [
  {
    id: "M-001",
    name: "Bambu Lab A1 Combo 3D Printer",
    type: "3D Printers",
    price: "$399",
    image: "/images/A1-combo-1.jpg",
    features: ["Full-Auto Calibration", "Seamless Multi-Color Printing", "49dB Whisper-Quiet Operation", "Best-In-Class Print Quality", "One-Click MakerWorld Integration", "Full-Scale Build Volume"],
  },
  {
    id: "M-002",
    name: "Bambu Lab A1 3D Printer",
    type: "3D Printers",
    price: "$299",
    image: "/images/A1-1.jpg",
    features: ["Full-Auto Calibration", "49dB Whisper-Quiet Operation", "Best-In-Class Print Quality", "One-Click MakerWorld Integration", "Full-Scale Build Volume"],
  },
  {
    id: "M-003",
    name: "Bambu Lab A1 mini 3D Printer",
    type: "3D Printers",
    price: "$599",
    image: "/images/A1-mini-1.jpg",
    features: ["Full-Auto Calibration", "49dB Whisper-Quiet Operation", "Best-In-Class Print Quality", "One-Click MakerWorld Integration", "Compact Footprint"],
  },
  {
    id: "M-004",
    name: "Bambu Lab A1 mini Combo 3D Printer",
    type: "3D Printers",
    price: "$320",
    image: "/images/A1-mini-combo-1.jpg",
    features: ["Full-Auto Calibration", "49dB Whisper-Quiet Operation", "Best-In-Class Print Quality", "One-Click MakerWorld Integration", "Compact Footprint"],
  },
  {
    id: "M-005",
    name: "Bambu Lab A2L Combo 3D Printer",
    type: "3D Printers",
    price: "$4,100",
    image: "/images/A2L-combo-1.jpg",
    features: ["Expanded Build Volume", "Multi-Tool Ecosystem", "Full-Auto Calibration", "Pro-Scale Stability", "AMS Integration", "Smartphone-Class UI", "Indoor Safe"],
  },
  {
    id: "M-006",
    name: "Bambu Lab A2L 3D Printer",
    type: "3D Printers",
    price: "$5,500",
    image: "/images/A2L-1.jpg",
    features: ["Expanded Build Volume", "Multi-Tool Ecosystem", "Full-Auto Calibration", "Pro-Scale Stability", "AMS Integration", "Smartphone-Class UI", "Indoor Safe"],
  },
  {
    id: "M-007",
    name: "Bambu Lab P1S 3D Printer",
    type: "3D Printers",
    price: "$4,100",
    image: "/images/P1S-1.jpg",
    features: ["15-Minute Rapid Setup", "Fully Enclosed Design", "Multi-Color Versatility", "Farm-Grade Reliability", "Full-Scale Volume"],
  },
  {
    id: "M-008",
    name: "Bambu Lab P1S Combo 3D Printer",
    type: "3D Printers",
    price: "$5,500",
    image: "/images/P1S-combo-1.jpg",
    features: ["15-Minute Rapid Setup", "Fully Enclosed Design", "Multi-Color Versatility", "Farm-Grade Reliability", "Full-Scale Volume"],
  },

  {
    id: "M-009",
    name: "Bambu Lab X2D 3D Printer",
    type: "3D Printers",
    price: "$4,100",
    image: "/images/X2D-1.jpg",
    features: ["Dual nozzle", "Servo Extruder", "Dual-intake cooling", "Active heating", "Adaptive Calibration", "AI Monitoring", "Certified Emissions"],
    
  },
  {
    id: "M-010",
    name: "Bambu Lab X2D Combo 3D Printer",
    type: "3D Printers",
    price: "$5,500",
    image: "/images/X2D-combo-1.jpg",
    features: ["Dual nozzle", "Servo Extruder", "Dual-intake cooling", "Active heating", "Adaptive Calibration", "AI Monitoring", "Certified Emissions"],
  },
];

const categories = ["All", "3D Printers", "Laser Cutters", "Accessories"];

// ─── Feature list item with staggered check animation ─────────────────────────
function FeatureItem({ feature, index, cardInView }: { feature: string; index: number; cardInView: boolean }) {
  return (
    <motion.li
      className="flex items-start sm:items-center text-[#0a1a1a]/60 font-light text-sm sm:text-base lg:text-lg"
      initial={{ opacity: 0, x: -24 }}
      animate={cardInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.2 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        initial={{ scale: 0, rotate: -90 }}
        animate={cardInView ? { scale: 1, rotate: 0 } : {}}
        transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.3 + index * 0.08 }}
        className="mr-3 sm:mr-4 flex-shrink-0 mt-0.5 sm:mt-0"
      >
        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#004445]" />
      </motion.span>
      <span className="leading-snug">{feature}</span>
    </motion.li>
  );
}

// ─── Reusable 3D Machine Card ─────────────────────────────────────────────────
function MachineCard({ machine, index }: { machine: typeof allMachines[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  
  const depthFactor = 0.08 + (index % 2) * 0.06;
  // Reduce vertical parallax on mobile
  const rawY = useTransform(scrollYProgress, [0, 1], [typeof window !== 'undefined' && window.innerWidth < 1024 ? 30 : 60 * depthFactor, typeof window !== 'undefined' && window.innerWidth < 1024 ? -30 : -60 * depthFactor]);
  const smoothY = useSpring(rawY, { stiffness: 65, damping: 18 });

  const isEven = index % 2 === 0;
  // Disable horizontal side-ins on mobile to prevent layout overflow
  const entranceX = typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : (isEven ? -40 : 40);
  const entranceRotY = typeof window !== 'undefined' && window.innerWidth < 1024 ? 0 : (isEven ? -15 : 15);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 0.08s linear";
    el.style.transform = `perspective(1200px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale(1.02)`;
  }
  
  function handleMouseLeave() {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.22,1,0.36,1)";
    el.style.transform = "";
  }

  return (
    <motion.div
      ref={cardRef}
      style={{ y: smoothY, transformPerspective: 1200 }}
      initial={{ opacity: 0, x: entranceX, y: typeof window !== 'undefined' && window.innerWidth < 1024 ? 40 : 0, rotateY: entranceRotY, scale: 0.95 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: (index % 2) * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-[#004445]/10 hover:border-[#004445]/30 transition-all duration-500 group flex flex-col shadow-sm hover:shadow-[0_20px_60px_rgba(0,68,69,0.12)] relative h-full"
    >
      <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-[#004445] to-[#4db8b8] group-hover:w-full transition-all duration-500 ease-out z-30 rounded-t-[2rem] sm:rounded-t-[2.5rem] lg:rounded-t-[3rem]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#eaf3f3]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <motion.div
        className="absolute left-0 w-full h-[2px] z-20 pointer-events-none opacity-50 lg:opacity-0 lg:group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, transparent, #2dd4bf 40%, #2dd4bf 60%, transparent)",
          boxShadow: "0 0 10px 3px rgba(45,212,191,0.45)",
        }}
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
      />

      {/* Scaled image height for mobile */}
      <div className="h-56 sm:h-72 lg:h-80 overflow-hidden flex items-center justify-center relative p-6 sm:p-8 bg-[#eaf3f3]/40">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(45,212,191,0.10) 0%, transparent 80%)" }}
        />
        <img
          src={machine.image}
          alt={machine.name}
          className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,68,69,0.15)] relative z-10 transform lg:group-hover:scale-105 lg:group-hover:-translate-y-2 transition-all duration-700 ease-out"
        />
      </div>

      <div className="p-6 sm:p-8 lg:p-10 flex flex-col flex-grow relative z-20">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-6 sm:mb-8 gap-2 sm:gap-4 border-b border-[#004445]/10 pb-4 sm:pb-6">
          <div>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#004445] mb-1.5 sm:mb-2 block">
              {machine.type}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#0a1a1a] leading-tight">
              {machine.name}
            </h3>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-[#004445] mt-2 xl:mt-0">
            {machine.price}
          </span>
        </div>

        <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 flex-grow">
          {machine.features.map((feature, i) => (
            <FeatureItem key={feature} feature={feature} index={i} cardInView={isInView} />
          ))}
        </ul>

        <Link
          to={`/machine/${machine.id}`}
          className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#004445] text-white font-bold text-base sm:text-lg shadow-[0_0_30px_rgba(0,68,69,0.15)] relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,68,69,0.28)] active:scale-95 group/btn flex justify-center items-center"
        >
          <motion.span
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)" }}
          />
          View Specifications
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export function MachinesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMachines = useMemo(() => {
    return allMachines.filter((machine) => {
      const matchesCategory = activeCategory === "All" || machine.type === activeCategory;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = machine.name.toLowerCase().includes(searchLower) || 
                            machine.features.some(f => f.toLowerCase().includes(searchLower));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafa] relative overflow-hidden pt-6 pb-20 sm:pb-32">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #0a1a1a08 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
      <div className="absolute top-0 left-0 md:left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[150px] md:blur-[200px] opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-0 right-0 md:right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-teal-700 rounded-full mix-blend-multiply filter blur-[120px] md:blur-[180px] opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ─── Hero Section ─── */}
        <div className="text-center mb-10 sm:mb-12 pt-4 max-w-3xl mx-auto">
          <motion.div
            className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-4 w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="h-[2px] w-6 sm:w-8 bg-teal-500 block" />
            <span className="text-teal-700 text-[10px] sm:text-sm font-bold tracking-widest uppercase">
              Equipment Catalog
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-teal-500 block" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black text-[#0a1a1a] mb-4 sm:mb-6 tracking-tight leading-[1.1] sm:leading-[1.05]">
            <motion.span 
              initial={{ opacity: 0, y: 30, rotateX: -30 }} 
              animate={{ opacity: 1, y: 0, rotateX: 0 }} 
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="inline-block"
              style={{ transformPerspective: 800 }}
            >
              Professional
            </motion.span>{" "}
            <motion.span 
              initial={{ opacity: 0, y: 30, rotateX: -30 }} 
              animate={{ opacity: 1, y: 0, rotateX: 0 }} 
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-[#004445] inline-block"
              style={{ transformPerspective: 800 }}
            >
              Machines
            </motion.span>
          </h1>
          
          <motion.p
            className="text-[#0a1a1a]/60 text-base sm:text-lg md:text-xl font-medium sm:font-light leading-relaxed px-2 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Equip your workspace with the exact industrial-grade machines we use daily. Built for precision, speed, and absolute reliability.
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
                    layoutId="active-machine-pill"
                    className="absolute inset-0 bg-[#004445] rounded-full z-0 shadow-md"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex gap-2 sm:gap-3 w-full lg:w-auto">
            <div className="relative w-full lg:w-72">
              <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004445]/40" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or feature..." 
                className="w-full bg-white border border-[#004445]/10 rounded-full py-2.5 sm:py-3 pl-9 sm:pl-11 pr-4 text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all shadow-sm text-[#0a1a1a] placeholder:text-[#004445]/30"
              />
            </div>
            <button className="p-2.5 sm:p-3 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white border border-[#004445]/10 rounded-full text-[#004445] hover:bg-[#eaf3f3] transition-colors shadow-sm shrink-0">
              <SlidersHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </motion.div>

        {/* ─── Machine Grid ─── */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 min-h-[400px]"
        >
          {filteredMachines.map((machine, index) => (
            <MachineCard key={machine.id} machine={machine} index={index} />
          ))}
          
          {filteredMachines.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full flex flex-col items-center justify-center py-12 sm:py-20 text-[#004445]/50 px-4 text-center"
            >
              <Search className="w-10 h-10 sm:w-12 sm:h-12 mb-4 opacity-20" />
              <p className="text-base sm:text-lg font-medium">No machines found.</p>
              <p className="text-xs sm:text-sm opacity-70">Try adjusting your search or category filter.</p>
            </motion.div>
          )}
        </motion.div>

        {/* ─── Static Bottom Divider ─── */}
        {filteredMachines.length > 0 && (
          <motion.div
            className="mt-16 sm:mt-24 flex items-center justify-center gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="h-px flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-r from-transparent to-[#004445]/20" />
            <span className="text-[8px] sm:text-[10px] font-bold tracking-widest uppercase text-[#004445]/40 whitespace-nowrap">
              End of Equipment List
            </span>
            <div className="h-px flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-l from-transparent to-[#004445]/20" />
          </motion.div>
        )}

      </div>
    </div>
  );
}