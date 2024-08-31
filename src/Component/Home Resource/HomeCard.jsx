import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2';
import { BASE_URL } from '../../config';
import { Link } from 'react-router-dom';
import Banner from '../../assets/more/3.png'

const HomeCard = () => {
    const [coffeeList, setCoffeeList] = useState([]);
    const [isError, setIsError] = useState('');
    const [aboutCoffee, setAboutCoffee] = useState([]);

    const getCoffeeData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/coffee');
            setCoffeeList(res.data);
        } catch (error) {
            setIsError(error.message);
        }

    };

    const getAboutData = async () => {
        try {
            const res = await axios.get('/aboutCoffe.json')
            setAboutCoffee(res.data)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getCoffeeData();
        getAboutData();
    }, []);

    const handleDelete = async (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`${BASE_URL}/coffee/${_id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        setCoffeeList(coffeeList.filter(coffee => coffee._id !== _id));
                    }
                } catch (error) {
                    console.error("Error deleting the coffee:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "There was an error deleting the coffee.",
                        icon: "error"
                    });
                }
            }
        });
    };


    return (
        <div>
            <div className="relative w-full lg:w-auto">
                <img src={Banner} alt="Banner" className="w-full object-cover h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]" />
                <div className="absolute inset-0 flex items-center justify-center lg:justify-start lg:left-[50%] p-4">
                    <div className="text-white w-full max-w-lg md:max-w-xl">
                        <h3 className="text-lg sm:text-xl md:text-4xl text-center lg:text-left">
                            Would you like a Cup of Delicious Coffee?
                        </h3>
                        <p className="my-2 sm:my-4 text-xs sm:text-sm md:text-xl text-center lg:text-left">
                            It's coffee time - Sip & Savor - Relaxation in every sip! Get the nostalgia back!!
                            Your companion of every moment!!! Enjoy the beautiful moments and make them
                            memorable.
                        </p>
                        <div className="flex justify-center lg:justify-start">
                            <button className="px-2 sm:px-4 py-1 sm:py-2 text-black bg-[#e3b577] rounded">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <div className="flex justify-center items-center py-7 bg-[#eceae3]">
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto'>
                        {
                            aboutCoffee?.map(coffee => {
                                const { id, img, title, description } = coffee || {};
                                return (
                                    <div key={id} className="flex justify-center items-center">
                                        <div className="card card-compact  w-96">
                                            <figure>
                                                <img src={img} alt="Coffee" />
                                            </figure>
                                            <div className="card-body text-center">
                                                <p className='font-bold text-3xl'>{title}</p>
                                                <p className='text-xl'>{description}</p>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            <h1 className='text-4xl sm:text-6xl text-center my-4 sm:my-8'>Our Popular Products</h1>
            {isError && <h1 className="text-center text-red-600 text-2xl sm:text-6xl mx-auto my-4 sm:my-8">{isError}</h1>}
            <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto'>
                {coffeeList.map(coffee => (
                    <div key={coffee._id} className="mx-2">
                        <div className="card card-side bg-base-100 shadow-xl p-2 sm:p-3">
                            <figure className="sm:w-1/3">
                                <img src={coffee.photo} alt="Coffee" className="w-full h-full object-cover" />
                            </figure>
                            <div className="flex w-full p-2 sm:p-4 justify-between">
                                <div className="flex flex-col justify-center ml-2 sm:ml-3 lg:ml-10">
                                    <h2 className="card-title text-sm sm:text-xl">Name: {coffee.name}</h2>
                                    <p className='text-xs sm:text-lg'>Quantity: {coffee.quantity}</p>
                                    <p className='text-xs sm:text-lg'>Supplier: {coffee.supplier}</p>
                                    <p className='text-xs sm:text-lg'>Taste: {coffee.taste}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <button className="btn btn-primary text-xs sm:text-xl block mb-2"><IoEyeSharp /></button>
                                    <Link to={`/updateCoffee/${coffee._id}`}>
                                        <button className="btn bg-black text-white block text-xs sm:text-xl mb-2"><FaRegEdit /></button>
                                    </Link>
                                    <button className="btn bg-red-600 text-xs sm:text-xl text-black border-l mb-2" onClick={() => handleDelete(coffee._id)}><MdDeleteOutline /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeCard;
