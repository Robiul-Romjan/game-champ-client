import { useContext, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { FaHome, FaShoppingCart, FaUtensils, FaBars, FaUser, FaBookmark, FaCheck} from "react-icons/fa";
import Loader from "../components/Shared/Loader/Loader";


const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState();
    useEffect(() => {
        setLoading(true)
        fetch("https://assignment-12-server-ivory.vercel.app/users")
            .then(res => res.json())
            .then(data => {
                const studentRole = data.find(student => student?.email === user?.email);
                setUserRole(studentRole)
                setLoading(false)
            })
    }, [user?.email]);

    // const isAdmin = false;
    // const isInstructor = true;
    if (loading) {
        return <Loader />
    }


    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex">
                {/* Page content here */}
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="p-4 w-80 h-full bg-gray-700 text-white">
                    {/* Sidebar content here */}
                    <div className="mb-12 text-center">
                        <img className="rounded-full w-20 h-20 mx-auto border-green-500 border-2" src={userRole?.image} alt="" />
                        <p className="mt-2 text-gray-300">{userRole?.role}</p>
                        <p className="mt-2 text-xl font-semibold">{userRole?.name}</p>
                        <p className="mt-2">Email: {userRole?.email}</p>
                    </div>
                    <hr />

                    {
                        userRole?.role == "admin" ?
                            <div className="py-4">
                                <li className="bg-gray-900 hover:bg-black rounded mb-4">
                                    <NavLink className="nav-link flex items-center gap-2 justify-center" to="/dashboard/manage-users"><FaUser /> Manage Users</NavLink>
                                </li>
                                <li className="bg-gray-900 hover:bg-black rounded">
                                    <NavLink className="nav-link flex items-center gap-2 justify-center" to="/dashboard/manage-classes"><FaBars /> Manage Classes</NavLink>
                                </li>
                            </div> :
                            <>
                                {
                                    userRole?.role == "instructor" ?
                                        <div className="py-4">
                                            <li className="bg-gray-900 hover:bg-black rounded mb-4">
                                                <NavLink className="nav-link flex items-center gap-2 justify-center" to="/dashboard/add-class"><FaUtensils /> Add A Class</NavLink>
                                            </li>
                                            <li className="bg-gray-900 hover:bg-black rounded">
                                                <NavLink className="nav-link flex items-center gap-2 justify-center" to="/dashboard/my-classes"> <FaCheck /> My Class</NavLink>
                                            </li>
                                        </div> :
                                        <div className="py-4">
                                            <li className="bg-gray-900 hover:bg-black rounded mb-4">
                                                <NavLink className="nav-link flex items-center gap-2 justify-center" to="/dashboard/my-selected-classes"><FaShoppingCart /> My Selected Classes</NavLink>
                                            </li>
                                            <li className="bg-gray-900 hover:bg-black rounded">
                                                <NavLink className="nav-link flex items-center gap-2 justify-center" to="/dashboard/my-enrolled-classes"><FaBookmark /> My Enrolled Classes</NavLink>
                                            </li>
                                        </div>
                                }
                            </>
                    }
                    <hr />
                    <li className="bg-gray-900 hover:bg-black rounded mt-12">
                        <Link className="flex items-center gap-2 justify-center" to="/"><FaHome /> Home</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;