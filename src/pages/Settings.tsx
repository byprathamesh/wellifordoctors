
import React, { useState } from 'react';
import { Clock, Bell, Shield, Calendar, User, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ScheduleBlock = ({ startTime, endTime, onDelete }: { startTime: string, endTime: string, onDelete: () => void }) => {
  return (
    <div className="flex items-center justify-between bg-welli-light-green p-3 rounded-md">
      <div className="flex items-center gap-2">
        <Clock size={16} className="text-welli-accent-green" />
        <span className="text-welli-gray-800">{startTime} - {endTime}</span>
      </div>
      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={onDelete}>
        Remove
      </Button>
    </div>
  );
};

const Settings = () => {
  const [scheduleBlocks, setScheduleBlocks] = useState([
    { id: '1', startTime: '09:00', endTime: '12:00' },
    { id: '2', startTime: '14:00', endTime: '17:00' },
  ]);
  
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');
  
  const addScheduleBlock = () => {
    if (newStartTime && newEndTime) {
      setScheduleBlocks([
        ...scheduleBlocks,
        {
          id: Date.now().toString(),
          startTime: newStartTime,
          endTime: newEndTime
        }
      ]);
      setNewStartTime('');
      setNewEndTime('');
    }
  };
  
  const deleteScheduleBlock = (id: string) => {
    setScheduleBlocks(scheduleBlocks.filter(block => block.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-welli-gray-800">Settings</h1>
        <p className="text-welli-gray-600">Manage your account preferences and availability</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <Tabs defaultValue="profile">
          <div className="border-b border-welli-gray-200">
            <TabsList className="px-5 pt-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="profile" className="p-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-welli-light-green flex items-center justify-center">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" defaultValue="Dr. XYZ" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select defaultValue="general">
                    <SelectTrigger>
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Medicine</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="doctor@wellidoc.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="license">Medical License Number</Label>
                  <Input id="license" defaultValue="ML123456789" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="languages">Languages Spoken</Label>
                  <Input id="languages" defaultValue="English, Spanish" className="mt-1" />
                </div>
              </div>
              
              <div className="mb-6">
                <Label htmlFor="bio">Professional Bio</Label>
                <textarea
                  id="bio"
                  className="w-full mt-1 border border-welli-gray-300 rounded-md p-3 h-32"
                  defaultValue="Experienced physician dedicated to providing comprehensive and compassionate care to patients."
                ></textarea>
              </div>
              
              <Button className="bg-welli-green hover:bg-welli-dark-green text-welli-gray-800">
                <Save size={16} className="mr-2" /> Save Changes
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="availability" className="p-6">
            <div className="max-w-2xl">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Working Hours</h3>
                <p className="text-welli-gray-600 mb-4">Set your preferred working hours for consultations (3-hour blocks)</p>
                
                <div className="mb-4 space-y-2">
                  {scheduleBlocks.map(block => (
                    <ScheduleBlock
                      key={block.id}
                      startTime={block.startTime}
                      endTime={block.endTime}
                      onDelete={() => deleteScheduleBlock(block.id)}
                    />
                  ))}
                </div>
                
                <div className="flex items-end gap-2">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Select 
                      value={newStartTime}
                      onValueChange={setNewStartTime}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Start" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={i} value={`${String(i).padStart(2, '0')}:00`}>
                            {`${String(i).padStart(2, '0')}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Select 
                      value={newEndTime}
                      onValueChange={setNewEndTime}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="End" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={i} value={`${String(i).padStart(2, '0')}:00`}>
                            {`${String(i).padStart(2, '0')}:00`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    className="bg-welli-green hover:bg-welli-dark-green text-welli-gray-800" 
                    onClick={addScheduleBlock}
                  >
                    Add Block
                  </Button>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Consultation Duration</h3>
                <p className="text-welli-gray-600 mb-4">Set your default consultation durations</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="videoDuration">Video Consultation</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="chatDuration">Chat Consultation</Label>
                    <Select defaultValue="20">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="20">20 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="followUpDuration">Follow-Up</Label>
                    <Select defaultValue="15">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="20">20 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Button className="bg-welli-green hover:bg-welli-dark-green text-welli-gray-800">
                <Save size={16} className="mr-2" /> Save Availability
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="p-6">
            <div className="max-w-2xl">
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-welli-gray-200 rounded-md">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-welli-accent-green" />
                    <div>
                      <h4 className="font-medium">Appointment Reminders</h4>
                      <p className="text-sm text-welli-gray-600">Receive notifications about upcoming appointments</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-welli-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-welli-accent-green"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-welli-gray-200 rounded-md">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-welli-accent-green" />
                    <div>
                      <h4 className="font-medium">New Reports</h4>
                      <p className="text-sm text-welli-gray-600">Get notified when patient reports are ready</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-welli-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-welli-accent-green"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-welli-gray-200 rounded-md">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-welli-accent-green" />
                    <div>
                      <h4 className="font-medium">Referral Updates</h4>
                      <p className="text-sm text-welli-gray-600">Get notified about your referral activity</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-welli-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-welli-accent-green"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-welli-gray-200 rounded-md">
                  <div className="flex items-center gap-3">
                    <Bell size={20} className="text-welli-accent-green" />
                    <div>
                      <h4 className="font-medium">Payment Notifications</h4>
                      <p className="text-sm text-welli-gray-600">Get notified about payments and earnings</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-welli-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-welli-accent-green"></div>
                  </label>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="p-6">
            <div className="max-w-2xl">
              <h3 className="text-lg font-medium mb-4">Security Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Change Password</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" className="mt-1" />
                    </div>
                  </div>
                  <Button className="mt-3 bg-welli-green hover:bg-welli-dark-green text-welli-gray-800">
                    Update Password
                  </Button>
                </div>
                
                <div className="border-t border-welli-gray-200 pt-6">
                  <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-welli-gray-600 mb-3">Add an extra layer of security to your account</p>
                  <Button variant="outline">Enable Two-Factor Authentication</Button>
                </div>
                
                <div className="border-t border-welli-gray-200 pt-6">
                  <h4 className="font-medium mb-2">Session Management</h4>
                  <p className="text-sm text-welli-gray-600 mb-3">Manage your active sessions across devices</p>
                  <Button variant="outline">View Active Sessions</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
