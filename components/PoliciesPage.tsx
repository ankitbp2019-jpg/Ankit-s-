import React, { useState, useEffect } from 'react';
import type { Policy } from '../types';

const PoliciesPage: React.FC = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [title, setTitle] = useState('');
  const [version, setVersion] = useState('');
  const [status, setStatus] = useState<'Draft' | 'Active' | 'Archived'>('Draft');

  useEffect(() => {
    const storedPolicies = localStorage.getItem('policies');
    if (storedPolicies) {
      setPolicies(JSON.parse(storedPolicies));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('policies', JSON.stringify(policies));
  }, [policies]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !version) return;
    const newPolicy: Policy = {
      id: crypto.randomUUID(),
      title,
      version,
      status,
    };
    setPolicies([...policies, newPolicy]);
    setTitle('');
    setVersion('');
    setStatus('Draft');
  };

  const handleDelete = (id: string) => {
    setPolicies(policies.filter((policy) => policy.id !== id));
  };
  
  const getStatusColor = (status: Policy['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Archived': return 'bg-slate-100 text-slate-800';
      case 'Draft':
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Policies</h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Add a New Policy Document</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Data Security Policy" required />
            </div>
            <div>
              <label htmlFor="version" className="block text-sm font-medium text-slate-700">Version</label>
              <input type="text" id="version" value={version} onChange={(e) => setVersion(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="v1.0.0" required />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
              <select id="status" value={status} onChange={(e) => setStatus(e.target.value as Policy['status'])} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                <option>Draft</option>
                <option>Active</option>
                <option>Archived</option>
              </select>
            </div>
            <button type="submit" className="md:col-span-3 w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Add Policy
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Policy Documents</h2>
          <div className="space-y-4">
            {policies.length > 0 ? (
              policies.map((policy) => (
                <div key={policy.id} className="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">{policy.title}</p>
                    <p className="text-sm text-slate-500">Version: {policy.version}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(policy.status)}`}>{policy.status}</span>
                    <button onClick={() => handleDelete(policy.id)} className="text-red-500 hover:text-red-700 font-semibold transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500">No policies added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;