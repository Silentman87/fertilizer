import React from 'react';
import { BrowserRouter } from 'react-router-dom'; 
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Contact } from 'lucide-react';   
import Testomonial from './components/Testomonial';
import Footer from './components/Footer';
import FeatureSection from './components/FeatureSection';
import HeroSection from './components/HeroSection';
import Workflow from './components/Workflow';
import FarmerDashboard from './pages/FarmerDashboard';
import Withoutnavbarroute from './components/Withoutnavbarroute';
import Withnavbarroute from './components/Withnavbarroute';
import AdminDashboard from './admin/AdminDashboard';


function App() {
  

  return (
    <Router>
   
      <Routes>
       
      <Route element={<Withnavbarroute />}>
      <Route path='/' element={<Login />}/>
      <Route path="/Login" element={<Login />}/>
      <Route path="/workflow" element={<Workflow />}/>
      <Route path="/footer" element={<Footer />}/>
      <Route path="/feature" element={<FeatureSection />}/>
      <Route path="/opinion" element={<Testomonial/>}/>
      <Route path="/herosection" element={<HeroSection/>}/>
        </Route> 

      
      <Route element={<Withoutnavbarroute />}>
          <Route path="/farmerdashboard" element={<FarmerDashboard />}/>
      </Route>

       <Route path="/admindashboard" element={<AdminDashboard />}/>
    </Routes>
     </Router>
    
  )
}

export default App;
