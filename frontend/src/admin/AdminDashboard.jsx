import React, { useState } from 'react';
import { Check, X, Plus, Package, Users, AlertCircle, Search, Filter } from 'lucide-react';

const FertilizerAdminDashboard = () => {
  // Sample data - in real app this would come from API
  const [requests, setRequests] = useState([
    {
      id: 1,
      farmerName: "John Smith",
      farmerId: "F001",
      fertilizerType: "NPK 20-20-20",
      quantity: 50,
      unit: "kg",
      requestDate: "2025-08-15",
      status: "pending",
      reason: "Soil test shows nitrogen deficiency in wheat field"
    },
    {
      id: 2,
      farmerName: "Sarah Johnson",
      farmerId: "F002",
      fertilizerType: "Urea",
      quantity: 100,
      unit: "kg",
      requestDate: "2025-08-14",
      status: "pending",
      reason: "Preparing for corn planting season"
    },
    {
      id: 3,
      farmerName: "Mike Davis",
      farmerId: "F003",
      fertilizerType: "Phosphorus",
      quantity: 25,
      unit: "kg",
      requestDate: "2025-08-13",
      status: "approved",
      reason: "Root development enhancement needed"
    }
  ]);

  const [fertilizerStock, setFertilizerStock] = useState([
    { id: 1, type: "NPK 20-20-20", stock: 500, unit: "kg", minThreshold: 100 },
    { id: 2, type: "Urea", stock: 750, unit: "kg", minThreshold: 200 },
    { id: 3, type: "Phosphorus", stock: 300, unit: "kg", minThreshold: 50 },
    { id: 4, type: "Potassium", stock: 45, unit: "kg", minThreshold: 100 },
    { id: 5, type: "Organic Compost", stock: 200, unit: "kg", minThreshold: 150 }
  ]);

  const [activeTab, setActiveTab] = useState('requests');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddStock, setShowAddStock] = useState(false);
  const [newStock, setNewStock] = useState({ type: '', stock: '', unit: 'kg', minThreshold: '' });

  const handleApprove = (requestId) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved' }
        : req
    ));
    
    // Update stock
    const request = requests.find(req => req.id === requestId);
    if (request) {
      setFertilizerStock(stock => 
        stock.map(item => 
          item.type === request.fertilizerType 
            ? { ...item, stock: Math.max(0, item.stock - request.quantity) }
            : item
        )
      );
    }
  };

  const handleReject = (requestId) => {
    setRequests(requests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected' }
        : req
    ));
  };

  const handleAddStock = () => {
    if (newStock.type && newStock.stock && newStock.minThreshold) {
      const existingStock = fertilizerStock.find(item => item.type === newStock.type);
      
      if (existingStock) {
        setFertilizerStock(stock => 
          stock.map(item => 
            item.type === newStock.type 
              ? { ...item, stock: item.stock + parseInt(newStock.stock) }
              : item
          )
        );
      } else {
        setFertilizerStock([...fertilizerStock, {
          id: Date.now(),
          type: newStock.type,
          stock: parseInt(newStock.stock),
          unit: newStock.unit,
          minThreshold: parseInt(newStock.minThreshold)
        }]);
      }
      
      setNewStock({ type: '', stock: '', unit: 'kg', minThreshold: '' });
      setShowAddStock(false);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.fertilizerType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStockStatus = (item) => {
    if (item.stock <= item.minThreshold) return 'low';
    if (item.stock <= item.minThreshold * 1.5) return 'medium';
    return 'high';
  };

  const getStockColor = (status) => {
    switch (status) {
      case 'low': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-green-50 border-green-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Fertilizer Management Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage farmer requests and fertilizer inventory</p>
            </div>
            <div className="flex space-x-4">
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <div className="text-sm text-blue-600">Pending Requests</div>
                <div className="text-2xl font-bold text-blue-900">
                  {requests.filter(r => r.status === 'pending').length}
                </div>
              </div>
              <div className="bg-red-50 px-4 py-2 rounded-lg">
                <div className="text-sm text-red-600">Low Stock Items</div>
                <div className="text-2xl font-bold text-red-900">
                  {fertilizerStock.filter(item => getStockStatus(item) === 'low').length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('requests')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'requests'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Users className="inline w-5 h-5 mr-2" />
                Farmer Requests
              </button>
              <button
                onClick={() => setActiveTab('stock')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stock'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Package className="inline w-5 h-5 mr-2" />
                Stock Management
              </button>
            </nav>
          </div>
        </div>

        {/* Farmer Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by farmer name or fertilizer type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Requests List */}
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{request.farmerName}</h3>
                        <span className="text-sm text-gray-500">ID: {request.farmerId}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Fertilizer:</span>
                          <p className="font-medium">{request.fertilizerType}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Quantity:</span>
                          <p className="font-medium">{request.quantity} {request.unit}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Request Date:</span>
                          <p className="font-medium">{request.requestDate}</p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="text-gray-500 text-sm">Reason:</span>
                        <p className="text-gray-700 mt-1">{request.reason}</p>
                      </div>
                    </div>
                    
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(request.id)}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredRequests.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No requests found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stock Management Tab */}
        {activeTab === 'stock' && (
          <div className="space-y-6">
            {/* Add Stock Button */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Fertilizer Stock</h2>
              <button
                onClick={() => setShowAddStock(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Stock
              </button>
            </div>

            {/* Stock Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fertilizerStock.map((item) => {
                const status = getStockStatus(item);
                return (
                  <div
                    key={item.id}
                    className={`p-6 rounded-lg border-2 ${getStockColor(status)} transition-colors`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{item.type}</h3>
                      {status === 'low' && (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Stock:</span>
                        <span className="font-medium">{item.stock} {item.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min Threshold:</span>
                        <span className="font-medium">{item.minThreshold} {item.unit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div
                          className={`h-2 rounded-full ${
                            status === 'low' ? 'bg-red-500' : 
                            status === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(100, (item.stock / (item.minThreshold * 2)) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Stock Modal */}
            {showAddStock && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Fertilizer Stock</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fertilizer Type
                      </label>
                      <input
                        type="text"
                        value={newStock.type}
                        onChange={(e) => setNewStock({...newStock, type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., NPK 20-20-20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        value={newStock.stock}
                        onChange={(e) => setNewStock({...newStock, stock: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unit
                      </label>
                      <select
                        value={newStock.unit}
                        onChange={(e) => setNewStock({...newStock, unit: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="kg">Kilograms</option>
                        <option value="tons">Tons</option>
                        <option value="bags">Bags</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Threshold
                      </label>
                      <input
                        type="number"
                        value={newStock.minThreshold}
                        onChange={(e) => setNewStock({...newStock, minThreshold: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleAddStock}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                    >
                      Add Stock
                    </button>
                    <button
                      onClick={() => setShowAddStock(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FertilizerAdminDashboard;