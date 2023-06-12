import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Loader from "../../../components/Shared/Loader/Loader";
import { Link } from "react-router-dom";



const MyClasses = () => {
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);

    const url = `http://localhost:5000/instructorClasses?email=${user?.email}`

    useEffect(() => {
        setLoading(true)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setClasses(data)
                setLoading(false)
            })
    }, [url]);


    return (
        <div className="w-full mt-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">My Added Classes</h2>
            <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-36 bg-[#4021a5]"></div>
                <span className="text-red-500 font-semibold">My Classes</span>
                <div className="h-1 w-36 bg-[#4021a5]"></div>
            </div>
            {
                loading ? <Loader /> :
                    <div className="ms-12 mt-12">
                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    {
                                        classes.length > 0 ?
                                            <tr>
                                                <th>#</th>
                                                <th>Class Image</th>
                                                <th>Class Name</th>
                                                <th>Status</th>
                                                <th>Enrolled Students</th>
                                                <th>Update</th>
                                                <th>Feedback</th>
                                                <th>Feedback by Admin</th>
                                            </tr> : ""
                                    }
                                </thead>
                                <tbody>
                                    {
                                        classes.length > 0 ?
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
                                                    <Link className="btn btn-xs btn-error" to={`/dashboard/feedback/${item._id}`}>
                                                        <button >Feedback</button>
                                                    </Link>
                                                </td>
                                                <td>{item?.feedback ? item.feedback : "No feedback"}</td>
                                            </tr>) :
                                            <div className="text-center mt-12 me-10">
                                                <h2 className="text-2xl font-bold">You have no added classes</h2>
                                                <p className="font-light text-neutral-500 mt-2">Please add classes first.</p>
                                            </div>
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
            }
        </div>
    );
};

export default MyClasses;