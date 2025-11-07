import React from 'react';
import type { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({
  icon,
  iconBgColor,
  value,
  label,
  change,
  status,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${iconBgColor}`}>
          {icon}
        </div>
        {change && <span className="text-sm font-semibold text-green-600">{change}</span>}
        {status && <span className="text-sm font-semibold text-blue-600">{status}</span>}
      </div>
      <div>
        <p className="text-4xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500 mt-1">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
