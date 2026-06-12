import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "motion/react";
import { useRef } from "react";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";

// ─── Animated footer link ─────────────────────────────────────────────────────
function FooterLink({
  to,
  href,
  children,
  delay,
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const inner = (
    <motion.span
      ref={ref}
      // Enforce text centering on mobile, left on md+
      className="relative inline-block w-full text-center md:text-left text-white/70 hover:text-white transition-colors group/link py-1.5 md:py-1"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: typeof window !== 'undefined' && window.innerWidth >= 768 ? 4 : 0 }}
    >
      {/* Teal left tick on hover - HIDDEN ON MOBILE because hover doesn't exist and text is centered */}
      <motion.span
        className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-[2px] rounded-full bg-teal-500 opacity-0 group-hover/link:opacity-100"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{ transformOrigin: "left" }}
      />
      {children}
    </motion.span>
  );

  return (
    <li className="w-full flex justify-center md:justify-start">
      {to ? (
        <Link to={to} className="text-base md:text-sm font-light block w-full">
          {inner}
        </Link>
      ) : (
        <a href={href ?? "#"} className="text-base md:text-sm font-light block w-full">
          {inner}
        </a>
      )}
    </li>
  );
}

// ─── Column heading ───────────────────────────────────────────────────────────
function ColHeading({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.h4
      ref={ref}
      // Center heading on mobile
      className="text-white font-bold mb-4 sm:mb-6 font-heading tracking-wide text-lg sm:text-base flex flex-col items-center md:items-start w-full"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
      {/* Teal underline draws from center on mobile, left on desktop */}
      <motion.div
        className="mt-2 h-[2px] bg-gradient-to-r from-teal-500/50 to-transparent rounded-full w-[40px] md:w-full md:max-w-none"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.15, ease: "easeOut" }}
        style={{ transformOrigin: typeof window !== 'undefined' && window.innerWidth < 768 ? "center" : "left" }}
      />
    </motion.h4>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const rawY = useTransform(scrollYProgress, [0, 0.4], [typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 60, 0]);
  const smoothY = useSpring(rawY, { stiffness: 70, damping: 20 });

  const rawScale = useTransform(scrollYProgress, [0, 0.4], [0.98, 1]);
  const smoothScale = useSpring(rawScale, { stiffness: 70, damping: 20 });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const quickLinks = [
    { to: "/",         label: "Home"       },
    { to: "/services", label: "Services"   },
    { to: "/products", label: "Products"   },
    { to: "/machines", label: "Machines"   },
    { to: "/about",    label: "About Us"   },
    { to: "/contact",  label: "Contact Us" },
  ];

  const services = [
    "Custom 3D Printing",
    "Laser Cutting",
    "Prototyping",
    "Machine Maintenance",
  ];

  return (
    <motion.footer
      ref={footerRef}
      className="bg-[#0a1a1a] text-[#f8fafa] py-12 lg:py-16 border-t border-white/10 relative overflow-hidden"
      style={{ y: smoothY, scale: smoothScale, transformOrigin: "bottom center" }}
    >
      <motion.div
        className="absolute left-0 w-full h-[2px] z-20 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #2dd4bf 30%, #2dd4bf 70%, transparent 100%)",
          boxShadow: "0 0 12px 3px rgba(45,212,191,0.4)",
        }}
        initial={{ top: "0%", opacity: 0 }}
        animate={isInView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.4, delay: 0.1, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          y: bgY,
          backgroundImage: "radial-gradient(circle, rgba(45,212,191,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[200px] md:h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(45,212,191,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 lg:gap-12 mb-10 lg:mb-12">

          {/* Brand column */}
          <motion.div
            className="sm:col-span-2 lg:col-span-1 flex flex-col items-center md:items-start text-center md:text-left"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <motion.div
                className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tighter"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                DEW
                <motion.span
                  className="text-teal-400 inline-block"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  KHA
                </motion.span>
              </motion.div>
            </Link>

            <motion.p
              className="text-white/60 text-sm mb-6 leading-relaxed font-light max-w-sm sm:max-w-md"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Precision 3D printing and laser cutting services. Bringing your
              digital ideas into the physical world.
            </motion.p>

            <motion.div
              className="h-[2px] bg-gradient-to-r from-teal-500/60 to-transparent rounded-full w-full max-w-[150px]"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
              style={{ transformOrigin: typeof window !== 'undefined' && window.innerWidth < 768 ? "center" : "left" }}
            />
          </motion.div>

          {/* Quick links */}
          <div className="flex flex-col items-center md:items-start w-full">
            <ColHeading delay={0.2}>Quick Links</ColHeading>
            <ul className="space-y-3 sm:space-y-3 w-full flex flex-col items-center md:items-start">
              {quickLinks.map(({ to, label }, i) => (
                <FooterLink key={to} to={to} delay={0.25 + i * 0.06}>
                  {label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start w-full">
            <ColHeading delay={0.3}>Services</ColHeading>
            <ul className="space-y-3 sm:space-y-3 w-full flex flex-col items-center md:items-start">
              {services.map((s, i) => (
                <FooterLink key={s} href="#" delay={0.35 + i * 0.06}>
                  {s}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Connect & Contact */}
          <div className="flex flex-col items-center md:items-start w-full">
            <ColHeading delay={0.4}>Connect</ColHeading>
            
            <motion.div 
              className="flex flex-wrap justify-center md:justify-start gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-[#25D366] transition-all">
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-[#1877F2] transition-all">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-[#E1306C] transition-all">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all">
                <FaTiktok className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="mb-5 flex justify-center md:justify-start w-full"
            >
              <a
                href="mailto:info@dewkha.lk"
                className="text-base md:text-sm font-light text-white/70 hover:text-teal-400 transition-colors flex items-center gap-2 group w-fit"
              >
                <FaEnvelope className="w-4 h-4 text-teal-500/70 group-hover:text-teal-400 transition-colors" />
                info@dewkha.lk
              </a>
            </motion.div>

            <motion.div
              className="flex flex-col gap-2 w-full items-center md:items-start"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a href="tel:+94779727375" className="text-base md:text-sm font-light text-white/70 hover:text-teal-400 transition-colors flex items-center gap-2 group w-fit">
                <span className="text-teal-500/50 text-[10px] md:text-xs group-hover:text-teal-400 transition-colors">◆</span>
                077 9727375
              </a>
            </motion.div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative">
          <motion.div
            className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-teal-500/40 via-teal-400/20 to-transparent rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            style={{ transformOrigin: "left", width: "100%" }}
          />

          <motion.p
            className="text-xs sm:text-sm text-white/50 font-light text-center md:text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            &copy; {new Date().getFullYear()} DEWKHA. All rights reserved.
          </motion.p>

          <motion.div
            className="flex items-center gap-2 text-xs text-white/30 font-light"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.85 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block"
              animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            Crafted with precision
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}