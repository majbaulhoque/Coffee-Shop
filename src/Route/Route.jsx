import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import MainLayout from '.././Layout/MainLayout'
import AddCoffee from '../Component/Add Coffee/AddCoffee';
import UpdateCoffee from '../Component/UpdateCoffee/UpdateCoffee';

const Route = createBrowserRouter ([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/addCoffee',
                element: <AddCoffee />,
            },
            {
                path: '/updateCoffee/:id',
                element: <UpdateCoffee />,
            },
        ],
    }
])

export default Route;