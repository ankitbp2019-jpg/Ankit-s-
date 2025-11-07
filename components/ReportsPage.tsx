import React, { useState, useEffect } from 'react';
import type { Report } from '../types';

const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const storedReports = localStorage.getItem('reports');
    if (storedReports) {
      setReports(JSON.parse(storedReports));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reports', JSON.stringify(reports));
  }, [reports]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) return;
    const newReport: Report = {
      id: crypto.randomUUID(),
      title,
      author,
      generatedDate: new Date().toISOString(),
    };
    setReports([...reports, newReport]);
    setTitle('');
    setAuthor('');
  };

  const handleDelete = (id: string) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Reports</h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Generate a New Report</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-1">
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Q4 Financial Summary" required />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-slate-700">Author</label>
              <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Jane Doe" required />
            </div>
            <button type="submit" className="md:col-span-1 w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Generate Report
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Generated Reports</h2>
          <div className="space-y-4">
            {reports.length > 0 ? (
              reports.map((report) => (
                <div key={report.id} className="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">{report.title}</p>
                    <p className="text-sm text-slate-500">By {report.author} on {new Date(report.generatedDate).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => handleDelete(report.id)} className="text-red-500 hover:text-red-700 font-semibold transition-colors">
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-500">No reports generated yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;