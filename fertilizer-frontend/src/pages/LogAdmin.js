import React, { useState } from 'react';
import API from '../api';  // assuming you use axios for API calls
import {useNavigate } from 'react-router-dom';
const LogAdmin = () => {
   const navigate = useNavigate();
  const [form, setForm] = useState({  // useState instead of plain object
    UserName: '',
    Password: ''
  });

  const handleChange = e => {
    setForm({
      ...form,             
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
     
      const response = await API.post('/admin', form); 
      alert('Login successful: ' + response.data.message);
      setForm({ UserName: '', Password: '' });
      navigate('/admindashboard');
    } catch (error) {
      console.log(error.response?.data?.error || 'Login failed');
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form className="mt-28 w-full max-w-md" onSubmit={handleSubmit}>
        <label>
          Enter UserName:
          <input
            name="UserName"
            type="text"
            placeholder="Enter Your Username"
            value={form.UserName}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </label>

        <label>
          Enter Password:
          <input
            name="Password"
            type="password"
            placeholder="Password"
            value={form.Password}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LogAdmin;
