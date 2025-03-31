const SalientFeaturesSection = () => {
    return (
      <section id="salient-features" className="py-20 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6">Salient Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Micro ATM Capabilities</h3>
            <p>Vendors become community cash points using RiseCred’s micro ATM system, enabling secure cash withdrawals for workers without bank access.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Incentives for Vendors</h3>
            <p>More labor registrations mean more commission for vendors. RiseCred’s reward system ensures vendors are active partners in worker empowerment.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">RiseCred Points</h3>
            <p>Workers earn RiseCred Points with every completed task. These points can be redeemed for skill development programs, educational resources, or local services — building their future with every step.</p>
          </div>
        </div>
      </section>
    );
  }
  
  export default SalientFeaturesSection;
  