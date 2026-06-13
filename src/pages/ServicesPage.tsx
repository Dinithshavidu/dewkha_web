import { motion, useScroll, useTransform, useInView, useSpring, Variants } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, 
  PenTool, 
  UploadCloud, 
  CreditCard, 
  Box,
  Mail,
  Zap,
  Leaf,
  Award,
  Crosshair,
  Settings,
  Truck,
  HeartHandshake,
  ShieldCheck
} from "lucide-react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

// ─── Reusable 3D Tilt Card ──────────────────────────────────────────────────
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

// ─── Data Arrays ────────────────────────────────────────────────────────────
const whyChooseData = [
  { icon: <Zap />, title: "24x7 Running 3D Print Farm", desc: "Our 3D print farm operates 24x7 without any power interruptions, ensuring consistent and efficient production for your projects." },
  { icon: <Leaf />, title: "Green & Sustainable Practices", desc: "DEWKHA is committed to sustainability. Our printing farm is entirely solar-powered, reducing our environmental footprint." },
  { icon: <Award />, title: "Extensive Experience", desc: "With years of experience in the 3D printing industry, we bring a wealth of knowledge and expertise to every project." },
  { icon: <Crosshair />, title: "High Precision & Quality", desc: "Our 3D printers are calibrated and maintained to the highest standards, ensuring the precision and quality of every printed model." },
  { icon: <Settings />, title: "Customization & Personalization", desc: "We understand that each project is unique. DEWKHA offers personalization options, allowing you to tailor prints to specific requirements." },
  { icon: <Truck />, title: "Reliable & Timely Delivery", desc: "Committed to delivering projects on time. Our efficient production processes ensure you receive your 3D prints exactly when you need them." },
  { icon: <HeartHandshake />, title: "Client-Centric Approach", desc: "We prioritize our clients' satisfaction, maintain open communication, provide regular updates, and work closely to fulfill your needs." },
  { icon: <ShieldCheck />, title: "Secure & Confidential", desc: "Your intellectual property is secure with us. DEWKHA adheres to strict confidentiality standards to protect your designs and data." }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
];

