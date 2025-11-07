import React, { useState, useEffect } from 'react';
import { Header, Footer } from './components/Header';
import Dashboard from './components/Dashboard';
import HelpButton from './components/HelpButton';
import MeetingsPage from './components/MeetingsPage';
import EventsPage from './components/EventsPage';
import PoliciesPage from './components/PoliciesPage';
import ReportsPage from './components/ReportsPage';
import AuthPage from './components/AuthPage';
import type { User } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if a user is logged in from a previous session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('Dashboard'); // Reset to dashboard view on logout
    localStorage.removeItem('currentUser');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Meetings':
        return <MeetingsPage />;
      case 'Events':
        return <EventsPage />;
      case 'Policies':
        return <PoliciesPage />;
      case 'Reports':
        return <ReportsPage />;
      case 'Dashboard':
      default:
        return <Dashboard />;
    }
  };

  // If no user is logged in, show the authentication page
  if (!currentUser) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  // If a user is logged in, show the main application
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      <Header 
        currentPage={currentPage} 
        onNavigate={setCurrentPage} 
        onLogout={handleLogout}
        user={currentUser}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <HelpButton />
    </div>
  );
};

export default App;