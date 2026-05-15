import React from 'react';

export default function VolunteerManager() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Add Volunteer */}
      <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl backdrop-blur-sm shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="p-2 bg-blue-500/20 rounded-lg mr-3 text-blue-400">➕</span>
          Add New Volunteer
        </h3>
        <div className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-4 bg-white text-slate-900 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
          <input type="email" placeholder="Email Address" className="w-full p-4 bg-white text-slate-900 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
          <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all">Add Volunteer</button>
        </div>
      </div>

      {/* Log Hours */}
      <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl backdrop-blur-sm shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="p-2 bg-emerald-500/20 rounded-lg mr-3 text-emerald-400">⏱️</span>
          Track Working Hours
        </h3>
        <div className="space-y-4">
          <input type="number" min="1" max="24" placeholder="Enter hours (e.g. 5)" className="w-full p-4 bg-white text-slate-900 rounded-xl border-none focus:ring-2 focus:ring-emerald-500 outline-none font-medium" />
          <input type="text" placeholder="Task description" className="w-full p-4 bg-white text-slate-900 rounded-xl border-none focus:ring-2 focus:ring-emerald-500 outline-none font-medium" />
          <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all">Log Activity</button>
        </div>
      </div>
    </div>
  );
}
