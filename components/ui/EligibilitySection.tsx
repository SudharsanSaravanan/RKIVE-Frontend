import React from 'react';

const EligibilitySection = () => {
  const eligibilityData = [
    { criteria: "Education", requirement: "Bachelor's degree in any discipline from recognized university" },
    { criteria: "Age Limit", requirement: "21-28 years (relaxation as per government norms)" },
    { criteria: "Selection", requirement: "Merit-based selection through online application and assessment" },
    { criteria: "Commitment", requirement: "Full-time availability for 12-month duration" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Eligibility Criteria
          </h2>
          <p className="text-xl text-gray-600">
            Check if you meet the requirements to apply for this programme
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {eligibilityData.map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.criteria}
              </h3>
              <p className="text-gray-700">
                {item.requirement}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Important Note
            </h3>
            <p className="text-blue-800">
              Candidates from SC/ST/OBC categories may be eligible for age relaxation as per 
              government guidelines. Reserved category certificates must be submitted during application.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilitySection;