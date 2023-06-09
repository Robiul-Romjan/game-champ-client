import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";


const MySelectedClasses = () => {
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);

    const url = `http://localhost:5000/select-classes?email=${user?.email}`

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [url]);

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
                                    <td className="font-semibold">{i+1}</td>
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
                                        <button className="btn btn-ghost btn-xs">Delete</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-ghost btn-xs">Pay</button>
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