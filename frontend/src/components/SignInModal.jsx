import React, { useState } from 'react';
import { X, Phone, MapPin, ChevronDown, User } from "lucide-react";
import { societyData } from '../constant/index.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInModal = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSociety, setSelectedSociety] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const navigate = useNavigate();
 

  const [formData, setFormData] = useState({
    username: '',
    mobile: '',
    society: '',
    village: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocietyChange = (e) => {
    const value = e.target.value;
    setSelectedSociety(value);
    setSelectedVillage('');
    setFormData(prev => ({
      ...prev,
      society: value,
      village: ''
    }));
  };

  const handleVillageChange = (e) => {
    const value = e.target.value;
    setSelectedVillage(value);
    setFormData(prev => ({
      ...prev,
      village: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
     
     try { 
      /*
       const res = await axios.post(formData);
       console.log("login success",res.data);
       alert("Login successful!");
       localStorage.setItem("token",res.data.token);
       */
       navigate('/admindashboard');
     } catch (error) {
       console.error("Login error:", err.response?.data || err.message);
       alert("Login failed. Check your credentials.");
     }
     
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button 
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-sm font-semibold text-black mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 text-black"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-black mb-2">Mobile Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 text-black"
              />
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-black mb-2">Society</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center z-10">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="society"
                value={selectedSociety}
                onChange={handleSocietyChange}
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 "
              >
                <option value="">Select Society</option>
                {Object.keys(societyData).map((society) => (
                  <option key={society} value={society} className='text-black bg-white'>{society}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-semibold text-black mb-2">Village</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center z-10">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="village"
                value={selectedVillage}
                onChange={handleVillageChange}
                disabled={!selectedSociety}
                className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl bg-white text-black ${
                  !selectedSociety 
                    ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' 
                    : 'border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-orange-500 text-gray-700'
                }`}
              >
                <option value="">Select Village</option>
                {selectedSociety &&
                  societyData[selectedSociety].map((village) => (
                    <option key={village} value={village}>{village}</option>
                  ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <ChevronDown className={`h-5 w-5 ${!selectedSociety ? 'text-gray-300' : 'text-gray-400'}`} />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading || !formData.username || !formData.mobile || !formData.society || !formData.village}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;
