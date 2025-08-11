import React, { useState } from 'react';
import { Menu, X, User, Mail, Lock, Eye, EyeOff,MapPin,ChevronDown, Home, AlertTriangle } from "lucide-react";
import { societyData } from '../constant/index.jsx';
import axios from 'axios';

const CreateAccountModal = ({ onClose }) => {
   const [isLoading, setIsLoading] = useState(false);
    const [selectedSociety, setSelectedSociety] = useState('');
    const [selectedVillage, setSelectedVillage] = useState('');


  const [formData, setFormData] = useState({
    username: '',
    mobile: '',
    society: '',
    village: '',
    address: '',
    aadhar_card: '',
    kishan_card: ''
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
        const res = await axios.post('{/gotoregiterpage}' ,formData);
        alert('registration successfull: ');
     } catch (error) {
        console.log(error);
        alert('registration failed');
     }
    setTimeout(() => {
      alert(JSON.stringify(formData, null, 2));
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-2xl max-h-[90vh] overflow-y-auto">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600">Join us today</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                UserName
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Mobile:
              </label>
              <input
                type="Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Mobile Num.."
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Society:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center z-10">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select 
               name="society"
               value={selectedSociety}
               onChange={handleSocietyChange}
               className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 text-black"
              >
                <option value="">Select Society</option>
                {Object.keys(societyData).map((society)=> (
                   <option key={society} value={society} className='bg-black text-white'>{society}</option>
                ))}
              </select>
      
            </div>
          </div>

           <div>
            <label className="block text-sm font-medium text-black mb-1">Village:</label>
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
                    ? 'border-gray-200 text-black bg-gray-50 cursor-not-allowed' 
                    : 'border-gray-200 hover:border-gray-300 focus:ring-2 focus:ring-orange-500 text-black'
                }`}
              >
                <option value="">Select Village</option>
                {selectedSociety &&
                  societyData[selectedSociety].map((village) => (
                    <option key={village} value={village} className='bg-black text-white'>{village}</option>
                  ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <ChevronDown className={`h-5 w-5 ${!selectedSociety ? 'text-gray-300' : 'text-gray-400'}`} />
              </div>
            </div>
          </div>
       
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address:
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="enter address"
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              />
            </div>
          </div>

           <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                aadhar_card:
              </label>
              <input
                type="Number"
                name="aadhar_card"
                value={formData.aadhar_card}
                onChange={handleChange}
                placeholder="aadhar_card"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black`}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                kishan_card:
              </label>
              <input
                type="Number"
                name="kishan_card"
                value={formData.kishan_card}
                onChange={handleChange}
                placeholder="kishan_card"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black`}
              />
            </div>
          </div>          

          
          <div className='pt-4'>
          <button 
            type="submit" 
            disabled={isLoading || !formData.username || !formData.mobile || !formData.society || !formData.village}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition duration-200 disabled:opacity-50"
            onClick={handleSubmit}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
          </div>


        </div>
      </div>
    </div>
  );
};


export default CreateAccountModal;