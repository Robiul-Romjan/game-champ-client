import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaTrashAlt, FaStripe } from "react-icons/fa";
import Swal from "sweetalert2";


const MySelectedClasses = () => {
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);

    const url = `http://localhost:5000/select-classes?email=${user?.email}`

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [url]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/select-classes/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            const remaining = classes.filter(item => item._id !== id);
                            setClasses(remaining);
                            Swal.fire(
                                'Deleted!',
                                'Your select class deleted.',
                                'Ok'
                            )
                        }
                    })
            }
        })
    };

    return (
        <div className="w-full mt-12">
            <h2 className="text-3xl text-center">My selected classes {classes.length} </h2>
            <div className="ms-12 mt-12">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Class Image</th>
                                <th>Class Name</th>
                                <th>Instructor</th>
                                <th>Price</th>
                                <th>Delete</th>
                                <th>Payment</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                classes.map((item, i) => <tr key={item._id}>
                                    <td className="font-semibold">{i + 1}</td>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.class_name}</td>
                                    <td>{item.instructor}</td>
                                    <td>$ {item.price}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item._id)} className="btn btn-circle btn-error text-white font-semibold btn-sm"><FaTrashAlt /></button>
                                    </td>
                                    <td>
                                        <button className="btn btn-success text-white btn-sm"><FaStripe className="text-3xl" /></button>
                                    </td>
                                </tr>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default MySelectedClasses;