const USPsSection = () => {
    return (
      <section id="usps" className="py-20 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">RiseCred's Unique Selling Points (USPs)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Financial Recognition</h3>
            <p>Every verified task means guaranteed payment. Workers build their digital presence and access dignified jobs.</p>
          </div>
          <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">No Internet? No Problem.</h3>
            <p>Only 40% of India has consistent internet access, leaving millions disconnected. RiseCred bridges this gap with offline systems, unlocking work opportunities in the remotest areas.</p>
            <span className="text-sm text-gray-500">In rural India, 65% of villages lack stable internet access.</span>
          </div>
          <div className="p-6 bg-yellow-100 rounded-lg shadow-md">
            <h3 className="font-semibold text-xl mb-4">Ending Illegal Labor</h3>
            <p>By registering laborers with verified biometrics and task history, RiseCred eradicates underpayment, forced labor, and exploitation.</p>
            <span className="text-sm text-gray-500">More than 12 million people in India are trapped in forced labor.</span>
          </div>
        </div>
      </section>
    );
  }
  
  export default USPsSection;
  