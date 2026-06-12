import { About } from "../components/About";
import { Customization } from "../components/Customization";

export function AboutPage() {
  return (
    <div className="animate-in fade-in duration-700 pt-2 sm:pt-6 pb-16 md:pb-32 bg-[#f8fafa] min-h-screen overflow-hidden">
      <About />
      <Customization />
    </div>
  );
}