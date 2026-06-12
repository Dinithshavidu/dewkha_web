import { useParams, Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { CheckCircle2, ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { machinesDB } from "../data/machines";

export function MachineDetailsPage() {
  const { machineId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const machine = machinesDB.find(m => m.id === machineId);

  if (!machine) {
    return (
      <div className="min-h-screen pt-24 md:pt-32 pb-24 md:pb-32 bg-[#f8fafa] flex items-center justify-center px-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0a1a1a]">Machine Not Found</h1>
      </div>
    );
  }

  const whatsappUrl = `https://wa.me/${machine.whatsappNumber}?text=${encodeURIComponent(`Hi DEWKHA! I am interested in ordering the ${machine.name} (${machine.code}).`)}`;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % machine.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + machine.images.length) % machine.images.length);

  // Common staggered animation settings
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 md:pb-32 bg-[#f8fafa] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. TOP SPLIT SCREEN */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Left: Image Carousel */}
          <motion.div className="lg:col-span-7" variants={itemVariants}>
            <div className="bg-white rounded-3xl sm:rounded-[3rem] p-6 sm:p-12 border border-[#004445]/10 aspect-square flex items-center justify-center relative shadow-sm group">
              <motion.img 
                key={currentImageIndex} 
                src={machine.images[currentImageIndex]} 
                alt={`${machine.name} - Current Variant View`} 
                className="w-full h-full object-contain mix-blend-multiply" 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              {machine.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage} 
                    className="absolute left-3 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md hover:bg-teal-50 text-[#004445] hover:text-teal-600 transition-all border border-[#004445]/10 opacity-100 lg:opacity-0 group-hover:opacity-100 hover:scale-105"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button 
                    onClick={nextImage} 
                    className="absolute right-3 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-md hover:bg-teal-50 text-[#004445] hover:text-teal-600 transition-all border border-[#004445]/10 opacity-100 lg:opacity-0 group-hover:opacity-100 hover:scale-105"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  
                  {/* Image Indicators */}
                  <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {machine.images.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? "w-5 sm:w-6 bg-teal-500" : "w-1.5 sm:w-2 bg-teal-500/20"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Right: Info & Ordering */}
          <motion.div className="lg:col-span-5 flex flex-col justify-center" variants={containerVariants}>
            <motion.h1 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0a1a1a] leading-[1.1] mb-2 text-center lg:text-left">
              {machine.name}
            </motion.h1>
            
            {/* Product Code Sub-Heading */}
            <motion.p variants={itemVariants} className="text-[10px] sm:text-xs font-bold text-[#0a1a1a]/40 tracking-wider uppercase mb-4 sm:mb-6 text-center lg:text-left">
              Product Code: {machine.code}
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#004445] mb-6 sm:mb-10 text-center lg:text-left">
              {machine.price}
            </motion.p>
            
            {/* Order Button */}
            <motion.a 
              variants={itemVariants}
              href={whatsappUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="w-full text-center py-4 sm:py-5 bg-[#004445] text-white font-bold rounded-2xl mb-8 sm:mb-12 hover:bg-[#003334] hover:shadow-[0_12px_40px_rgba(0,68,69,0.25)] transition-all flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              Order via WhatsApp
            </motion.a>

            {/* Clickable Variants */}
            {machine.variants && machine.variants.length > 0 && (
              <motion.div variants={itemVariants} className="mb-6">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0a1a1a]/50 mb-3 sm:mb-4 text-center lg:text-left">Select Configuration</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {machine.variants.map(variant => (
                    <Link 
                      key={variant.id} 
                      to={`/machine/${variant.id}`}
                      className={`p-3 sm:p-5 rounded-2xl border transition-all flex items-center gap-3 sm:gap-5 ${
                        machine.id === variant.id 
                          ? 'border-teal-500 bg-teal-50/50 shadow-sm ring-1 ring-teal-500' 
                          : 'border-[#004445]/10 hover:border-teal-300 hover:bg-white bg-white/50 hover:shadow-sm'
                      }`}
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-xl flex items-center justify-center p-2 shrink-0 border border-black/5">
                        <img src={variant.image} className="w-full h-full object-contain mix-blend-multiply" alt={`${variant.name} variant selection`} />
                      </div>
                      <div>
                        <p className="font-bold text-sm sm:text-base text-[#0a1a1a] leading-tight mb-1 sm:mb-1.5">{variant.name}</p>
                        <p className="text-teal-600 text-xs sm:text-sm font-black">{variant.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* 2. DIVIDER & KEY FEATURES AREA */}
        {machine.features && machine.features.length > 0 && (
          <div className="pt-12 sm:pt-20 border-t border-[#004445]/10 mb-20 sm:mb-32">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0a1a1a] mb-8 sm:mb-10 text-center">Key System Specifications</h2>
              <div className="space-y-4 sm:space-y-8">
                {machine.features.map((feature, i) => (
                  <div key={i} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#004445]/10 flex items-start gap-4 sm:gap-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-2 bg-teal-50 rounded-lg sm:rounded-xl shrink-0 text-teal-600 mt-1 sm:mt-0">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <p className="text-[#0a1a1a]/80 font-medium text-base sm:text-lg leading-relaxed sm:pt-1">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
          
        {/* 3. COMPATIBLE ACCESSORIES SECTION */}
        {machine.accessories && machine.accessories.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-20 sm:mb-32 pt-12 sm:pt-20 border-t border-[#004445]/10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1a1a] mb-8 sm:mb-12 text-center">Compatible Accessories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {machine.accessories.map((acc, i) => (
                <div key={i} className="bg-white rounded-3xl sm:rounded-[2rem] p-5 sm:p-6 border border-[#004445]/10 flex flex-col sm:flex-row items-center sm:items-start lg:items-center text-center sm:text-left gap-6 sm:gap-8 shadow-sm hover:shadow-lg hover:border-teal-500/30 transition-all duration-300">
                  <div className="w-32 h-32 md:w-40 md:h-40 bg-[#f8fafa] rounded-2xl sm:rounded-xl flex items-center justify-center shrink-0 p-4">
                    <img src={acc.image} alt={acc.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-grow w-full">
                    <p className="text-[10px] font-bold text-teal-600 tracking-widest uppercase mb-1 sm:mb-2">{acc.code}</p>
                    <h4 className="font-bold text-[#0a1a1a] text-lg sm:text-xl leading-tight mb-2 sm:mb-3">{acc.name}</h4>
                    <p className="text-xl sm:text-2xl font-black text-[#004445] mb-4 sm:mb-5">{acc.price}</p>
                    <a 
                      href={`https://wa.me/${machine.whatsappNumber}?text=${encodeURIComponent(`I want to add the ${acc.name} (${acc.code}) to my order.`)}`}
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-block w-full sm:w-auto px-8 py-3 bg-[#eaf3f3] hover:bg-teal-500 hover:text-white text-[#004445] text-sm font-bold rounded-full transition-colors text-center"
                    >
                      Add to Order
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
          
        {/* 4. PRODUCT YOUTUBE VIDEO */}
        {machine.productVideoId && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20 sm:mb-32"
          >
            <div className="aspect-video lg:aspect-[21/9] w-full bg-black rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#004445]/10">
              <iframe 
                className="w-full h-full" 
                src={machine.productVideoId} 
                title="Product Video" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
          
        {/* 5. WHY CHOOSE SECTION */}
        {machine.whyChoose && machine.whyChoose.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-20 sm:mb-32 pt-12 sm:pt-20 border-t border-[#004445]/10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1a1a] mb-10 sm:mb-16 text-center px-4">Why Choose {machine.name}?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {machine.whyChoose.map((card, i) => (
                <div key={i} className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#004445]/10 overflow-hidden shadow-sm group hover:shadow-xl transition-shadow duration-500">
                  <div className="h-48 sm:h-56 overflow-hidden relative bg-[#f8fafa]">
                    <img src={card.image} alt="Feature demonstration" className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6 sm:p-8">
                    <p className="text-[#0a1a1a]/80 font-medium text-base sm:text-lg leading-relaxed text-center md:text-left">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
          
        {/* 6. TECH SPECS TABLE */}
        {machine.specs && machine.specs.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-20 sm:mb-32 pt-12 sm:pt-20 border-t border-[#004445]/10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1a1a] mb-8 sm:mb-12 text-center">Tech Specs</h2>
            <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-[#004445]/10 overflow-hidden shadow-sm">
              
              {/* Header */}
              <div className="grid grid-cols-12 bg-[#333333] text-white font-bold text-[10px] sm:text-sm uppercase tracking-wider">
                <div className="col-span-4 p-4 sm:p-6 text-center border-r border-white/10">Item</div>
                <div className="col-span-8 p-4 sm:p-6 text-center">{machine.name} Specs</div>
              </div>
              
              {/* Body */}
              <div>
                {machine.specs.map((specCategory, idx) => (
                  <div key={idx} className="grid grid-cols-12 border-b border-[#004445]/10 last:border-b-0">
                    
                    {/* Category Label */}
                    <div className="col-span-12 sm:col-span-4 p-4 sm:p-6 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-[#004445]/10 bg-[#f8fafa]">
                      <span className="font-bold text-[#0a1a1a] text-sm sm:text-base text-center">{specCategory.category}</span>
                    </div>
                    
                    {/* Rows */}
                    <div className="col-span-12 sm:col-span-8 flex flex-col">
                      {specCategory.rows.map((row, rowIdx) => (
                        <div key={rowIdx} className="grid grid-cols-1 sm:grid-cols-2 p-4 sm:p-6 border-b border-[#004445]/5 last:border-b-0 items-center gap-1 sm:gap-0">
                          <div className="text-[#0a1a1a]/70 font-medium text-center sm:text-left px-2 sm:px-4 text-xs sm:text-base">{row.label}</div>
                          <div className="text-[#0a1a1a] font-bold text-center sm:text-left whitespace-pre-wrap px-2 sm:px-4 leading-relaxed text-sm sm:text-base">{row.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
          
        {/* 7. UNBOXING VIDEO */}
        {machine.unboxingVideoId && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-20 sm:mb-32 pt-12 sm:pt-20 border-t border-[#004445]/10"
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1a1a] mb-3 sm:mb-4">Unboxing Highlights</h2>
              <p className="text-[#0a1a1a]/60 text-base sm:text-lg">A quick guide through the unboxing experience.</p>
            </div>
            <div className="aspect-video md:aspect-[16/7] w-full bg-black rounded-3xl sm:rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#004445]/10">
              <iframe 
                className="w-full h-full" 
                src={machine.unboxingVideoId} 
                title="Unboxing Video" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
          
        {/* 8. WHAT'S IN THE BOX */}
        {machine.inTheBox && machine.inTheBox.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-20 sm:mb-32 pt-12 sm:pt-20 border-t border-[#004445]/10"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1a1a] mb-10 sm:mb-16 text-center">What's in the box</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {machine.inTheBox.map((item, i) => (
                <motion.div 
                  key={i} 
                  className="flex flex-col items-center group"
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-white rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 w-full aspect-square flex items-center justify-center mb-4 sm:mb-6 shadow-sm group-hover:shadow-md transition-all border border-[#004445]/10">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <p className="text-[#0a1a1a] font-bold text-center px-2 sm:px-4 leading-tight text-sm sm:text-lg">{item.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 9. ADD-ONS FOR OTHER VARIANTS SECTION */}
        {machine.addOns && machine.addOns.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="pt-12 sm:pt-20 border-t border-[#004445]/10 mb-10 sm:mb-32"
          >
            <div className="text-center mb-10 sm:mb-16 px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1a1a] mb-3">Included Add-ons for Other Configurations</h2>
              <p className="text-[#0a1a1a]/60 text-sm sm:text-lg max-w-2xl mx-auto">These items are included directly when choosing premium configurations.</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {machine.addOns.map((addon, i) => (
                <motion.div 
                  key={i} 
                  className="flex flex-col items-center group"
                  whileHover={{ y: -5 }}
                >
                  <div className="bg-white rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 w-full aspect-square flex items-center justify-center mb-4 sm:mb-6 shadow-sm group-hover:shadow-md transition-all border border-[#004445]/10">
                    <img src={addon.image} alt={addon.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <span className="inline-block px-2 sm:px-3 py-1 bg-teal-50 text-teal-700 text-[10px] sm:text-xs font-bold rounded-full mb-2 sm:mb-3 text-center w-full sm:w-auto truncate">
                    Included with {addon.variant}
                  </span>
                  <p className="text-[#0a1a1a] font-bold text-center px-2 sm:px-4 leading-tight text-sm sm:text-lg">{addon.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}