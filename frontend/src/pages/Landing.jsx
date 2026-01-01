import LandingNavbar from "../components/LandingNavBar";
import Hero from "../components/Hero";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Features from "../components/Features";

export default function LandingPage() {
  return (
    <div>
      <LandingNavbar />
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </div>
  );
}
