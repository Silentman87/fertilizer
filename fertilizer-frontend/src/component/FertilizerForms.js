import React, { useEffect, useState } from 'react';
import API from '../api';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const FertilizerForms = () => {
  const [form, setForm] = useState({
    type: '',
    priceperkg: '',
    quantitykg: '',
    arrivalDate: '',
    societyId: ''
  });
   const navigate = useNavigate();
  const [societies, setSocieties] = useState([]);

  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        const res = await API.get('/society');
        setSocieties(res.data);
      } catch (err) {
        alert('Failed to fetch societies');
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
      await API.post('/fertilizer', form);
      alert('Fertilizer added');
      setForm({ type: '', priceperkg: '', quantitykg: '', arrivalDate: '', societyId: '' });
       navigate('/admindashboard');
    } catch (error) {
      alert(error.response?.data?.error || 'Submission failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <form 
        onSubmit={handleSubmit} 
        className="max-w-lg mx-auto mt-28 p-6 bg-white rounded-xl shadow-lg space-y-4"
      >
        <input
          name="type"
          placeholder="Enter type"
          value={form.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          name="priceperkg"
          placeholder="Enter price per kg"
          value={form.priceperkg}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          name="quantitykg"
          placeholder="Enter quantity in kg"
          value={form.quantitykg}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          name="arrivalDate"
          type="date"
          placeholder="Enter arrival date"
          value={form.arrivalDate}
          onChange={handleChange}
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
            <option key={soc._id} value={soc._id}>
              {soc.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition duration-300"
        >
          Add Fertilizer
        </button>
      </form>
    </div>
  );
};

export default FertilizerForms;
