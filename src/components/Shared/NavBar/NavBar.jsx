import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png"
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";


const NavBar = () => {

    const { user, logOut } = useContext(AuthContext);
    // const [cart] = useCart();
    // console.log(user)

    const handleLogout = () => {
        logOut();
    }

    const navOptions = <>
        <div className="flex items-center">
            <NavLink className="ms-5" to="/">Home</NavLink>
            <NavLink className="ms-5" to="/instructors">Instructors</NavLink>
            <NavLink className="ms-5" to="/classes">Classes</NavLink>
        </div>
    </>;

    return (
        <>
            <div className="navbar fixed z-30 top-0 left-0 right-0 opacity-100 max-w-screen-xl mx-auto bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <Link className="btn btn-ghost normal-case text-xl">
                        <img className="w-12" src={logo} alt="" />
                        <span>GameChamp</span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <>
                        <NavLink className="me-5" to="/dashboard">Dashboard</NavLink>
                            <div className="avatar">
                                <div className="w-12 mr-5 rounded-full">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                            <button onClick={handleLogout} className="btn btn-secondary">Log Out</button>
                        </> :
                            <>
                                <NavLink className="ms-5" to="/login">LOG IN</NavLink>
                            </>
                    }
                </div>
            </div>
        </>
    );
};

export default NavBar;