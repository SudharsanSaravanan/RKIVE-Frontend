import React from 'react';
import { Calendar, Users, BookOpen, Award } from 'lucide-react';
import { FeatureCard } from '../ui/FeatureCard';

const FeaturesSection = () => {
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

  return (
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
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;