import React from 'react';
import { ExternalLink } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Shape India's Future?
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          Join thousands of young leaders contributing to nation building through the PM Internship Programme
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
            Apply Now <ExternalLink className="ml-2 w-4 h-4" />
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Download Brochure
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;