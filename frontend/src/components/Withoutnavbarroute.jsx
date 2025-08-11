import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar2 from '../pages/Navbar2';

const Withoutnavbarroute = () => {
  return (
    <>
      {/* No navbar or custom auth navbar */}
      <Navbar2 />
      <Outlet />
    </>
  );
};

export default Withoutnavbarroute;
