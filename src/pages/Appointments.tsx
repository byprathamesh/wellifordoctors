
import React, { useState } from 'react';
import { Calendar, List, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, MessageCircle, FileText, Stethoscope } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  patientImage: string;
  time: string;
  type: 'video' | 'chat' | 'assistant' | 'lab';
  status: 'upcoming' | 'completed' | 'cancelled';
  reason: string;
}

const AppointmentItem: React.FC<{ appointment: Appointment }> = ({ appointment }) => {
  const statusColors = {
    upcoming: 'bg-blue-50 text-blue-800',
    completed: 'bg-green-50 text-green-800',
    cancelled: 'bg-red-50 text-red-800',
  };
  
  const typeIcons = {
    video: <div className="p-2 rounded-md bg-welli-light-green text-welli-accent-green"><Video size={16} /></div>,
    chat: <div className="p-2 rounded-md bg-blue-50 text-blue-500"><MessageCircle size={16} /></div>,
    assistant: <div className="p-2 rounded-md bg-purple-50 text-purple-500"><Stethoscope size={16} /></div>,
    lab: <div className="p-2 rounded-md bg-yellow-50 text-yellow-500"><FileText size={16} /></div>,
  };
  
  const typeLabels = {
    video: 'Video Consult',
    chat: 'Chat Consult',
    assistant: 'Assistant Visit',
    lab: 'Lab Review',
  };
  
  return (
    <div className="welli-card flex items-start gap-4">
      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
        <img src={appointment.patientImage} alt={appointment.patientName} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-welli-gray-800">{appointment.patientName}</h4>
          <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[appointment.status]}`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>
        </div>
        
        <div className="flex items-center gap-3 text-sm text-welli-gray-600 mt-1">
          <span>{appointment.time}</span>
          <div className="flex items-center gap-1">
            {typeIcons[appointment.type]}
            <span>{typeLabels[appointment.type]}</span>
          </div>
        </div>
        
        <p className="text-sm text-welli-gray-500 mt-1">{appointment.reason}</p>
      </div>
      
      <Button className="bg-welli-green hover:bg-welli-dark-green text-welli-accent-green whitespace-nowrap">
        {appointment.status === 'upcoming' ? 'Join' : 'View details'}
      </Button>
    </div>
  );
};

const Appointments = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Sample data
  const appointments: Appointment[] = [
    {
      id: '1',
      patientName: 'Sarah Johnson',
      patientImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      time: 'Today, 10:30 AM',
      type: 'video',
      status: 'upcoming',
      reason: 'Follow-up on blood pressure medication',
    },
    {
      id: '2',
      patientName: 'Robert Chen',
      patientImage: 'https://randomuser.me/api/portraits/men/76.jpg',
      time: 'Today, 11:15 AM',
      type: 'chat',
      status: 'upcoming',
      reason: 'Medication refill request',
    },
    {
      id: '3',
      patientName: 'Emma Garcia',
      patientImage: 'https://randomuser.me/api/portraits/women/63.jpg',
      time: 'Today, 2:00 PM',
      type: 'video',
      status: 'upcoming',
      reason: 'Chronic headache consultation',
    },
    {
      id: '4',
      patientName: 'Daniel Thompson',
      patientImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      time: 'Yesterday, 3:30 PM',
      type: 'assistant',
      status: 'completed',
      reason: 'Home health check and vitals recording',
    },
    {
      id: '5',
      patientName: 'Olivia Martinez',
      patientImage: 'https://randomuser.me/api/portraits/women/28.jpg',
      time: 'Yesterday, 4:45 PM',
      type: 'lab',
      status: 'completed',
      reason: 'Review blood test results',
    },
  ];
  
  const formatMonth = () => {
    return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-welli-gray-800">Appointments</h1>
        <p className="text-welli-gray-600">Manage your upcoming and past appointments</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-welli-gray-200">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={view === 'list' ? 'bg-welli-light-green text-welli-accent-green' : ''}
              onClick={() => setView('list')}
            >
              <List size={16} className="mr-1" /> List
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={view === 'calendar' ? 'bg-welli-light-green text-welli-accent-green' : ''}
              onClick={() => setView('calendar')}
            >
              <Calendar size={16} className="mr-1" /> Calendar
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Filter size={16} />
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
                <ChevronLeft size={16} />
              </Button>
              <span className="text-sm font-medium">{formatMonth()}</span>
              <Button variant="ghost" size="icon" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <div className="px-5 pt-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="m-0">
            <div className="p-5 space-y-3">
              {view === 'list' ? (
                appointments.map((appointment) => (
                  <AppointmentItem key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <div className="min-h-[500px] flex items-center justify-center">
                  <p className="text-welli-gray-500">Calendar view will be implemented here</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming" className="m-0">
            <div className="p-5 space-y-3">
              {view === 'list' ? (
                appointments
                  .filter(a => a.status === 'upcoming')
                  .map((appointment) => (
                    <AppointmentItem key={appointment.id} appointment={appointment} />
                  ))
              ) : (
                <div className="min-h-[500px] flex items-center justify-center">
                  <p className="text-welli-gray-500">Calendar view will be implemented here</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="m-0">
            <div className="p-5 space-y-3">
              {view === 'list' ? (
                appointments
                  .filter(a => a.status === 'completed')
                  .map((appointment) => (
                    <AppointmentItem key={appointment.id} appointment={appointment} />
                  ))
              ) : (
                <div className="min-h-[500px] flex items-center justify-center">
                  <p className="text-welli-gray-500">Calendar view will be implemented here</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="cancelled" className="m-0">
            <div className="p-5 space-y-3">
              <p className="text-center text-welli-gray-500">No cancelled appointments</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Appointments;
