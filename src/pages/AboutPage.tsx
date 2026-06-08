import { About } from "../components/About";
import { Customization } from "../components/Customization";

export function AboutPage() {
  return (
    // Added pt-6, background color, and a minimum height to match your other pages
    <div className="animate-in fade-in duration-700 pt-6 pb-32 bg-[#f8fafa] min-h-screen">
      <About />
      <Customization />
    </div>
  );
}