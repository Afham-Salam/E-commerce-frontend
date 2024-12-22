import React, { useState } from 'react';
import { FaRegHeart, FaUserPlus } from 'react-icons/fa';
import { IoCartOutline, IoLogOutSharp, IoSearchSharp } from 'react-icons/io5';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { navItem } from '../lib/data';
import { NavLink, useNavigate } from 'react-router-dom';
import CartMenu from './CartMenu';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const navigate=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem("token")
    navigate("/login")
  }
  const [cartOpen,setOpenCart]=useState(false)

 
  return (
    <div className="shadow-md py-7 px-10 bg-white relative z-10">
      {/* Navbar Content */}
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div>
          <img src="/logo.webp" className="h-10 w-auto" alt="Logo" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex gap-16 text-[17px] font-medium">
            {navItem.map((item) => (
              <li key={item.id}>
                <NavLink to={item.path}>{item.name}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Icons */}
        <div className="hidden lg:flex gap-8 text-[20px]">
          <FaUserPlus className='cursor-pointer' />
          <IoCartOutline className='cursor-pointer' onClick={()=>setOpenCart(!cartOpen)} />
          <FaRegHeart  className='cursor-pointer'/>
          <IoLogOutSharp className='cursor-pointer' onClick={handleLogout} />
        </div>

        {cartOpen && <CartMenu/>}

        {/* Hamburger Icon (Mobile Only) */}
        <div className="md:block lg:hidden text-[24px]" onClick={toggleMenu}>
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full max-w-xs h-full bg-white text-black z-50 shadow-md transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <AiOutlineClose
            className="text-black text-[24px] cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        {/* Menu Items */}
        <ul className="flex flex-col gap-6 p-6 text-[17px] font-medium">
          {navItem.map((item) => (
            <li key={item.id} onClick={toggleMenu}>
              <a href="#">{item.name}</a>
            </li>
          ))}
        </ul>

        {/* Icons (Mobile) */}
        <div className="flex gap-8 p-6 text-[20px] ">
          <FaUserPlus className='cursor-pointer' onClick={toggleMenu} />
          <IoCartOutline className='cursor-pointer' onClick={()=>setOpenCart(!cartOpen) } />
          <FaRegHeart className='cursor-pointer' onClick={toggleMenu} />
          <IoLogOutSharp className='cursor-pointer' onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
