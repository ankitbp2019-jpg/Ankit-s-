import React, { useState, useEffect } from 'react';
import type { Meeting } from '../types';

const MeetingsPage: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const storedMeetings = localStorage.getItem('meetings');
    if (storedMeetings) {
      setMeetings(JSON.parse(storedMeetings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('meetings', JSON.stringify(meetings));
  }, [meetings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) return;
    const newMeeting: Meeting = {
      id: crypto.randomUUID(),
      title,
      date,
      time,
    };
    setMeetings([...meetings, newMeeting]);
    setTitle('');
    setDate('');
    setTime('');
  };

  const handleDelete = (id: string) => {
    setMeetings(meetings.filter((meeting) => meeting.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-8">Meetings</h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Schedule a New Meeting</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Board Meeting" required />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
              <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-slate-700">Time</label>
              <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <button type="submit" className="md:col-start-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
              Add Meeting
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Scheduled Meetings</h2>
          <div className="space-y-4">
            {meetings.length > 0 ? (
              meetings.map((meeting) => (
                <div key={meeting.id} className="bg-slate-50 p-4 rounded-lg flex justify-between items-center border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">{meeting.title}</p>
                    <p className="text-sm text-slate-500">{new Date(meeting.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {meeting.time}</p>
                  </div>
                  <button onClick={() => handleDelete(meeting.id)} className="text-red-500 hover:text-red-700 font-semibold transition-colors">
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-500">No meetings scheduled yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingsPage;