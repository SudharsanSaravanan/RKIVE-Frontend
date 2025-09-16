import React from 'react';

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};