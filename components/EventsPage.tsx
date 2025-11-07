import React, { useState, useEffect } from 'react';
import type { Event } from '../types';

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !location) return;
    const newEvent: Event = {
      id: crypto.randomUUID(),
      title,
      date,
      location,
    };
    setEvents([...events, newEvent]);
    setTitle('');
    setDate('');
    setLocation('');
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Events</h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Log a New Event</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Annual Fundraiser" required />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
              <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700">Location</label>
              <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Main Auditorium" required />
            </div>
            <button type="submit" className="md:col-span-3 w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Add Event
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Logged Events</h2>
          <div className="space-y-4">
            {events.length > 0 ? (
              events.map((event) => (
                <div key={event.id} className="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">{event.title}</p>
                    <p className="text-sm text-slate-500">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {event.location}</p>
                  </div>
                  <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:text-red-700 font-semibold transition-colors">
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-500">No events logged yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;