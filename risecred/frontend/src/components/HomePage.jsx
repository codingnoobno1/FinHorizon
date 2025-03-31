import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import WomenLaborSection from "@/components/WomenLaborSection";
import EconomicImpact from "@/components/EconomicImpact";
import VendorProfile from "@/components/VendorProfile";  // New Section
import CTASection from "@/components/CTASection";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <HeroSection />
      <ProblemSection />
      <WomenLaborSection />
      <EconomicImpact />
      <VendorProfile /> {/* New Vendor Profile Section */}
      <CTASection />
    </div>
  );
};

export default HomePage;
