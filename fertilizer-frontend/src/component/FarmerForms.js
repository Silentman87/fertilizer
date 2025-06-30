import React, { useState, useEffect } from "react";
import API from '../api';
import {useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function FarmerForm() {
   const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    village: '',
    societyId: '',
  });

  const [societies, setSocieties] = useState([]);

  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        const res = await API.get('/society');
        setSocieties(res.data);
      } catch (err) {
        alert("Failed to fetch societies");
      }
    };
    fetchSocieties();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/farmer', form);
      alert('Farmer added!');
      setForm({ name: '', phone: '', village: '', societyId: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add farmer');
    }
     navigate('/admindashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <form 
        onSubmit={handleSubmit} 
        className="max-w-lg mx-auto mt-28 p-6 bg-white rounded-xl shadow-lg space-y-4"
      >
        <input
          name="name"
          placeholder="Farmer Name"
          onChange={handleChange}
          value={form.name}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          value={form.phone}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          name="village"
          placeholder="Village"
          onChange={handleChange}
          value={form.village}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <select
          name="societyId"
          value={form.societyId}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select Society</option>
          {societies.map(soc => (
            <option key={soc._id} value={soc._id}>{soc.name}</option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Enter 
        </button>
      </form>
    </div>
  );
}

export default FarmerForm;
