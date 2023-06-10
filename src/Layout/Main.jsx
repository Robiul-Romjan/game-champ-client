import { Outlet } from "react-router-dom";
import NavBar from "../components/Shared/NavBar/NavBar";
import Footer from "../components/Shared/Footer/Footer";
import { useState } from "react";
import { FaMedapps, FaMoon } from "react-icons/fa";


const Main = () => {
    const [toggle, setToggle] = useState(true);

    const toggleMode = () => {
        setToggle(!toggle);
    };

    return (
        <div className={`${toggle ? "bg-black text-white": ""}`}>
            <NavBar />
            <Outlet />
            <Footer />
            <div className="fixed right-0 top-1/2 md:top-3/4 h-[100vh]">
                <button className="btn-all-sm" onClick={toggleMode}>{toggle ? <FaMedapps /> : <FaMoon />}</button>
            </div>
        </div>
    );
};

export default Main;