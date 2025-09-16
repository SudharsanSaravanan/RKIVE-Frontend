"use client";
import React, { useState } from 'react';
import { Menu, X, ChevronDown, Calendar, Users, BookOpen, Award, ExternalLink, Phone, Mail, MapPin } from 'lucide-react';

const PMInternshipClone = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const navItems = [
    { label: 'Home', href: '#' },
    { 
      label: 'About', 
      href: '#',
      dropdown: ['About MCA', 'Vision & Mission', 'Organization Structure', 'Annual Reports']
    },
    { 
      label: 'Programmes', 
      href: '#',
      dropdown: ['PM Internship', 'Digital India', 'Skill Development', 'Innovation Hub']
    },
    { 
      label: 'Resources', 
      href: '#',
      dropdown: ['Guidelines', 'FAQs', 'Downloads', 'Useful Links']
    },
    { label: 'News & Updates', href: '#' },
    { label: 'Contact', href: '#' }
  ];

  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
      title: "12 Month Duration",
      description: "Comprehensive internship program spanning a full year for in-depth learning"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Industry Mentorship",
      description: "Direct guidance from experienced professionals and government officials"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-purple-600" />,
      title: "Practical Training",
      description: "Hands-on experience in real government projects and policy implementation"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "Certificate & Stipend",
      description: "Official certification and monthly stipend for dedicated participants"
    }
  ];

  const eligibilityData = [
    { criteria: "Education", requirement: "Bachelor's degree in any discipline from recognized university" },
    { criteria: "Age Limit", requirement: "21-28 years (relaxation as per government norms)" },
    { criteria: "Selection", requirement: "Merit-based selection through online application and assessment" },
    { criteria: "Commitment", requirement: "Full-time availability for 12-month duration" }
  ];

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">MCA</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Ministry of Corporate Affairs</h1>
                <p className="text-sm text-gray-600">Government of India</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  <button
                    className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                  </button>
                  
                  {item.dropdown && activeDropdown === index && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50"
                      onMouseEnter={() => setActiveDropdown(index)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              {navItems.map((item, index) => (
                <a key={index} href={item.href} className="block py-2 text-gray-700 hover:text-blue-600">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              PM Internship Programme
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Empowering young minds through hands-on experience in governance and public policy implementation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Apply Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Programme Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes our internship programme unique and valuable for your career growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Programme Section */}
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

      {/* Eligibility Section */}
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

      {/* Application Process */}
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

      {/* Important Dates */}
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

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">MCA</span>
                </div>
                <span className="font-bold">Ministry of Corporate Affairs</span>
              </div>
              <p className="text-gray-400">
                Government of India initiative for empowering youth through practical governance experience.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Programme</a></li>
                <li><a href="#" className="hover:text-white">Eligibility</a></li>
                <li><a href="#" className="hover:text-white">Application Process</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Forms & Documents</a></li>
                <li><a href="#" className="hover:text-white">Previous Year Data</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+91-11-2338-4000</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>internship@mca.gov.in</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-1" />
                  <span>A-Wing, Shastri Bhawan, New Delhi - 110001</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Ministry of Corporate Affairs, Government of India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PMInternshipClone;