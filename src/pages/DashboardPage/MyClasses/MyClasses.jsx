import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";



const MyClasses = () => {
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);

    const url = `http://localhost:5000/instructorClasses?email=${user?.email}`

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [url])
    return (
        <div className="w-full mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">My Added Classes</h2>
            <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-36 bg-[#4021a5]"></div>
                <span className="text-red-500 font-semibold">My Classes</span>
                <div className="h-1 w-36 bg-[#4021a5]"></div>
            </div>
            <div className="ms-12 mt-12">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Class Image</th>
                                <th>Class Name</th>
                                <th>Status</th>
                                <th>Enrolled Students</th>
                                <th>Update</th>
                                <th>Feedback</th>
                                <th>Feedback by Admin</th>
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
                                    <td>{item?.class_name}</td>
                                    <td>{item?.status}</td>
                                    <td>{item?.enrolled}</td>
                                    <td>
                                        <button className="btn btn-xs btn-success">Update</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-xs btn-error">Feedback</button>
                                    </td>
                                    <td>{item?.feedback ? item.feedback : "No feedback"}</td>
                                </tr>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyClasses;