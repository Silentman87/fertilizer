import React, { useState } from 'react';
import { Menu, X } from "lucide-react";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import Workflow from "./Workflow";
import Testimonials from "./Testomonial";
import Footer from "./Footer";
import Navbar from './Navbar';

const Login = () => {
  return (
     <div>
    <HeroSection />
    <FeatureSection />
    <Workflow />
    <Testimonials />
    <Footer />
     </div>
  );
};

export default Login;
