import React  from 'react';
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';

import FarmerForm from './component/FarmerForms';
import FertilizerForm from './component/FertilizerForms';
import SocietyForm from  './component/SocietyForms';
import FarmerDashboard from './pages/FarmerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './component/ProtectedRoute';
import LogAdmin from './pages/LogAdmin';

import Home  from './pages/Home';
import './App.css';

function App() {
  return (
      <Router>
      <Routes>

        <Route path='/' element ={<Home />}  /> 
        <Route path='/logadmin' element = {<ProtectedRoute allowedRole="admin"> <LogAdmin /> </ProtectedRoute> } />
      


        <Route  path="/farmerdashboard" element={  <ProtectedRoute allowedRole="farmer">    <FarmerDashboard />  </ProtectedRoute>  }/>
        <Route  path="/admindashboard" element={  <ProtectedRoute allowedRole="admin">    <AdminDashboard />  </ProtectedRoute>  }/>


        <Route path="/addfarmer" element={ <FarmerForm /> } />
        <Route path="/add-society"  element={  <ProtectedRoute allowedRole="admin">    <SocietyForm />  </ProtectedRoute>  } />
        <Route path="/add-fertilizer"  element={  <ProtectedRoute allowedRole="admin">    <FertilizerForm />  </ProtectedRoute>  } />


      </Routes>
    </Router>
  );
}

export default App;
