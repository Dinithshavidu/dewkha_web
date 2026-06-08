import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { ProductsPage } from "./pages/ProductsPage";
import { MachinesPage } from "./pages/MachinesPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { MachineDetailsPage } from "./pages/MachineDetailsPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#f8fafa] text-[#0a1a1a] font-sans selection:bg-[#004445] selection:text-white">
        <Navbar />
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/machines" element={<MachinesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/machine/:machineId" element={<MachineDetailsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}