import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="pt-16 overflow-x-hidden ">
      <Navbar />
      <Hero />
      <FAQ />
      <Footer />
    </div>
  );
}
