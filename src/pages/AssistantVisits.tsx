import React, { useState } from 'react';
import { Video, Filter, User, MapPin, Clock, AlertCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface AssistantVisit {
  id: string;
  patientName: string;
  patientImage: string;
  address: string;
  time: string;
  status: 'in-progress' | 'scheduled' | 'completed';
  assistantName: string;
  assistantImage: string;
  notes?: string;
  visitType: string;
  priority: 'normal' | 'urgent';
}

const AssistantVisitCard: React.FC<{ visit: AssistantVisit }> = ({ visit }) => {
  const statusColors = {
    'in-progress': 'bg-blue-50 text-blue-800',
    'scheduled': 'bg-welli-light-green text-welli-accent-green',
    'completed': 'bg-gray-100 text-gray-600',
  };
  
  const statusLabels = {
    'in-progress': 'In Progress',
    'scheduled': 'Scheduled',
    'completed': 'Completed',
  };
  
  return (
    <div className="welli-card">
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img src={visit.patientImage} alt={visit.patientName} className="w-full h-full object-cover" />
          </div>
          
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-welli-gray-800">{visit.patientName}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[visit.status]}`}>
                {statusLabels[visit.status]}
              </span>
              {visit.priority === 'urgent' && (
                <Badge variant="destructive" className="text-xs">Urgent</Badge>
              )}
            </div>
            
            <div className="flex items-center text-sm text-welli-gray-600 mt-1">
              <MapPin size={14} className="mr-1" />
              <span>{visit.address}</span>
            </div>
            
            <div className="flex items-center text-sm text-welli-gray-600 mt-1">
              <Clock size={14} className="mr-1" />
              <span>{visit.time}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <span className="text-sm text-welli-gray-600">Assistant:</span>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full overflow-hidden mr-1">
                <img src={visit.assistantImage} alt={visit.assistantName} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium">{visit.assistantName}</span>
            </div>
          </div>
          
          <div className="mt-2">
            <Badge variant="outline" className="text-xs">{visit.visitType}</Badge>
          </div>
        </div>
      </div>
      
      {visit.notes && (
        <div className="bg-welli-gray-100 p-3 rounded-md text-sm text-welli-gray-700 mb-3">
          <p>{visit.notes}</p>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {visit.status === 'in-progress' && (
            <div className="flex items-center text-blue-600">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Live now
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          {visit.status === 'in-progress' && (
            <Button size="sm" className="bg-welli-green hover:bg-welli-accent-green text-white">
              <Video size={16} className="mr-1" /> Join Visit
            </Button>
          )}
          
          {visit.status === 'scheduled' && (
            <Button size="sm" variant="outline">
              Reschedule
            </Button>
          )}
          
          <Button size="sm" variant={visit.status === 'completed' ? 'outline' : 'secondary'}>
            {visit.status === 'completed' ? 'View Report' : 'View Details'}
          </Button>
        </div>
      </div>
    </div>
  );
};

const AssistantVisits = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const assistantVisits: AssistantVisit[] = [
    {
      id: '1',
      patientName: 'Emma Thompson',
      patientImage: 'https://randomuser.me/api/portraits/women/45.jpg',
      address: '123 Oak Street, Riverdale',
      time: 'Now (Started 25 min ago)',
      status: 'in-progress',
      assistantName: 'Alex Rivera',
      assistantImage: 'https://randomuser.me/api/portraits/men/22.jpg',
      notes: 'Patient reporting increased shortness of breath. Blood pressure is 145/90.',
      visitType: 'Home Check-up',
      priority: 'urgent',
    },
    {
      id: '2',
      patientName: 'James Wilson',
      patientImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      address: '456 Maple Avenue, Westview',
      time: 'Today, 2:30 PM',
      status: 'scheduled',
      assistantName: 'Maria Lopez',
      assistantImage: 'https://randomuser.me/api/portraits/women/29.jpg',
      visitType: 'Medication Review',
      priority: 'normal',
    },
    {
      id: '3',
      patientName: 'Sophia Chen',
      patientImage: 'https://randomuser.me/api/portraits/women/79.jpg',
      address: '789 Pine Road, Eastwood',
      time: 'Today, 4:15 PM',
      status: 'scheduled',
      assistantName: 'David Johnson',
      assistantImage: 'https://randomuser.me/api/portraits/men/43.jpg',
      visitType: 'Blood Pressure Check',
      priority: 'normal',
    },
    {
      id: '4',
      patientName: 'Robert Brown',
      patientImage: 'https://randomuser.me/api/portraits/men/67.jpg',
      address: '234 Cedar Lane, Northside',
      time: 'Yesterday, 10:00 AM',
      status: 'completed',
      assistantName: 'Sarah Miller',
      assistantImage: 'https://randomuser.me/api/portraits/women/57.jpg',
      notes: "Patient's glucose levels are stable. Medication adjusted as discussed previously.",
      visitType: 'Diabetes Follow-up',
      priority: 'normal',
    },
    {
      id: '5',
      patientName: 'Alice Garcia',
      patientImage: 'https://randomuser.me/api/portraits/women/33.jpg',
      address: '567 Birch Court, Southtown',
      time: 'Yesterday, 3:45 PM',
      status: 'completed',
      assistantName: 'Michael Wang',
      assistantImage: 'https://randomuser.me/api/portraits/men/81.jpg',
      visitType: 'Post-Surgery Check',
      priority: 'normal',
    },
  ];
  
  const filteredVisits = assistantVisits.filter(
    (visit) =>
      visit.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.assistantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const inProgressVisits = filteredVisits.filter(visit => visit.status === 'in-progress');
  const scheduledVisits = filteredVisits.filter(visit => visit.status === 'scheduled');
  const completedVisits = filteredVisits.filter(visit => visit.status === 'completed');
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-welli-gray-800">Assistant Visits</h1>
        <p className="text-welli-gray-600">Monitor and join live assistant visits with patients</p>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Input
            placeholder="Search patients, assistants, or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-welli-gray-500" />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter size={16} /> Filter
          </Button>
          <Button size="sm" className="bg-welli-green hover:bg-welli-accent-green text-welli-gray-800">
            <Video size={16} className="mr-1" /> Live Visits ({inProgressVisits.length})
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <Tabs defaultValue="all">
          <div className="px-5 pt-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="live">Live Now</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="m-0">
            <div className="p-5 space-y-4">
              {inProgressVisits.length === 0 && scheduledVisits.length === 0 && completedVisits.length === 0 ? (
                <div className="text-center p-8">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-welli-light-green mb-4">
                    <Check size={24} className="text-welli-accent-green" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No visits found</h3>
                  <p className="text-welli-gray-600">No assistant visits match your search criteria</p>
                </div>
              ) : (
                filteredVisits.map((visit) => (
                  <AssistantVisitCard key={visit.id} visit={visit} />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="live" className="m-0">
            <div className="p-5 space-y-4">
              {inProgressVisits.length === 0 ? (
                <div className="text-center p-8">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-welli-light-green mb-4">
                    <Video size={24} className="text-welli-accent-green" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No live visits</h3>
                  <p className="text-welli-gray-600">There are no ongoing assistant visits at the moment</p>
                </div>
              ) : (
                inProgressVisits.map((visit) => (
                  <AssistantVisitCard key={visit.id} visit={visit} />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled" className="m-0">
            <div className="p-5 space-y-4">
              {scheduledVisits.length === 0 ? (
                <div className="text-center p-8">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-welli-light-green mb-4">
                    <Clock size={24} className="text-welli-accent-green" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No scheduled visits</h3>
                  <p className="text-welli-gray-600">There are no scheduled assistant visits</p>
                </div>
              ) : (
                scheduledVisits.map((visit) => (
                  <AssistantVisitCard key={visit.id} visit={visit} />
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="m-0">
            <div className="p-5 space-y-4">
              {completedVisits.length === 0 ? (
                <div className="text-center p-8">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-welli-light-green mb-4">
                    <AlertCircle size={24} className="text-welli-accent-green" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No completed visits</h3>
                  <p className="text-welli-gray-600">There are no completed assistant visits in your records</p>
                </div>
              ) : (
                completedVisits.map((visit) => (
                  <AssistantVisitCard key={visit.id} visit={visit} />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="bg-welli-light-green p-5 rounded-xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-welli-gray-800 mb-1">Need to schedule an assistant visit?</h3>
            <p className="text-welli-gray-600">Coordinate medical assistant visits for your patients who need in-home care</p>
          </div>
          <Button className="mt-3 md:mt-0 bg-welli-green hover:bg-welli-dark-green text-welli-gray-800">
            Schedule New Visit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssistantVisits;
