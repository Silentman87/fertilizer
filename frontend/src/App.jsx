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
import AdminDashboard from './pages/AdminDashboard';
import Withoutnavbarroute from './components/Withoutnavbarroute';
import Withnavbarroute from './components/Withnavbarroute';


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
          <Route path="/admindashboard" element={<AdminDashboard />}/>
      </Route>
    </Routes>
     </Router>
    
  )
}

export default App;
