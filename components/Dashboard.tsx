import React from 'react';
import { stats, features } from '../constants';
import StatCard from './StatCard';
import FeatureCard from './FeatureCard';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Centralized Meeting & Event Management
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-500">
          Streamline your institutional record keeping with automated minutes, digital archives, and comprehensive policy management
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;