import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const Appointments = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-welli-gray-800">Appointments</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="welli-card">
            <h2 className="text-lg font-semibold text-welli-gray-800 mb-4">Today's Schedule</h2>
            <div className="space-y-4">
              <p className="text-welli-gray-600">Loading appointments...</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="welli-card">
            <h2 className="text-lg font-semibold text-welli-gray-800 mb-4">Calendar</h2>
            <div className="flex justify-center">
              <Calendar className="w-6 h-6 text-welli-green" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
