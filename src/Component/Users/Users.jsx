import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../config";
import { MdOutlineDelete } from "react-icons/md";
import Swal from 'sweetalert2';

const Users = () => {
    const [userData, setUserData] = useState([]);

    const getUserData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user`);
            setUserData(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
        // Alert Confirmation
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                const res = await axios.delete(`${BASE_URL}/user/${id}`);
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // Refresh the user list
                    getUserData();
                    Swal.fire(
                        'Deleted!',
                        'The user has been deleted.',
                        'success'
                    );
                }
            } catch (error) {
                console.log(error);
                Swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                );
            }
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div>
            <h2 className="text-center text-black text-4xl py-5 font-bold">Users : {userData.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className="text-2xl text-black border-black">
                            <th>SL.</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Last Logged At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* rows */}
                        {
                            userData?.map((user, idx) => (
                                <tr key={user._id} className="border-black text-xl text-black ">
                                    <th>{idx + 1}</th>
                                    <td>{user.email}</td>
                                    <td>{user.createdAt}</td>
                                    <td>{user.lastLoggedAt}</td>
                                    <td>
                                        <button 
                                            onClick={() => handleDelete(user._id)} 
                                            className="bg-red-600 h-8 w-8 flex justify-center items-center rounded-full"
                                        >
                                            <MdOutlineDelete />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
