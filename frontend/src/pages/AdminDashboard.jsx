import React, { useState, useEffect } from 'react';
import { 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle,
  BookOpen,
  MessageSquare,
  Bell,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Loader
} from 'lucide-react';

import FertilizerTab from './FertilizerTab';
import ProposalTab from './ProposalTab';
import NotificationsTab from './NotificationsTab';
import EducationTab from './EducationTab';

import FertilizerCard from './FertilizerCard';
import Messagepanel from './Messagepanel';
import ProposalForm from './ProposalForm';


// API Service Module
const apiService = {
  // Fertilizer APIs
  fetchFertilizers: async () => {
    // return await fetch('/api/fertilizers').then(res => res.json());
    return [];
  },
  
  searchFertilizers: async (query) => {
    // return await fetch(`/api/fertilizers/search?q=${query}`).then(res => res.json());
    return [];
  },
  
  // Proposal APIs
  fetchProposals: async () => {
    // return await fetch('/api/proposals').then(res => res.json());
    return [];
  },
  
  submitProposal: async (proposalData) => {
    // return await fetch('/api/proposals', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(proposalData)
    // }).then(res => res.json());
    return { success: true, proposalId: Date.now() };
  },
  
  updateProposalStatus: async (proposalId, status) => {
    // return await fetch(`/api/proposals/${proposalId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status })
    // }).then(res => res.json());
    return { success: true };
  },
  
  // Notification APIs
  fetchNotifications: async () => {
    // return await fetch('/api/notifications').then(res => res.json());
    return [];
  },
  
  markNotificationRead: async (notificationId) => {
    // return await fetch(`/api/notifications/${notificationId}/read`, {
    //   method: 'PATCH'
    // }).then(res => res.json());
    return { success: true };
  },
  
  updateSMSSettings: async (settings) => {
    // return await fetch('/api/sms-settings', {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(settings)
    // }).then(res => res.json());
    return { success: true };
  },
  
  // Education APIs
  fetchEducationalContent: async () => {
    // return await fetch('/api/education').then(res => res.json());
    return [];
  },
  
  fetchEducationByCategory: async (category) => {
    // return await fetch(`/api/education?category=${category}`).then(res => res.json());
    return [];
  }
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <Loader className="h-6 w-6 animate-spin text-green-600" />
    <span className="ml-2 text-gray-600">Loading...</span>
  </div>
);

// Error Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <div className="flex items-center">
      <XCircle className="h-5 w-5 text-red-500 mr-2" />
      <span className="text-red-700">{message}</span>
    </div>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="mt-2 text-red-600 hover:text-red-800 underline text-sm"
      >
        Try again
      </button>
    )}
  </div>
);



// Main Dashboard Component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('fertilizers');
 

  const renderActiveTab = () => {
    switch(activeTab) {
      case 'fertilizers': return <FertilizerTab />;
      case 'proposals': return <ProposalTab />;
      case 'education': return <EducationTab />;
      case 'notifications': return <NotificationsTab />;
      default: return <FertilizerTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
    

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mb-8">
          {[
            { id: 'fertilizers', label: 'Fertilizers', icon: Package },
            { id: 'proposals', label: 'Proposals', icon: Send },
            { id: 'education', label: 'Education', icon: BookOpen },
            { id: 'notifications', label: 'Alerts', icon: Bell }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {renderActiveTab()}
      </div>
    </div>
  );
};

export default AdminDashboard;