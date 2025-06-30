// src/components/SocietyForm.js
import React, { useState } from 'react';
import API from '../api';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
function SocietyForm() {
  const [form, setForm] = useState({
    name: '',
    location: ''
  });
  const navigate = useNavigate();
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/society', form);
      alert('Society added!');
      setForm({ name: '', location: ''});
      navigate('/admindashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add society');
    }
  };

  
  return (
    <div className="min-h-screen bg-gray-100">
     <Navbar />
    <form  onSubmit={handleSubmit} className="max-w-md mx-auto mt-28 p-6 bg-white rounded-xl shadow-lg space-y-4">
      <input   name="name" 
          placeholder="Society Name" 
          onChange={handleChange} 
          value={form.name}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />

      <input  name="location" 
          placeholder="Location" 
          onChange={handleChange} 
          value={form.location}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />


      <button   type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300">Add Society</button>
    </form>
    </div>
  );
}

export default SocietyForm;
