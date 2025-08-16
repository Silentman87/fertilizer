import React from 'react'
import {Bell} from 'lucide-react'
import { useState , useEffect } from 'react';

const Navbar2 = () => {
    const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    // Load initial notification count
    loadNotificationCount();
  }, []);

  const loadNotificationCount = async () => {
    try {
      const notifications = await apiService.fetchNotifications();
      setNotificationCount(notifications.length);
    } catch (err) {
    
    }
  };

  return (
    <div>
       {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
              <p className="text-gray-600">Fertilizer Management System</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600" />
                {notificationCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </div>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">F</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar2;
