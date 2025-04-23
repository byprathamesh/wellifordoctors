
import React, { useState } from 'react';
import { PiggyBank, Filter, ChevronDown, BarChart, Calendar, Download, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface EarningItem {
  id: string;
  patientName: string;
  patientImage: string;
  date: string;
  amount: number;
  type: 'consultation' | 'referral' | 'insurance';
  status: 'paid' | 'pending';
  description: string;
}

const EarningCard: React.FC<{ earning: EarningItem }> = ({ earning }) => {
  const typeIcons = {
    'consultation': <MessageCircle size={16} className="text-blue-500" />,
    'referral': <Users size={16} className="text-purple-500" />,
    'insurance': <Shield size={16} className="text-green-500" />,
  };
  
  const typeLabels = {
    'consultation': 'Consultation Fee',
    'referral': 'Referral Bonus',
    'insurance': 'Insurance Commission',
  };

  return (
    <div className="welli-card">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={earning.patientImage} alt={earning.patientName} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-welli-gray-800">{earning.patientName}</h4>
            <Badge variant={earning.status === 'paid' ? 'outline' : 'secondary'}>
              {earning.status}
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-welli-gray-600 mt-1 gap-2">
            {typeIcons[earning.type]}
            <span>{typeLabels[earning.type]}</span>
            <span className="text-welli-gray-400">•</span>
            <span>{earning.date}</span>
          </div>
          
          <p className="text-sm text-welli-gray-500 mt-1">{earning.description}</p>
        </div>
        
        <div className="text-right">
          <div className="font-medium text-lg text-welli-gray-800">${earning.amount.toFixed(2)}</div>
          <Button variant="ghost" size="sm" className="text-welli-accent-green">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

import { MessageCircle, Users, Shield } from 'lucide-react';

const Earnings = () => {
  const [timeFrame, setTimeFrame] = useState('this-month');
  
  const earnings: EarningItem[] = [
    {
      id: '1',
      patientName: 'Emma Thompson',
      patientImage: 'https://randomuser.me/api/portraits/women/45.jpg',
      date: 'April 22, 2025',
      amount: 150.00,
      type: 'consultation',
      status: 'paid',
      description: 'Video consultation (30 minutes)',
    },
    {
      id: '2',
      patientName: 'James Wilson',
      patientImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      date: 'April 20, 2025',
      amount: 50.00,
      type: 'referral',
      status: 'paid',
      description: 'Welli Insurance Referral Bonus',
    },
    {
      id: '3',
      patientName: 'Sophia Chen',
      patientImage: 'https://randomuser.me/api/portraits/women/79.jpg',
      date: 'April 18, 2025',
      amount: 75.00,
      type: 'insurance',
      status: 'pending',
      description: 'Insurance claim commission',
    },
    {
      id: '4',
      patientName: 'Robert Brown',
      patientImage: 'https://randomuser.me/api/portraits/men/67.jpg',
      date: 'April 15, 2025',
      amount: 125.00,
      type: 'consultation',
      status: 'paid',
      description: 'In-person consultation (45 minutes)',
    },
    {
      id: '5',
      patientName: 'Alice Garcia',
      patientImage: 'https://randomuser.me/api/portraits/women/33.jpg',
      date: 'April 10, 2025',
      amount: 100.00,
      type: 'referral',
      status: 'pending',
      description: 'Specialist Referral Commission',
    },
  ];
  
  const consultationEarnings = earnings.filter(e => e.type === 'consultation');
  const referralEarnings = earnings.filter(e => e.type === 'referral');
  const insuranceEarnings = earnings.filter(e => e.type === 'insurance');
  
  const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
  const pendingEarnings = earnings
    .filter(item => item.status === 'pending')
    .reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-welli-gray-800">Earnings & Referrals</h1>
        <p className="text-welli-gray-600">Track your income from consultations, referrals, and insurance commissions</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <PiggyBank size={20} className="text-welli-accent-green" />
            <h3 className="font-medium text-welli-gray-800">Total Earnings</h3>
          </div>
          <div className="text-3xl font-bold text-welli-gray-800">${totalEarnings.toFixed(2)}</div>
          <p className="text-sm text-welli-gray-600 mt-2">This month</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={20} className="text-blue-500" />
            <h3 className="font-medium text-welli-gray-800">Pending Payouts</h3>
          </div>
          <div className="text-3xl font-bold text-welli-gray-800">${pendingEarnings.toFixed(2)}</div>
          <p className="text-sm text-welli-gray-600 mt-2">Processing (3-5 business days)</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-3">
              <Users size={20} className="text-purple-500" />
              <h3 className="font-medium text-welli-gray-800">Referral Program</h3>
            </div>
            <Badge className="bg-welli-light-green text-welli-accent-green border-none">Active</Badge>
          </div>
          <div className="text-3xl font-bold text-welli-gray-800">12</div>
          <p className="text-sm text-welli-gray-600 mt-2">Successful referrals this month</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <Calendar size={16} /> {timeFrame === 'this-month' ? 'This Month' : 'Last Month'} <ChevronDown size={14} />
          </Button>
          <Button variant="outline" className="gap-1">
            <Filter size={16} /> Filter
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            <BarChart size={16} /> Analytics
          </Button>
          <Button variant="outline" className="gap-1">
            <Download size={16} /> Export
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-card">
        <Tabs defaultValue="all">
          <div className="border-b border-welli-gray-200">
            <TabsList className="px-5 pt-3">
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="consultations">Consultations</TabsTrigger>
              <TabsTrigger value="referrals">Referrals</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="p-5 space-y-4">
            {earnings.map(earning => (
              <EarningCard key={earning.id} earning={earning} />
            ))}
          </TabsContent>
          
          <TabsContent value="consultations" className="p-5 space-y-4">
            {consultationEarnings.map(earning => (
              <EarningCard key={earning.id} earning={earning} />
            ))}
          </TabsContent>
          
          <TabsContent value="referrals" className="p-5 space-y-4">
            {referralEarnings.map(earning => (
              <EarningCard key={earning.id} earning={earning} />
            ))}
          </TabsContent>
          
          <TabsContent value="insurance" className="p-5 space-y-4">
            {insuranceEarnings.map(earning => (
              <EarningCard key={earning.id} earning={earning} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-welli-light-green p-5 rounded-xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-welli-gray-800 mb-1">Boost your earnings with Welli referrals</h3>
            <p className="text-welli-gray-600">Earn $50 for each patient you refer to Welli insurance plans</p>
          </div>
          <Button className="mt-3 md:mt-0 bg-welli-green hover:bg-welli-dark-green text-welli-gray-800">
            Refer a Patient
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
