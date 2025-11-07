import React from 'react';
import { HelpIcon } from '../constants';

const HelpButton: React.FC = () => {
  return (
    <button className="fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center space-x-2 transition-transform transform hover:scale-105">
      {/* FIX: Use HelpIcon as a component now that it's a functional component. */}
      <HelpIcon />
      <span className="font-semibold">Help</span>
    </button>
  );
};

export default HelpButton;