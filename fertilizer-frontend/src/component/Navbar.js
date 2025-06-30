import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Correct package
import { FaBars, FaTimes } from 'react-icons/fa';


const Navbar = () => {
     const [isopen,setisopen] = useState(false);
  return (
    <nav className='bg-orange-500 p-4 shadow-md'> {/* ✅ 'shhadow-md' typo fixed */}
      <div className='container mx-auto flex justify-between items-center'>
        <Link to="/dashboard" className='text-gray-800 text-xl font-bold'> {/* ✅ Correct class and tag structure */}
          Fertilizer Center
        </Link>
         
         
          
             <button className='text-white text-2xl ' onClick={()=> setisopen(!isopen)}>
         {isopen?<FaTimes/>:<FaBars/>}
      </button>
      </div>

        {isopen &&  (<ul className='mx-hidden bg-orange-400 text-white p-4 space-y-4 absolute ml-0 w-full shadow-md'> 

            <Link to="/dashboard" className='block py-2' onClick={()=>setisopen(false)}>Dashboard</Link>
     
            <Link to="/add-farmer" className='block py-2' onClick={()=>setisopen(false)}>Add Farmer</Link>
            <Link to="/add-fertilizer" className='block py-2' onClick={()=>setisopen(false)}>Add Fertilizer</Link>
            <Link to="/add-society" className='block py-2' onClick={()=>setisopen(false)}>Add society</Link>
  

        </ul>)}
    </nav>
  );
};

export default Navbar;
