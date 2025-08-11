import React, { useState, useSyncExternalStore } from 'react';
import { Menu, X, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import SignInModal from './SignInModal';
import logo from "../asset/logo.png";
import CreateAccountModal from './CreateAccountModal';
import { navItems } from '../constant';

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <div>
      <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
        <div className="container px-4 mx-auto relative lg:text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center flex-shrink-0">
              <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
              <span className="text-xl tracking-tight">Fertilizer Distributed Unit</span>
            </div>
            <ul className="hidden lg:flex ml-14 space-x-12">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href} className="hover:text-orange-500 transition duration-200">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="hidden lg:flex justify-center space-x-4 items-center">
              <button 
                onClick={() => setShowSignInModal(true)}
                className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-200"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowCreateAccountModal(true)}
                className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-4 rounded-md text-white hover:from-orange-600 hover:to-orange-900 transition duration-200"
              >
                Create Account
              </button>
            </div>
            <div className="lg:hidden md:flex flex-col justify-end">
              <button onClick={toggleNavbar}>
                {mobileDrawerOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>


         
          {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
              <ul>
                {navItems.map((item, index) => (
                  <li key={index} className="py-4">
                    <a href={item.href} className="hover:text-orange-500 transition duration-200">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex space-x-6 mt-6">
                <button 
                  onClick={() => {
                    setShowSignInModal(true);
                    setMobileDrawerOpen(false);
                  }}
                  className="py-2 px-3 border rounded-md"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setShowCreateAccountModal(true);
                    setMobileDrawerOpen(false);
                  }}
                  className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
                >
                  Create Account
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>


      {/* Modals */}
      {showSignInModal && <SignInModal onClose={() => setShowSignInModal(false)} />}
      {showCreateAccountModal && <CreateAccountModal onClose={() => setShowCreateAccountModal(false)} />}
    </div>
  );
};

export default Navbar;