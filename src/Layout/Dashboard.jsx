import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";


const Dashboard = () => {
    const {user} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole]= useState();
    useEffect(()=> {
        setLoading(true)
        fetch("http://localhost:5000/users")
        .then(res => res.json())
        .then(data => {
          const studentRole = data.find(student => student?.email === user?.email );
          setUserRole(studentRole)
          setLoading(false)
        })
    }, [user?.email]);

    // const isAdmin = false;
    // const isInstructor = true;
    if(loading){
        return "Loading ............................"
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
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}

                    {
                        userRole?.role == "admin" ?
                            <><li>
                                <Link to="/dashboard/manage-users">Manage Users</Link>
                            </li>
                                <li>
                                    <Link to="/dashboard/manage-classes">Manage Classes</Link>
                                </li>
                            </> :
                            <>
                                {
                                    userRole?.role == "instructor" ?
                                        <>
                                            <li>
                                                <Link to="/dashboard/add-class">Add A Class</Link>
                                            </li>
                                            <li>
                                                <Link to="/dashboard/my-classes">My Class</Link>
                                            </li>
                                        </> :
                                        <>
                                            <li>
                                                <Link to="/dashboard/my-selected-classes">My Selected Classes</Link>
                                            </li>
                                            <li>
                                                <Link to="/dashboard/my-enrolled-classes">My Enrolled Classes</Link>
                                            </li>
                                        </>
                                }
                            </>
                    }
                    <hr />
                    <li className="mt-20">
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;