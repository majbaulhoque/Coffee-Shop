import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <NavLink to='/'>Espresso Emporium</NavLink>
        </div>
    );
};

export default NavBar;