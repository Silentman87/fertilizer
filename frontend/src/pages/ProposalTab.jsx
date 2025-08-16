import React, { useState, useEffect } from 'react';

const ProposalTab = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProposal, setSelectedProposal] = useState(null);

  // Fetch proposals from database
  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await fetch('/api/proposals');
      const data = await response.json();
      setProposals(data);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      approved: { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
      delivered: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Delivered' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      normal: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Normal' },
      urgent: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Urgent' },
      emergency: { bg: 'bg-red-100', text: 'text-red-800', label: 'Emergency' }
    };
    
    const config = priorityConfig[priority] || priorityConfig.normal;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesStatus = selectedStatus === 'all' || proposal.status === selectedStatus;
    const matchesSearch = proposal.farmername?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.village?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proposal.fertilizertype?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/proposals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        setProposals(proposals.map(proposal => 
          proposal.id === id ? { ...proposal, status: newStatus } : proposal
        ));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteProposal = async (id) => {
    if (window.confirm('Are you sure you want to delete this proposal?')) {
      try {
        const response = await fetch(`/api/proposals/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setProposals(proposals.filter(proposal => proposal.id !== id));
        }
      } catch (error) {
        console.error('Error deleting proposal:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <span className="ml-3 text-gray-600">Proposals are loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Fertilizer Demand Proposals</h1>
        <p className="text-gray-600">Farmer Request Proposals</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="delivered">Delivered</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search by farmer name, village, or fertilizer type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-64"
              />
            </div>
          </div>

          <button
            onClick={fetchProposals}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Proposals List */}
      {filteredProposals.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-xl font-medium text-gray-600 mb-2">No Proposals Found</h3>
          <p className="text-gray-500">
            {searchTerm || selectedStatus !== 'all' 
              ? 'No proposals found matching your filters.' 
              : 'No proposals have been submitted yet.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredProposals.map((proposal) => (
            <div key={proposal.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    👨‍🌾 {proposal.farmername}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {getStatusBadge(proposal.status)}
                    {proposal.priority && getPriorityBadge(proposal.priority)}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button
                    onClick={() => setSelectedProposal(proposal)}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 text-sm"
                  >
                    View Details
                  </button>
                  
                  <div className="relative group">
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm">
                      Change Status ▼
                    </button>
                    <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-300 rounded-md shadow-lg hidden group-hover:block z-10">
                      <button
                        onClick={() => updateStatus(proposal.id, 'pending')}
                        className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-yellow-50"
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => updateStatus(proposal.id, 'approved')}
                        className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-green-50"
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => updateStatus(proposal.id, 'delivered')}
                        className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-blue-50"
                      >
                        Delivered
                      </button>
                      <button
                        onClick={() => updateStatus(proposal.id, 'rejected')}
                        className="block w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-red-50"
                      >
                        Rejected
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteProposal(proposal.id)}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 block">Mobile:</span>
                  <span className="font-medium">{proposal.mobilenumber}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Village:</span>
                  <span className="font-medium">{proposal.village}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Fertilizer:</span>
                  <span className="font-medium">{proposal.fertilizertype}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Quantity:</span>
                  <span className="font-medium">{proposal.quantityrequired}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mt-4">
                <div>
                  <span className="text-gray-600 block">Society:</span>
                  <span className="font-medium">{proposal.society}</span>
                </div>
                <div>
                  <span className="text-gray-600 block">Delivery Date:</span>
                  <span className="font-medium">
                    {proposal.deliverydate ? new Date(proposal.deliverydate).toLocaleDateString() : '-'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 block">Submitted Date:</span>
                  <span className="font-medium">
                    {proposal.submittedDate ? new Date(proposal.submittedDate).toLocaleDateString() : '-'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Proposal Details Modal */}
      {selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800">Proposal Details</h2>
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Farmer Name</label>
                    <p className="text-gray-800 font-medium">{selectedProposal.farmername}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Mobile Number</label>
                    <p className="text-gray-800 font-medium">{selectedProposal.mobilenumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Village</label>
                    <p className="text-gray-800 font-medium">{selectedProposal.village}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Society</label>
                    <p className="text-gray-800 font-medium">{selectedProposal.society}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Fertilizer Type</label>
                    <p className="text-gray-800 font-medium">{selectedProposal.fertilizertype}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Fertilizer ID</label>
                    <p className="text-gray-800 font-medium">{selectedProposal.fertilizerid}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Required Quantity</label>
                    <p className="text-gray-800 font-medium">{selectedProposal.quantityrequired}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Kisan Card</label>
                    <p className="text-gray-800 font-medium">{selectedProposal.kishancard}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Delivery Date</label>
                    <p className="text-gray-800 font-medium">
                      {selectedProposal.deliverydate ? new Date(selectedProposal.deliverydate).toLocaleDateString() : '-'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Current Status</label>
                    <div className="mt-1">{getStatusBadge(selectedProposal.status)}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedProposal(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposalTab;