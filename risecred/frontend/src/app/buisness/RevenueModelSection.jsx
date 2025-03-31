import React from 'react';

const RevenueModelSection = () => {
  return (
    <section className="py-20 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">A Business That Gives Back. A Model That Moves Forward.</h2>
      
      <div className="flex justify-center items-center flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10">
        {/* Flowchart Diagram */}
        <div className="w-full md:w-1/2">
          {/* Placeholder for the flowchart */}
          <img
            src="/images/revenue-model-flowchart.png" // Replace with actual image path or component
            alt="Revenue Model Flowchart"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div className="max-w-2xl text-lg text-gray-700">
          <p className="mb-6">
            RiseCred brings financial sustainability while ensuring social impact. Every transaction benefits the workers, the vendors, and the platform itself.
            Our model thrives on ethical exchange, creating a ripple effect of empowerment and growth.
          </p>

          <h3 className="font-semibold text-xl mb-4 text-gray-900">Key Elements of Our Revenue Model</h3>
          <ul className="list-inside list-disc text-left space-y-3">
            <li><strong>Worker Empowerment:</strong> Every verified task completed by workers results in a fair, guaranteed payment.</li>
            <li><strong>Vendor Incentives:</strong> Vendors receive commissions for registering more workers, driving community involvement.</li>
            <li><strong>Platform Growth:</strong> The platform sustains itself through a small service fee, reinvested into improving technology and expanding reach.</li>
            <li><strong>Social Impact:</strong> For every ₹1 spent, communities benefit 3x in economic returns, amplifying positive change in rural regions.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RevenueModelSection;
