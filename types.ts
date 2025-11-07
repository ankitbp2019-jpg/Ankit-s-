import React from 'react';

// This file is reserved for shared TypeScript types.

// Fix: Added StatCardProps interface to resolve missing type error in components/StatCard.tsx.
export interface StatCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  value: string | number;
  label: string;
  change?: string;
  status?: string;
}

// Fix: Added FeatureCardProps interface to resolve missing type error in components/FeatureCard.tsx.
export interface FeatureCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  title: string;
  description: string;
}

// Added types for functional navigation pages
export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
}

export interface Policy {
  id: string;
  title: string;
  version: string;
  status: 'Draft' | 'Active' | 'Archived';
}

export interface Report {
    id: string;
    title: string;
    author: string;
    generatedDate: string;
}

// Added type for user authentication
export interface User {
    email: string;
    password?: string; // Password is optional for currentUser state
}