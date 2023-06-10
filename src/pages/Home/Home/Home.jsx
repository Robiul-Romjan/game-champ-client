import { useState } from "react";
import PopularClass from "../PopularClass/PopularClass";
import Slider from "../Slider/Slider";
import PopularInsTructors from "./PopularInstructors/PopularInsTructors";


const Home = () => {
    const [toggle, setToggle] = useState(true);

    const toggleMode = () => {
        setToggle(!toggle);
    };


    return (
        <div className={`max-w-[2520px] relative mx-auto xl:px-20 md:px-10 sm:px-2 px-4 ${toggle ? "bg-white text-black" : "bg-black text-white"}`}>
            <Slider />
            <PopularClass />
            <PopularInsTructors />
            <div className="fixed right-0 top-1/2 h-[100vh]">
                <button className="btn btn-sm btn-error" onClick={toggleMode}>{toggle ? "Night" : "Day"}</button>
            </div>
        </div>
    );
};

export default Home;