import React from 'react';
import {Link,useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  const goToFarmer = () => {
    localStorage.setItem('role', 'farmer');
    navigate('/addfarmer');
  };

  const goToAdmin = () => {
    localStorage.setItem('role', 'admin');
    navigate('/logadmin');
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Navbar */}
      <nav className='bg-orange-500 p-4 shadow-md'>
        <div className='container mx-auto flex justify-between items-center'>
          <Link to="/" className='text-white text-2xl font-bold tracking-wide'>
            Fertilizer Center
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className='max-w-md mx-auto mt-28 p-8 bg-white rounded-2xl shadow-xl text-center'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Choose Your Mode:</h2>
        
        <button 
          onClick={goToFarmer}
          className='w-full bg-orange-400 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg
           transition duration-300 mb-4'
        >
          Farmer
        </button>
        
        <button 
          onClick={goToAdmin}
          className='w-full bg-orange-400 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg 
          transition duration-300 mb-4'
        >
          Admin
        </button>
      </div>
    </div>
  );
};

export default Home;

