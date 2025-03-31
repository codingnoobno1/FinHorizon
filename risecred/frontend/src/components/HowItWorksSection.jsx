const HowItWorksSection = () => {
    return (
      <section id="how-it-works" className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <p className="text-lg mb-6">No Internet? No Problem. Powering Dignity with Solar and Biometrics.</p>
        <div className="flex justify-center items-center space-x-10">
          <img src="/images/risecred-device.png" alt="RiseCred Device" className="w-1/3" />
          <div className="max-w-md">
            <p className="mb-4">RiseCred is a solar-powered, offline-compatible hardware solution. It uses biometric verification to authenticate workers, providing them with real-time access to legitimate job opportunities from NGOs, industries, and independent users.</p>
            <p>No barriers, no borders. Just work, dignity, and empowerment.</p>
          </div>
        </div>
      </section>
    );
  }
  
  export default HowItWorksSection;
  