import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoEyeSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const HomeCard = () => {
    const [coffeeList, setCoffeeList] = useState([]);
    const [isError, setIsError] = useState('');

    const getCoffeeData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/coffee')
            console.log(res.data)
            setCoffeeList(res.data)
        } catch (error) {
            setIsError(error.message)
        }
    }

    useEffect(() => {
        getCoffeeData()
    }, [])
    return (
        <div>
            <h1 className='text-6xl text-center'>Our Popular Products</h1>
            {
                isError !== "" && <h1 className="text-center text-red-600 text-6xl mx-auto my-8">{isError}</h1>
            }
            <div className='grid md:grid-cols-2 gap-4'>
                {
                    coffeeList?.map(coffee => {
                        const { _id, category, details, name, photo, quantity, supplier, taste } = coffee || {};
                        return <div key={_id}>
                            <div className="card card-side bg-base-100 shadow-xl p-3 mx-2">
                                <figure>
                                    <img
                                        src={photo}
                                        alt="Coffee" />
                                </figure>
                                <div className="flex w-full p-4 justify-between">
                                    <div className="flex flex-col justify-center ml-3 lg:ml-10">
                                        <h2 className="card-title text-xl">Name : {name}</h2>
                                        <p className='text-lg'>Quantity : {quantity}</p>
                                        <p className='text-lg'>Supplier : {supplier}</p>
                                        <p className='text-lg'>Taste : {taste}</p>
                                    </div>

                                    <div className="">
                                        <button className="btn btn-primary text-xl block mb-2"><IoEyeSharp /></button>
                                        <button className="btn bg-black text-white block text-xl mb-2"><FaRegEdit /></button>
                                        <button className="btn bg-red-600 text-xl text-black border-l mb-2"><MdDeleteOutline /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default HomeCard;