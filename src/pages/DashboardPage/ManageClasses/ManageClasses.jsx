/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import FeedbackModal from "../../../components/FeedbackModal/FeedbackModal";

const ManageClasses = () => {
    const [allClasses, setAllClasses] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false)
    };

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

    const handleFeedback =(id)=> {
         
    }

    return (
        <div className="w-full">
            <h2 className="text-3xl">Manage classes by Admin</h2>
            <div className="grid md:grid-cols-3 gap-4">
                {
                    allClasses.map((item) => <div key={item._id} className="card bg-base-100 shadow-xl">
                        <figure><img src={item.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <p className="font-semibold">Class: {item.class_name}</p>
                            <p className="font-semibold">Instructor: {item.instructor_name}</p>
                            <p className="font-semibold">Instructor Mail: {item.email}</p>
                            <p className="font-semibold">Available Seats: {item.seats}</p>
                            <p className="font-semibold">Price: {item.price}</p>
                            <p className="font-semibold">Status: <span className="text-yellow-400">{item.status}</span></p>
                            <div className="flex justify-between">
                                <button onClick={() => handleApprove(item._id)} className="btn btn-sm btn-secondary" disabled={item.status == "approved" || item.status == "denied"}>Approve</button>
                                <button onClick={() => handleDeny(item._id)} className="btn btn-sm btn-error" disabled={item.status == "approved" || item.status == "denied"}>Deny</button>

                                <button onClick={()=> handleFeedback(item._id)} className="btn btn-sm btn-secondary">Feedback</button>
                                
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageClasses;