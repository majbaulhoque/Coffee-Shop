import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
    const [coffeeUpdateData, setCoffeeUpdateData] = useState(null);
    const { id } = useParams();
    const { _id, name, quantity, supplier, taste, category, details, photo } = coffeeUpdateData || {};

    useEffect(() => {
        const fetchCoffeeData = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/coffee/${id}`);
                setCoffeeUpdateData(res.data);
            } catch (error) {
                console.log("Error fetching coffee data:", error);
            }
        };

        fetchCoffeeData();
    }, []);

    const handleUpdateCoffee = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;

        const updatedCoffee = { name, quantity, supplier, taste, category, details, photo };

        try {
            const res = await axios.put(`${BASE_URL}/coffee/${id}`, updatedCoffee, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setCoffeeUpdateData(res.data);

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Updated!",
                    text: "Coffee updated successfully!",
                    icon: "success",
                    confirmButtonText: "Cool",
                });
                form.reset();
            }
        } catch (error) {
            console.log("Error updating coffee:", error);
            Swal.fire({
                title: "Error!",
                text: `Failed to update coffee: ${error.message}`,
                icon: "error",
                confirmButtonText: "Try Again",
            });
        }
    };

    if (!coffeeUpdateData) {
        return <p>Loading...</p>; // You can replace this with a spinner or other loading indicator.
    }

    return (
        <div className="bg-[#F4F3F0] p-24">
            <h2 className="text-4xl font-extrabold text-center">Update Coffee</h2>

            <form onSubmit={handleUpdateCoffee}>
                {/* from coffee name & quantity */}
                <div className="md:flex mb-6">
                    <div className="form-control md:w-1/2">
                        <label className="label"> 
                            <span className="label-text text-xl ml-1">Coffee Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" className="input input-bordered w-full" name="name" defaultValue={name} placeholder="Coffee Name" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text text-xl ml-1">Available Quantity</span>
                        </label>
                        <label className="input-group">
                            <input type="text" className="input input-bordered w-full" name="quantity" defaultValue={quantity} placeholder="Available Quantity" />
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
                            <input type="text" className="input input-bordered w-full" name="supplier" defaultValue={supplier} placeholder="Supplier Name" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text text-xl ml-1">Taste</span>
                        </label>
                        <label className="input-group">
                            <input type="text" className="input input-bordered w-full" name="taste" defaultValue={taste} placeholder="Taste" />
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
                            <input type="text" className="input input-bordered w-full" name="category" defaultValue={category} placeholder="Category" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text text-xl ml-1">Details</span>
                        </label>
                        <label className="input-group">
                            <input type="text" className="input input-bordered w-full" name="details" defaultValue={details} placeholder="Details" />
                        </label>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl ml-1">Photo URL</span>
                        </label>
                        <label className="input-group">
                            <input type="text" className="input input-bordered w-full" name="photo" defaultValue={photo} placeholder="Photo" />
                        </label>
                    </div>
                </div>
                <input type="submit" value='Update Coffee' className="bg-[#D2B48C] py-2 text-lg w-full rounded-lg mt-2" />
            </form>
        </div>
    );
};

export default UpdateCoffee;
