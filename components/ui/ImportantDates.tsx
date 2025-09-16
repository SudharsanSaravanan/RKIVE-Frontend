import React from 'react';

const ImportantDates = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Important Dates
          </h2>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">15 Jan 2025</div>
              <div className="text-gray-700 font-medium">Application Opens</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-2">31 Mar 2025</div>
              <div className="text-gray-700 font-medium">Application Deadline</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-2">30 Apr 2025</div>
              <div className="text-gray-700 font-medium">Results Announcement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantDates;