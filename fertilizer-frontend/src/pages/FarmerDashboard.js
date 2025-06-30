import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FarmerDashboard = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    village: '',
    phone: '',
    type: '',
    quantity: 1,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/fertilizer')
      .then(res => setFertilizers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/farmerrequest', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Available Fertilizers</h1>
      <ul className="mb-6">
        {fertilizers.map(f => (
          <li key={f._id}>
            <strong>{f.name}</strong> - {f.type} - ₹{f.price}/kg
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Request Fertilizer</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input name="name" placeholder="Your Name" required onChange={handleChange} className="border p-2 w-full" />
        <input name="village" placeholder="Village" required onChange={handleChange} className="border p-2 w-full" />
        <input name="phone" placeholder="Phone Number" required onChange={handleChange} className="border p-2 w-full" />
        <select name="type" required onChange={handleChange} className="border p-2 w-full">
          <option value="">Select Fertilizer</option>
          {fertilizers.map(f => (
            <option key={f._id} value={f.name}>{f.name}</option>
          ))}
        </select>
        <input type="number" name="quantity" min="1" required onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Submit Request</button>
      </form>

      {message && <p className="mt-4 text-blue-600">{message}</p>}
    </div>
  );
};

export default FarmerDashboard;
