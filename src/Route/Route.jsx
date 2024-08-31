import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import MainLayout from '.././Layout/MainLayout'
import AddCoffee from '../Component/Add Coffee/AddCoffee';
import UpdateCoffee from '../Component/UpdateCoffee/UpdateCoffee';
import SignUp from '../Component/SignUp/SignUp';
import SignIn from '../Component/Sign In/SignIn';
import Users from '../Component/Users/Users';

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
            {
                path: '/signUp',
                element: <SignUp />,
            },
            {
                path: '/signIn',
                element: <SignIn />,
            },
            {
                path: '/users',
                element: <Users />,
            },
        ],
    }
])

export default Route;