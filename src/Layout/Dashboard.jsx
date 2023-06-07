import { Link, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}

                    <li>
                        <Link to="/dashboard/manage-users">Manage Users</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/manage-classes">Manage Classes</Link>
                    </li>


                    <li>
                        <Link to="/dashboard/add-class">Add A Class</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/my-classes">My Class</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;