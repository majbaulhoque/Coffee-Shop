import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';

const AddCoffee = () => {

    const [coffees, setCoffees] = useState([]);
    const [isError, setIsError] = useState('');

    const handleAddCoffee = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;

        const newCoffee = { name, quantity, supplier, taste, category, details, photo };
        // console.log(newCoffee);

        try {
            const res = await axios.post('http://localhost:5000/coffee', newCoffee, {
                headers: {
                    "Content-Type": 'application/json'
                },
            });
            console.log(res.data)
            
            if (res.data) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Coffee added successfully!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                });
                setCoffees(prevCoffees => [...prevCoffees, res.data]);
                form.reset();
            }
        } catch (error) {
            setIsError(error.message);
            Swal.fire({
                title: 'Error!',
                text: `Failed to add coffee: ${error.message}`,
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    };

    return (
        <div className="bg-[#F4F3F0] p-24">
            <h2 className="text-4xl font-extrabold text-center">Add New Coffee {coffees.length}</h2>
            <p className="text-center w-[932px] text-2xl my-5 mx-auto">"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here."</p>

            {
                isError !== "" && <h1 className="text-center text-red-600 text-6xl mx-auto my-8">{isError}</h1>
            }

            <form onSubmit={handleAddCoffee}>
                {/* from coffee name & quantity */}
                <div className="md:flex mb-6">
                    <div className="form-control md:w-1/2">
                        <label className="label"> 
                            <span className="label-text text-xl ml-1">Coffee Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" className="input input-bordered w-full" name="name" placeholder="Coffee Name" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text text-xl ml-1">Available Quantity</span>
                        </label>
                        <label className="input-group">
                            <input type="text" className="input input-bordered w-full" name="quantity" placeholder="Available Quantity" />
                        </label>
                    </div>
                </div>
                {/* from Supplier & Taste row */}
                <div className="md:flex mb-6">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-xl ml-1">Supplier Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" className="input input-bordered w-full" name="supplier" placeholder="Supplier Name" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text text-xl ml-1">Taste</span>
                        </label>
                        <label className="input-group">
                            <input type="text" className="input input-bordered w-full" name="taste" placeholder="Taste" />
                        </label>
                    </div>
                </div>
                {/* from category & Details Row */}
                <div className="md:flex mb-6">
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-xl ml-1">Category</span>
                        </label>
                        <label className="input-group">
                            <input type="text" className="input input-bordered w-full" name="category" placeholder="Category" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text text-xl ml-1">Details</span>
                        </label>
                        <label className="input-group">
                            <input type="text" className="input input-bordered w-full" name="details" placeholder="Details" />
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl ml-1">Photo URL</span>
                        </label>
                        <label className="input-group">
                            <input type="text" className="input input-bordered w-full" name="photo" placeholder="Photo" />
                        </label>
                    </div>
                </div>
                <input type="submit" value='Add Coffee' className="bg-[#D2B48C] py-2 text-lg w-full rounded-lg mt-2" />
            </form>
        </div>
    );
};

export default AddCoffee;
