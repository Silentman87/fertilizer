import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Withnavbarroute = () => {
    return (
        <>
          <Navbar />
          <Outlet />
        </>
    )
};


export default Withnavbarroute;