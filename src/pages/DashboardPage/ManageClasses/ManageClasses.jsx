/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../../components/Shared/Loader/Loader";
import { Link } from "react-router-dom";

const ManageClasses = () => {
    const [allClasses, setAllClasses] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:5000/classes")
            .then(data => {
                setAllClasses(data.data);
                setLoading(false);
            })
    }, []);

    const handleApprove = (id) => {
        axios.patch(`http://localhost:5000/classes/approve/${id}`)
            .then(data => {
                const updatedClasses = allClasses.map((item) =>
                    item._id === id ? { ...item, status: "approved" } : item
                );
                setAllClasses(updatedClasses);
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Successfully approved the class',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    };

    const handleDeny = (id) => {
        axios.patch(`http://localhost:5000/classes/deny/${id}`)
            .then(data => {
                const updatedClasses = allClasses.map((item) =>
                    item._id === id ? { ...item, status: "denied" } : item
                );
                setAllClasses(updatedClasses);
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Successfully deny the class',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    };


    return (
        <div className="w-full ms-4 mt-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">Manage All Classes</h2>
            <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-36 bg-[#4021a5]"></div>
                <span className="text-red-500 font-semibold">Manage Classes</span>
                <div className="h-1 w-36 bg-[#4021a5]"></div>
            </div>
            {
                loading ? <Loader /> :
                    <div className="grid md:grid-cols-3 gap-4 mt-8">
                        {
                            allClasses.map((item) => <div key={item._id} className="card p-4 bg-base-100 shadow-xl">
                                <img className="w-full h-48 rounded" src={item.image} alt="Shoes" />
                                <div className="mt-4">
                                    <p><span className="font-semibold">Class:</span> {item.class_name}</p>
                                    <p><span className="font-semibold">Instructor:</span> {item.instructor_name}</p>
                                    <p><span className="font-semibold">Email:</span> {item.email}</p>
                                    <p><span className="font-semibold">Available Seats:</span> {item.seats} seats</p>
                                    <p><span className="font-semibold">Price:</span> ${item.price}</p>
                                    <p><span className="font-semibold">Status:</span> <span className="text-amber-700">{item.status}</span></p>
                                    <div className="flex justify-between mt-2">
                                        <button onClick={() => handleApprove(item._id)} className="btn btn-sm btn-secondary" disabled={item?.status == "approved" || item?.status == "denied"}>Approve</button>
                                        <button onClick={() => handleDeny(item._id)} className="btn btn-sm btn-error" disabled={item?.status == "approved" || item.status == "denied"}>Deny</button>
                                        <Link to={`/dashboard/feedback/${item._id}`}>
                                            <button className="btn btn-xs btn-error">Feedback</button>
                                        </Link>
                                    </div>

                                </div>
                            </div>)
                        }
                    </div>
            }

        </div>
    );
};

export default ManageClasses;