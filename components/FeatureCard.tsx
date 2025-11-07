import React from 'react';
import type { FeatureCardProps } from '../types';

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, iconBgColor, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-center mb-4">
        <div className={`p-4 rounded-lg inline-block ${iconBgColor}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-500 mt-1">{description}</p>
    </div>
  );
};

export default FeatureCard;
