import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';

const NavBar = () => {
    return (
        <div className='bg-[#372727] mb-'>
            <div className='flex justify-between items-center max-w-7xl mx-auto '>
                <div className='flex items-center'>
                    <Link to='/'><Logo /></Link>
                    <Link to='/' className='text-white text-5xl ml-4'>Espresso Emporium</Link>
                </div>
                <div className='flex space-x-6'>
                    <NavLink to='/' className="text-white text-2xl">Home</NavLink>
                    <NavLink to='/users' className="text-white text-2xl">Users</NavLink>
                    <NavLink to='/signUp' className="text-white text-2xl">Sign Up</NavLink>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