// ─── Main Component ─────────────────────────────────────────────────────────
export function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ["start start", "end end"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerChildren: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div ref={pageRef} className="bg-[#f8fafa] min-h-screen relative overflow-hidden pb-20 md:pb-32">
      
      {/* Background Dot Parallax */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          y: bgY,
          backgroundImage: "radial-gradient(circle, #0a1a1a10 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 md:pt-32">

        {/* ─── 1. HERO & GET A QUOTE ─── */}
        <motion.div 
          initial="hidden" 
          animate="show" 
          variants={staggerChildren}
          className="mb-20 md:mb-32 text-center"
        >
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-7xl font-black text-[#0a1a1a] tracking-tight mb-4 sm:mb-6">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004445] to-teal-500">3D Printing & Laser Engraving</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-[#0a1a1a]/60 max-w-2xl mx-auto mb-12 sm:mb-20 leading-relaxed px-2">
            We make sure to provide you the best 3D printing & Laser Engraving service ensuring top-tier print quality. We manually inspect your model to provide you the best price by calculating material cost and print time.
          </motion.p>

          {/* Large Contact Circles Row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
            
            {/* WhatsApp Large Card */}
            <motion.a 
              variants={fadeUp}
              href="https://wa.me/0711332442"
              target="_blank"
              rel="noreferrer"
              className="bg-white rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 w-full max-w-sm flex flex-col items-center shadow-lg hover:shadow-2xl border border-[#004445]/5 hover:border-[#25D366]/30 transition-all duration-500 group transform hover:-translate-y-2"
            >
              {/* Normal Dark Teal -> Real WhatsApp Green */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#1A5C5D] group-hover:bg-[#25D366] transition-colors duration-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-inner relative overflow-hidden shrink-0">
                <FaWhatsapp className="w-12 h-12 sm:w-16 sm:h-16 text-white relative z-10 drop-shadow-md" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0a1a1a] mb-1 sm:mb-2">WhatsApp</h3>
              <p className="text-xl sm:text-3xl font-bold text-[#0a1a1a]/60 group-hover:text-[#0a1a1a] transition-colors duration-500 mb-4 sm:mb-6">071 1332442</p>
              <span className="text-xs sm:text-sm font-bold text-[#1A5C5D] group-hover:text-[#25D366] transition-colors duration-500 group-hover:underline">Click to send files</span>
            </motion.a>

            {/* Email Large Card */}
            <motion.a 
              variants={fadeUp}
              href="mailto:dewkha.creation@gmail.com"
              className="bg-white rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 w-full max-w-sm flex flex-col items-center shadow-lg hover:shadow-2xl border border-[#004445]/5 hover:border-[#3B82F6]/30 transition-all duration-500 group transform hover:-translate-y-2"
            >
              {/* Normal Dark Teal -> Standard Email Blue */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#1A5C5D] group-hover:bg-[#3B82F6] transition-colors duration-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-inner relative overflow-hidden shrink-0">
                <FaEnvelope className="w-10 h-10 sm:w-14 sm:h-14 text-white relative z-10 drop-shadow-md" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0a1a1a] mb-1 sm:mb-2">eMail</h3>
              <p className="text-lg sm:text-2xl font-bold text-[#0a1a1a]/60 group-hover:text-[#0a1a1a] transition-colors duration-500 mb-4 sm:mb-6">dewkha.creation@gmail.com</p>
              <span className="text-xs sm:text-sm font-bold text-[#1A5C5D] group-hover:text-[#3B82F6] transition-colors duration-500 group-hover:underline">Click to email</span>
            </motion.a>

          </div>
        </motion.div>

        {/* ─── 2. DON'T HAVE A MODEL? ─── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="mb-20 md:mb-32"
        >
          <TiltCard className="max-w-4xl mx-auto">
            <div className="bg-[#004445] rounded-3xl sm:rounded-[3rem] p-8 sm:p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden text-center md:text-left">
              <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-teal-400/20 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none" />
              
              <div className="flex-1 relative z-10">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 bg-teal-500/20 rounded-full text-teal-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 sm:mb-6">
                  <PenTool className="w-3 h-3 sm:w-4 sm:h-4" /> Need Design Help?
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4">Don't have a 3D model?</h3>
                <p className="text-sm sm:text-lg text-white/80 leading-relaxed max-w-lg mx-auto md:mx-0">
                  Don't worry. Our specialized CAD designers can translate your conceptual sketches or mechanical requirements into production-ready physical models.
                </p>
              </div>

              <div className="relative z-10 shrink-0 w-full md:w-auto">
                <Link to="/contact" className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-white hover:bg-teal-50 text-[#004445] font-black rounded-xl sm:rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Design Consultation
                </Link>
              </div>
            </div>
          </TiltCard>
        </motion.div>


        {/* ─── 3. THREE EASY STEPS ─── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="mb-20 md:mb-32 border-t border-[#004445]/10 pt-16 md:pt-24"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-black text-[#0a1a1a] text-center mb-10 sm:mb-16">
            Three easy steps to get printed
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch relative">
            {[
              { num: "01", icon: <UploadCloud className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Send files for QUOTATION", desc: "Send us your 3D model files and receive a detailed manual quotation based on exact material and time." },
              { num: "02", icon: <CreditCard className="w-6 h-6 sm:w-8 sm:h-8" />, title: "Confirm & PAYMENT", desc: "Review and confirm the quotation received, then make the secure payment to queue your project." },
              { num: "03", icon: <Box className="w-6 h-6 sm:w-8 sm:h-8" />, title: "UNBOX & Feedback", desc: "Get the 3D printed parts delivered safely to your door-step or pick them up from our local store." }
            ].map((step, i) => (
              <TiltCard key={i} className="h-full">
                <motion.div variants={fadeUp} className="bg-white rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 border border-[#004445]/10 hover:border-teal-400/50 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col group">
                  <div className="flex items-center justify-between mb-6 sm:mb-8">
                    {/* Changed from Blue to Teal */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#f8fafa] border border-[#004445]/5 flex items-center justify-center text-teal-600 group-hover:bg-teal-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm">
                      {step.icon}
                    </div>
                    {/* Changed hover shadow text from Blue to Teal */}
                    <span className="text-5xl sm:text-6xl font-black text-[#0a1a1a]/5 group-hover:text-teal-500/15 transition-colors duration-500">
                      {step.num}
                    </span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-[#0a1a1a] mb-3 sm:mb-4">{step.title}</h4>
                  <p className="text-[#0a1a1a]/60 font-medium leading-relaxed text-sm flex-grow">
                    {step.desc}
                  </p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </motion.div>


        {/* ─── 4. WHY CHOOSE US ─── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="mb-20 md:mb-32 border-t border-[#004445]/10 pt-16 md:pt-24"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a1a1a] text-center mb-10 sm:mb-16 tracking-tight">
            Why Choose Us
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseData.map((item, index) => (
              <TiltCard key={index} className="h-full">
                <motion.div 
                  variants={fadeUp} 
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#004445]/5 hover:border-teal-500/30 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 mb-4 sm:mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300 shrink-0">
                    {item.icon}
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-[#0a1a1a] mb-3 sm:mb-4 leading-tight">{item.title}</h4>
                  <p className="text-xs sm:text-sm font-medium text-[#0a1a1a]/60 leading-relaxed flex-grow">
                    {item.desc}
                  </p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </motion.div>


        {/* ─── 5. AWESOME 3D PRINTS GALLERY ─── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="border-t border-[#004445]/10 pt-16 md:pt-24"
        >
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0a1a1a] text-center mb-10 sm:mb-16 tracking-tight">
            Here are some awesome 3D Prints
          </motion.h2>

          {/* CSS Columns for Masonry Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
            {galleryImages.map((src, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] group break-inside-avoid border border-[#004445]/10"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <img 
                  src={src} 
                  alt={`DEWKHA 3D Print Example ${idx + 1}`} 
                  className="w-full h-auto object-cover transform lg:group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                
                {/* Watermark/Logo Overlay mimicking your screenshot */}
                <div className="absolute bottom-4 right-4 sm:right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/80 rounded-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/80" />
                  </div>
                  <span className="text-white/90 font-bold text-[10px] sm:text-xs tracking-widest">DEWKHA</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}