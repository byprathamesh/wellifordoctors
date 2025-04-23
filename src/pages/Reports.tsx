
import React, { useState } from 'react';
import { FileText, Search, Filter, BarChart, DownloadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface Report {
  id: string;
  patientName: string;
  patientImage: string;
  date: string;
  type: string;
  status: 'new' | 'reviewed' | 'critical';
  summary: string;
}

const ReportCard: React.FC<{ report: Report }> = ({ report }) => {
  const statusColors = {
    'new': 'bg-blue-100 text-blue-800',
    'reviewed': 'bg-welli-light-green text-welli-green',
    'critical': 'bg-red-100 text-red-800',
  };

  return (
    <div className="welli-card flex items-center gap-4 hover:shadow-lg cursor-pointer border-2 border-transparent hover:border-welli-green/60 transition group">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-welli-green bg-white group-hover:scale-105 transition">
        <img src={report.patientImage} alt={report.patientName} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-welli-green group-hover:underline transition">{report.patientName}</h4>
          <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[report.status]}`}>
            {report.status}
          </span>
        </div>
        <div className="flex items-center text-sm text-welli-gray-600 mt-1 gap-2">
          <FileText size={14} />
          <span>{report.type}</span>
          <span className="text-welli-gray-400">•</span>
          <span>{report.date}</span>
        </div>
        <p className="text-sm text-welli-gray-500 mt-1">{report.summary}</p>
      </div>
      <div className="flex flex-col gap-2">
        <Button className="bg-welli-green hover:bg-welli-accent-green text-white font-bold px-4">
          View Report
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1 border-welli-green text-welli-green">
          <DownloadCloud size={14} /> Download
        </Button>
      </div>
    </div>
  );
};

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const reports: Report[] = [
    {
      id: '1',
      patientName: 'Emma Thompson',
      patientImage: 'https://randomuser.me/api/portraits/women/45.jpg',
      date: 'April 22, 2025',
      type: 'Blood Test Results',
      status: 'critical',
      summary: 'Elevated white blood cell count and signs of infection.',
    },
    {
      id: '2',
      patientName: 'James Wilson',
      patientImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: 'April 20, 2025',
      type: 'Chest X-Ray',
      status: 'new',
      summary: 'Minor infiltrates in lower left lung.',
    },
    {
      id: '3',
      patientName: 'Sophia Chen',
      patientImage: 'https://randomuser.me/api/portraits/women/79.jpg',
      date: 'April 18, 2025',
      type: 'ECG Results',
      status: 'reviewed',
      summary: 'Normal sinus rhythm with no significant abnormalities.',
    },
    {
      id: '4',
      patientName: 'Robert Brown',
      patientImage: 'https://randomuser.me/api/portraits/men/67.jpg',
      date: 'April 15, 2025',
      type: 'MRI Scan',
      status: 'reviewed',
      summary: 'Mild degeneration in L4-L5 disc, no nerve compression.',
    },
    {
      id: '5',
      patientName: 'Alice Garcia',
      patientImage: 'https://randomuser.me/api/portraits/women/33.jpg',
      date: 'April 10, 2025',
      type: 'Blood Pressure Log',
      status: 'new',
      summary: 'Consistent readings above 140/90 over two week period.',
    },
  ];

  const filteredReports = reports.filter(report =>
    report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const newReports = filteredReports.filter(r => r.status === 'new');
  const criticalReports = filteredReports.filter(r => r.status === 'critical');
  const reviewedReports = filteredReports.filter(r => r.status === 'reviewed');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-welli-green">Medical Reports</h1>
        <p className="text-welli-gray-600">View and analyze patient medical reports and lab results</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-green" size={18} />
          <Input 
            placeholder="Search reports..." 
            className="pl-10 border-welli-green focus:ring-welli-green rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 border-welli-green text-welli-green hover:bg-welli-accent-green/10">
            <Filter size={16} /> Filter
          </Button>
          <Button variant="outline" className="gap-2 border-welli-green text-welli-green hover:bg-welli-accent-green/10">
            <BarChart size={16} /> Analytics
          </Button>
          <Button className="bg-welli-green hover:bg-welli-accent-green text-white font-bold gap-2">
            <FileText size={16} /> Upload Report
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card">
        <Tabs defaultValue="all">
          <div className="border-b border-welli-green">
            <TabsList className="px-5 pt-3">
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="new">New ({newReports.length})</TabsTrigger>
              <TabsTrigger value="critical">Critical ({criticalReports.length})</TabsTrigger>
              <TabsTrigger value="reviewed">Reviewed ({reviewedReports.length})</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="p-5 space-y-4">
            {filteredReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </TabsContent>
          <TabsContent value="new" className="p-5 space-y-4">
            {newReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </TabsContent>
          <TabsContent value="critical" className="p-5 space-y-4">
            {criticalReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </TabsContent>
          <TabsContent value="reviewed" className="p-5 space-y-4">
            {reviewedReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;

