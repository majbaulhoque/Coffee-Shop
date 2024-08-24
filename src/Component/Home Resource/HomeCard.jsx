import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2';
import { BASE_URL } from '../../config';

const HomeCard = () => {
    const [coffeeList, setCoffeeList] = useState([]);
    const [isError, setIsError] = useState('');

    const getCoffeeData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/coffee');
            setCoffeeList(res.data);
        } catch (error) {
            setIsError(error.message);
        }
    };

    useEffect(() => {
        getCoffeeData();
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
            <h1 className='text-6xl text-center'>Our Popular Products</h1>
            {isError && <h1 className="text-center text-red-600 text-6xl mx-auto my-8">{isError}</h1>}
            <div className='grid md:grid-cols-2 gap-4 max-w-7xl mx-auto'>
                {coffeeList.map(coffee => (
                    <div key={coffee._id}>
                        <div className="card card-side bg-base-100 shadow-xl p-3 mx-2">
                            <figure>
                                <img src={coffee.photo} alt="Coffee" />
                            </figure>
                            <div className="flex w-full p-4 justify-between">
                                <div className="flex flex-col justify-center ml-3 lg:ml-10">
                                    <h2 className="card-title text-xl">Name: {coffee.name}</h2>
                                    <p className='text-lg'>Quantity: {coffee.quantity}</p>
                                    <p className='text-lg'>Supplier: {coffee.supplier}</p>
                                    <p className='text-lg'>Taste: {coffee.taste}</p>
                                </div>
                                <div>
                                    <button className="btn btn-primary text-xl block mb-2"><IoEyeSharp /></button>
                                    <button className="btn bg-black text-white block text-xl mb-2"><FaRegEdit /></button>
                                    <button className="btn bg-red-600 text-xl text-black border-l mb-2" onClick={() => handleDelete(coffee._id)}><MdDeleteOutline /></button>
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
