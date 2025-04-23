
import React, { useState } from 'react';
import { MessageCircle, Filter, Search, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface Consultation {
  id: string;
  patientName: string;
  patientImage: string;
  time: string;
  reason: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  insuranceStatus: 'Welli' | 'Other' | 'None';
}

const ConsultationCard: React.FC<{ consultation: Consultation }> = ({ consultation }) => {
  const navigate = useNavigate();
  
  const statusColors = {
    'upcoming': 'bg-welli-light-green text-welli-accent-green',
    'completed': 'bg-gray-100 text-gray-600',
    'cancelled': 'bg-red-50 text-red-600',
  };
  
  return (
    <div 
      className="welli-card cursor-pointer hover:shadow-lg transition-shadow" 
      onClick={() => navigate(`/patients/${consultation.id}`)}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img src={consultation.patientImage} alt={consultation.patientName} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-welli-gray-800">{consultation.patientName}</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[consultation.status]}`}>
              {consultation.status}
            </span>
            {consultation.insuranceStatus === 'Welli' && (
              <Badge className="bg-green-100 text-green-800 border-none">Welli Insured</Badge>
            )}
          </div>
          
          <div className="flex items-center text-sm text-welli-gray-600 mt-1">
            <Clock size={14} className="mr-1" />
            <span>{consultation.time}</span>
          </div>
          
          <p className="text-sm text-welli-gray-500 mt-1">{consultation.reason}</p>
        </div>
        
        <Button className="bg-welli-green hover:bg-welli-dark-green text-welli-gray-800">
          <MessageCircle size={16} className="mr-2" /> Start Consult
        </Button>
      </div>
    </div>
  );
};

const Consultations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const consultations: Consultation[] = [
    {
      id: '1',
      patientName: 'Emma Thompson',
      patientImage: 'https://randomuser.me/api/portraits/women/45.jpg',
      time: 'Today, 10:30 AM',
      reason: 'Follow-up on blood pressure medication',
      status: 'upcoming',
      insuranceStatus: 'Welli',
    },
    {
      id: '2',
      patientName: 'James Wilson',
      patientImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      time: 'Today, 11:45 AM',
      reason: 'Persistent cough and fever',
      status: 'upcoming',
      insuranceStatus: 'Other',
    },
    {
      id: '3',
      patientName: 'Sophia Chen',
      patientImage: 'https://randomuser.me/api/portraits/women/79.jpg',
      time: 'Yesterday, 2:15 PM',
      reason: 'Diabetes management check-in',
      status: 'completed',
      insuranceStatus: 'None',
    },
    {
      id: '4',
      patientName: 'Robert Brown',
      patientImage: 'https://randomuser.me/api/portraits/men/67.jpg',
      time: 'Yesterday, 4:30 PM',
      reason: 'Chest pain evaluation',
      status: 'completed',
      insuranceStatus: 'Welli',
    },
    {
      id: '5',
      patientName: 'Alice Garcia',
      patientImage: 'https://randomuser.me/api/portraits/women/33.jpg',
      time: 'Tomorrow, 9:00 AM',
      reason: 'Annual physical examination',
      status: 'upcoming',
      insuranceStatus: 'Other',
    },
  ];
  
  const filteredConsultations = consultations.filter(consult =>
    consult.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consult.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const upcomingConsultations = filteredConsultations.filter(c => c.status === 'upcoming');
  const completedConsultations = filteredConsultations.filter(c => c.status === 'completed');
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-welli-gray-800">Consultations</h1>
        <p className="text-welli-gray-600">Manage your patient consultations and chat sessions</p>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-welli-gray-500" size={18} />
          <Input 
            placeholder="Search consultations..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar size={16} /> Schedule
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter size={16} /> Filter
          </Button>
          <Button className="bg-welli-green hover:bg-welli-dark-green text-welli-gray-800 gap-2">
            <MessageCircle size={16} /> New Consultation
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-card">
        <Tabs defaultValue="upcoming">
          <div className="border-b border-welli-gray-200">
            <TabsList className="px-5 pt-3">
              <TabsTrigger value="upcoming">Upcoming ({upcomingConsultations.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedConsultations.length})</TabsTrigger>
              <TabsTrigger value="all">All Consultations</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="upcoming" className="p-5 space-y-4">
            {upcomingConsultations.length === 0 ? (
              <div className="text-center py-8">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-welli-light-green mb-4">
                  <Calendar size={24} className="text-welli-accent-green" />
                </div>
                <h3 className="text-lg font-medium mb-1">No upcoming consultations</h3>
                <p className="text-welli-gray-600 mb-4">You don't have any upcoming consultations scheduled</p>
                <Button className="bg-welli-green hover:bg-welli-dark-green text-welli-gray-800">
                  Schedule Consultation
                </Button>
              </div>
            ) : (
              upcomingConsultations.map(consultation => (
                <ConsultationCard key={consultation.id} consultation={consultation} />
              ))
            )}
          </TabsContent>
          
          <TabsContent value="completed" className="p-5 space-y-4">
            {completedConsultations.map(consultation => (
              <ConsultationCard key={consultation.id} consultation={consultation} />
            ))}
          </TabsContent>
          
          <TabsContent value="all" className="p-5 space-y-4">
            {filteredConsultations.map(consultation => (
              <ConsultationCard key={consultation.id} consultation={consultation} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Consultations;
