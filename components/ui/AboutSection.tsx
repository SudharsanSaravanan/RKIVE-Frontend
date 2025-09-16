import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About the Programme
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                The PM Internship Programme is a flagship initiative by the Ministry of Corporate Affairs, 
                designed to provide young graduates with practical exposure to government functioning and 
                policy implementation.
              </p>
              <p>
                Through this comprehensive 12-month programme, interns work closely with government 
                departments, gaining invaluable insights into public administration, corporate governance, 
                and policy formulation processes.
              </p>
              <p>
                Our interns contribute to real projects that impact millions of citizens, making this 
                programme both meaningful and career-defining for aspiring public servants and policy makers.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                Government Experience
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                Policy Implementation
              </div>
              <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
                Professional Network
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-semibold">12 Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Stipend</span>
                <span className="font-semibold">₹25,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Application Period</span>
                <span className="font-semibold">Jan - Mar 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Selection Process</span>
                <span className="font-semibold">Merit Based</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Locations</span>
                <span className="font-semibold">Pan India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;