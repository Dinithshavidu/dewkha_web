import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "motion/react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();

  // Navbar shrinks + darkens on scroll
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isActive = (path: string) => location.pathname === path;

  // Nav links config
  const links = [
    { to: "/",        label: "Home"     },
    { to: "/services",label: "Services" },
    { to: "/machines",label: "Machines" },
    { to: "/products",label: "Products" },
    { to: "/about",   label: "About Us" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-xl border-b border-[#004445]/10 transition-colors duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.80)",
        boxShadow: scrolled ? "0 4px 32px rgba(0,68,69,0.08)" : "none",
      }}
      // Slide down on mount
      initial={{ y: -96, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top teal accent line — draws across on mount */}
      <motion.div
        className="absolute top-0 left-0 h-[3px] bg-gradient-to-r from-[#004445] via-teal-400 to-transparent z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "left", width: "100%" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex justify-between items-center transition-all duration-300"
          animate={{ height: scrolled ? 72 : 96 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Logo - Restored to exact original settings */}
          <motion.div
            className="flex-shrink-0 flex items-center z-50"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/" className="flex items-center group" onClick={() => setIsOpen(false)}>
              <motion.img
                src="/Dewkha-logo.png"
                alt="DEWKHA Logo"
                className="w-auto object-contain"
                animate={{ height: scrolled ? 28 : 32 }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.07 }}
              />
            </Link>
          </motion.div>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center space-x-10">
            {links.map(({ to, label }, i) => (
              <NavLink
                key={to}
                to={to}
                label={label}
                active={isActive(to)}
                delay={0.3 + i * 0.07}
              />
            ))}

            {/* CTA button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: 0.62,
              }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 text-sm font-black tracking-widest uppercase rounded-full text-white bg-[#004445] hover:bg-[#003334] transition-colors relative overflow-hidden group shadow-[0_0_20px_rgba(0,68,69,0.2)]"
              >
                {/* Shimmer */}
                <motion.span
                  className="absolute inset-0 pointer-events-none"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{
                    background:
                      "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)",
                  }}
                />
                Contact Us
              </Link>
            </motion.div>
          </div>

          {/* Mobile hamburger */}
          <motion.div
            className="lg:hidden flex items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#004445] p-2 focus:outline-none bg-teal-50/50 rounded-full hover:bg-teal-100 transition-colors"
              whileTap={{ scale: 0.88 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="block"
                  >
                    <X className="h-7 w-7" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="block"
                  >
                    <Menu className="h-7 w-7" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-[#004445]/10 absolute left-0 right-0 shadow-[0_20px_40px_rgba(0,68,69,0.1)] overflow-hidden origin-top"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Scan-line sweeps drawer on open */}
            <motion.div
              className="absolute left-0 w-full h-[2px] pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(90deg,transparent,#2dd4bf 40%,#2dd4bf 60%,transparent)",
                boxShadow: "0 0 10px 3px rgba(45,212,191,0.4)",
              }}
              initial={{ top: "0%", opacity: 0 }}
              animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />

            {/* Mobile Nav Links Container */}
            <div className="px-6 pt-6 pb-10 space-y-2">
              {links.map(({ to, label }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{
                    duration: 0.32,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    to={to}
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-4 text-lg font-bold rounded-2xl transition-colors ${
                      isActive(to)
                        ? "bg-[#004445]/10 text-[#004445]"
                        : "text-[#004445]/60 hover:bg-[#004445]/5 hover:text-[#004445]"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, delay: links.length * 0.05 }}
                className="pt-4"
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-5 text-lg font-black text-white bg-[#004445] rounded-2xl text-center shadow-lg active:scale-95 transition-transform"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Individual nav link with animated underline indicator (Desktop) ───────────
function NavLink({
  to,
  label,
  active,
  delay,
}: {
  to: string;
  label: string;
  active: boolean;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        to={to}
        className={`text-sm font-bold tracking-widest uppercase transition-colors ${
          active ? "text-[#004445]" : "text-[#004445]/50 hover:text-[#004445]"
        }`}
      >
        {label}
      </Link>

      {/* Active dot */}
      {active && (
        <motion.span
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.8)]"
          layoutId="nav-dot"
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        />
      )}

      {/* Hover underline draws left→right */}
      <motion.span
        className="absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#004445] to-teal-400"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered && !active ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{ transformOrigin: "left", width: "100%" }}
      />
    </motion.div>
  );
}