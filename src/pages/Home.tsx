import { Hero } from "../components/Hero";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { Machines } from "../components/Machines";
import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { Customization } from "../components/Customization";

export function Home() {
  return (
    <div className="animate-in fade-in duration-700">
      <Hero />
      <FeaturedProducts />
      <Machines />
      <Customization/>
      <About />
      <Contact />
    </div>
  );
}
