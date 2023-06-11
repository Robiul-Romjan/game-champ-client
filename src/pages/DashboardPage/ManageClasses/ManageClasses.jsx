/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import "./ManageClass.css"

const ManageClasses = () => {
    const [allClasses, setAllClasses] = useState([]);

   

    useEffect(() => {
        axios.get("http://localhost:5000/classes")
            .then(data => setAllClasses(data.data))
    }, []);

    const handleApprove = (id) => {
        axios.patch(`http://localhost:5000/classes/approve/${id}`)
            .then(data => {
                const updatedClasses = allClasses.map((item) =>
                    item._id === id ? { ...item, status: "approved" } : item
                );
                setAllClasses(updatedClasses);
            })
    };

    const handleDeny = (id) => {
        axios.patch(`http://localhost:5000/classes/deny/${id}`)
            .then(data => {
                const updatedClasses = allClasses.map((item) =>
                    item._id === id ? { ...item, status: "denied" } : item
                );
                setAllClasses(updatedClasses);
            })
    };

    const handleFeedback = (id) => {
        
    }


    return (
        <div className="w-full ms-4 mt-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">Manage All Classes</h2>
            <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-36 bg-[#4021a5]"></div>
                <span className="text-red-500 font-semibold">Manage Classes</span>
                <div className="h-1 w-36 bg-[#4021a5]"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-4 mt-8">
                {
                    allClasses.map((item) => <div key={item._id} className="card p-4 bg-base-100 shadow-xl">
                        <figure><img src={item.image} alt="Shoes" /></figure>
                        <div className="mt-4">
                            <p><span className="font-semibold">Class:</span> {item.class_name}</p>
                            <p><span className="font-semibold">Instructor:</span> {item.instructor_name}</p>
                            <p><span className="font-semibold">Email:</span> {item.email}</p>
                            <p><span className="font-semibold">Available Seats:</span> {item.seats}</p>
                            <p><span className="font-semibold">Price:</span> ${item.price}</p>
                            <p><span className="font-semibold">Status:</span> <span className="text-yellow-400">{item.status}</span></p>
                            <div className="flex justify-between mt-2">
                                <button onClick={() => handleApprove(item._id)} className="btn btn-sm btn-secondary" disabled={item?.status == "approved" || item?.status == "denied"}>Approve</button>
                                <button onClick={() => handleDeny(item._id)} className="btn btn-sm btn-error" disabled={item?.status == "approved" || item.status == "denied"}>Deny</button>

                                <button onClick={() => handleFeedback(item._id)} className="btn btn-sm btn-secondary">Feedback</button>
                            </div>

                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default ManageClasses;