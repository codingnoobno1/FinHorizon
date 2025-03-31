import Navbar from '@components/Navbar';
import HeaderSection from '@components/HeaderSection';
import HowItWorksSection from '@components/HowItWorksSection';
import USPsSection from '@components/USPsSection';
import SalientFeaturesSection from '@components/SalientFeaturesSection';
import CallToAction from '@components/CallToAction';
import Footer from '@components/Footer';

const Page = () => {
  return (
    <div>
      <Navbar />
      <HeaderSection />
      <HowItWorksSection />
      <USPsSection />
      <SalientFeaturesSection />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default Page;
