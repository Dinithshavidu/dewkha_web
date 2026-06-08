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
      className="relative inline-block text-brand-200 hover:text-white transition-colors group/link"
      initial={{ opacity: 0, x: -14 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 4 }}
    >
      {/* Teal left tick on hover */}
      <motion.span
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-[2px] rounded-full bg-teal-500 opacity-0 group-hover/link:opacity-100"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={{ transformOrigin: "left" }}
      />
      {children}
    </motion.span>
  );

  return (
    <li>
      {to ? (
        <Link to={to} className="text-sm font-light">
          {inner}
        </Link>
      ) : (
        <a href={href ?? "#"} className="text-sm font-light">
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
      className="text-white font-bold mb-6 font-heading tracking-wide"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
      {/* Teal underline draws after heading */}
      <motion.div
        className="mt-2 h-[2px] bg-gradient-to-r from-teal-500/50 to-transparent rounded-full"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.15, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
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

  // Footer rises up as it enters from bottom
  const rawY = useTransform(scrollYProgress, [0, 0.4], [60, 0]);
  const smoothY = useSpring(rawY, { stiffness: 70, damping: 20 });

  // Subtle scale
  const rawScale = useTransform(scrollYProgress, [0, 0.4], [0.97, 1]);
  const smoothScale = useSpring(rawScale, { stiffness: 70, damping: 20 });

  // Parallax dot grid inside footer
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const quickLinks = [
    { to: "/",         label: "Home"       },
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
      className="bg-brand-950 text-brand-100 py-16 border-t border-brand-900 relative overflow-hidden"
      style={{ y: smoothY, scale: smoothScale, transformOrigin: "bottom center" }}
    >
      {/* Scan-line sweeps footer on entry */}
      <motion.div
        className="absolute left-0 w-full h-[2px] z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #2dd4bf 30%, #2dd4bf 70%, transparent 100%)",
          boxShadow: "0 0 12px 3px rgba(45,212,191,0.4)",
        }}
        initial={{ top: "0%", opacity: 0 }}
        animate={isInView ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
        transition={{ duration: 1.4, delay: 0.1, ease: "easeInOut" }}
      />

      {/* Parallax dot grid */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          y: bgY,
          backgroundImage:
            "radial-gradient(circle, rgba(45,212,191,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient teal glow — bottom left */}
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(45,212,191,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand column */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <motion.div
                className="text-3xl font-heading font-black text-white tracking-tighter"
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
              className="text-brand-200/70 text-sm mb-6 leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Precision 3D printing and laser cutting services. Bringing your
              digital ideas into the physical world.
            </motion.p>

            {/* Mini teal nozzle line */}
            <motion.div
              className="h-[2px] bg-gradient-to-r from-teal-500/60 to-transparent rounded-full"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          {/* Quick links */}
          <div>
            <ColHeading delay={0.2}>Quick Links</ColHeading>
            <ul className="space-y-3">
              {quickLinks.map(({ to, label }, i) => (
                <FooterLink key={to} to={to} delay={0.25 + i * 0.06}>
                  {label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <ColHeading delay={0.3}>Services</ColHeading>
            <ul className="space-y-3">
              {services.map((s, i) => (
                <FooterLink key={s} href="#" delay={0.35 + i * 0.06}>
                  {s}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Connect & Contact */}
          <div>
            <ColHeading delay={0.4}>Connect</ColHeading>
            
            {/* Social Icons */}
            <motion.div 
              className="flex gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <a href="#" className="w-10 h-10 rounded-full bg-brand-900/50 border border-brand-800 flex items-center justify-center text-brand-200 hover:bg-brand-900 hover:text-[#25D366] transition-all">
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-900/50 border border-brand-800 flex items-center justify-center text-brand-200 hover:bg-brand-900 hover:text-[#1877F2] transition-all">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-900/50 border border-brand-800 flex items-center justify-center text-brand-200 hover:bg-brand-900 hover:text-[#E1306C] transition-all">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-900/50 border border-brand-800 flex items-center justify-center text-brand-200 hover:bg-brand-900 hover:text-white transition-all">
                <FaTiktok className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.48 }}
              className="mb-6"
            >
              <a
                href="mailto:dewkha@gmail.com"
                className="text-sm font-light text-brand-200 hover:text-teal-400 transition-colors flex items-center gap-2 group w-fit"
              >
                <FaEnvelope className="w-4 h-4 text-teal-500/70 group-hover:text-teal-400 transition-colors" />
                dewkha@gmail.com
              </a>
            </motion.div>

            {/* Plain Phone Numbers */}
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a href="tel:+15551234567" className="text-sm font-light text-brand-200 hover:text-teal-400 transition-colors flex items-center gap-2 group w-fit">
                <span className="text-teal-500/50 text-xs group-hover:text-teal-400 transition-colors">◆</span>
                +1 (555) 123-4567
              </a>
              <a href="tel:+15559876543" className="text-sm font-light text-brand-200 hover:text-teal-400 transition-colors flex items-center gap-2 group w-fit">
                <span className="text-teal-500/50 text-xs group-hover:text-teal-400 transition-colors">◆</span>
                +1 (555) 987-6543
              </a>
            </motion.div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 relative">
          {/* Teal border draws across */}
          <motion.div
            className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-teal-500/40 via-teal-400/20 to-transparent rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            style={{ transformOrigin: "left", width: "100%" }}
          />

          <motion.p
            className="text-sm text-brand-200/50 font-light text-center md:text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.75 }}
          >
            &copy; {new Date().getFullYear()} DEWKHA. All rights reserved.
          </motion.p>

          {/* Heartbeat nozzle dot */}
          <motion.div
            className="flex items-center gap-2 text-xs text-brand-200/30 font-light"
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