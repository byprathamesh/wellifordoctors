import React from 'react';
import { FileText } from 'lucide-react';

const Reports = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-welli-gray-800">Reports</h1>
      <div className="welli-card">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <FileText className="w-12 h-12 text-welli-green mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-welli-gray-800 mb-2">Reports</h2>
            <p className="text-welli-gray-600">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

