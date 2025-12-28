import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Features from "../components/Features";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
}
