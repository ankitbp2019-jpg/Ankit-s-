import React from 'react';
import { LogoIcon, BellIcon } from '../constants';
import type { User } from '../types';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  user: User | null;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onLogout, user }) => {
  const navLinks = ['Dashboard', 'Meetings', 'Events', 'Policies', 'Reports'];

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    onNavigate(link);
  };

  const handleNotificationsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert('Notifications panel is not yet implemented.');
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 text-white p-2 rounded-lg">
                <LogoIcon />
              </div>
              <div>
                <span className="font-bold text-lg">EMP System</span>
                <p className="text-xs text-slate-500">Record Management System</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  onClick={(e) => handleNavLinkClick(e, link)}
                  className={`text-sm font-medium ${
                    currentPage === link
                      ? 'text-indigo-600'
                      : 'text-slate-500 hover:text-slate-900'
                  } transition-colors`}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleNotificationsClick}
              className="text-slate-500 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="View notifications"
            >
                <span className="sr-only">Notifications</span>
                <BellIcon />
            </button>
            <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/36?u=${user?.email}`} alt="User avatar" />
                </div>
                 <span className="text-sm font-medium text-slate-700 hidden sm:block">{user?.email}</span>
            </div>
            <button
              onClick={onLogout}
              className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export const Footer: React.FC = () => {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Security'],
    Company: ['About', 'Contact', 'Support'],
    Legal: ['Privacy', 'Terms', 'Compliance'],
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-2 rounded-lg">
                {/* The LogoIcon inherits text-white from the parent footer element */}
                <LogoIcon />
              </div>
              <span className="font-bold text-xl">EMP System</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs">
              Streamlining institutional record keeping for better governance and transparency.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.Product.map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.Company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.Legal.map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; 2024 EMP System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};