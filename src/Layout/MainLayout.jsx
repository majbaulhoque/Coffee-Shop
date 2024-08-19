import React from 'react';
import NavBar from '../Component/Nav Bar/NavBar';
import Footer from '../Pages/Footer/Footer';
import { Outlet } from 'react-router-dom';


const MainLayout = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;