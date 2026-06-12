import Header from "../components/Header";

import { Hero } from "../components/Hero";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { Machines } from "../components/Machines";
import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { HomeServices } from "../components/HomeServices";
import { Customization } from "../components/Customization";

export function Home() {
  return (
    // REMOVED 'overflow-x-hidden' to fix the double vertical scrollbar bug.
    // Added 'w-full flex flex-col' to ensure it stretches safely inside App.tsx.
    <div className="animate-in fade-in duration-700 w-full flex flex-col">

      {/* SEO META TAGS */}
      <Header
        title="DEWHKA | 3D Printing & Laser Cutting Solutions"
        shortDescription="Shop custom 3D printed products, laser cutting services, machines, spare parts, and accessories."
        longDescription="We provide complete 3D printing and laser cutting solutions including custom product manufacturing, prototyping, industrial machines, spare parts, accessories, filaments, and materials. We help makers, engineers, and businesses build high-quality custom products and prototypes."
      />

      {/* PAGE CONTENT */}
      <Hero />
      <HomeServices />
      <FeaturedProducts />
      <Machines />
      <Customization/>
      <About />
      <Contact />

    </div>
  );
}