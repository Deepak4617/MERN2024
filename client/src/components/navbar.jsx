import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { Navbar } from "flowbite-react";
import { authToken } from '../storage/authToken';

import Cookies from 'js-cookie';

const NavbarComponent = () => {

  const navigate = useNavigate();

  const token = authToken();

  const home = () => {
    navigate('/')
  }

  const contact = () => {
    navigate('/contact')
  }

  const about = () => {
    navigate('/about')
  }

  const service = () => {
    navigate('/service')
  }

  const register = () => {
    navigate('/register')
  }

  const login = () => {
    navigate('/login')
  }

  const logout = () => {
    Cookies.remove('authToken')
    navigate('/login')
  }

  const [isOpen, setIsOpen] = useState(false); 

  const toggleNavbar = () => {
    setIsOpen(!isOpen); // Toggle navbar open/close
  };

  const handleItemClick = (callback) => {
    callback(); // Execute the passed function (e.g., navigate to a route)
    setIsOpen(false); // Close the navbar after clicking an item
  };

  return (
    <>
     <Navbar fluid className='bg-gradient-to-r from-blue-900 via-purple-700 cursor-pointer'>
      <Navbar.Brand>
        <span className="text-1xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-500">
          Deepak Kumar
        </span>
      </Navbar.Brand>

      <div className="flex md:order-2">
        {/* Optional right-side content */}
      </div>

      <Navbar.Toggle onClick={toggleNavbar} aria-controls="navbar-collapse" />

      <Navbar.Collapse id="navbar-collapse" className={isOpen ? 'block' : 'hidden'}>
        <span onClick={() => handleItemClick(home)} className='text-1xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-500'>
          Home
        </span>
        <span onClick={() => handleItemClick(about)} className='text-1xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-500'>
          About
        </span>
        <span onClick={() => handleItemClick(contact)} className='text-1xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-500'>
          Contact
        </span>
        <span onClick={() => handleItemClick(service)} className='text-1xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-500'>
          Service
        </span>
        {token ? (
          <span onClick={() => handleItemClick(logout)} className='text-1xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-500'>
            Logout
          </span>
        ) : (
          <>
            <span onClick={() => handleItemClick(register)} className='text-1xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-500'>
              Register
            </span>
            <span onClick={() => handleItemClick(login)} className='text-1xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-yellow-500'>
              Login
            </span>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
    </>
  );
};

export default NavbarComponent;
