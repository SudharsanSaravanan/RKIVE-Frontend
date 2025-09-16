import React from 'react';

const ApplicationProcess = () => {
  const applicationSteps = [
    {
      step: "1",
      title: "Online Registration",
      description: "Fill out the comprehensive application form with all required details"
    },
    {
      step: "2", 
      title: "Document Upload",
      description: "Submit educational certificates, ID proof, and other necessary documents"
    },
    {
      step: "3",
      title: "Assessment Test",
      description: "Appear for online assessment test covering general awareness and aptitude"
    },
    {
      step: "4",
      title: "Final Selection",
      description: "Merit list publication and internship allocation based on performance"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Application Process
          </h2>
          <p className="text-xl text-gray-600">
            Follow these simple steps to complete your application
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {applicationSteps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>
              {index < applicationSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg">
            Start Application Process
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;