import { useState } from "react";
import PopularClass from "../PopularClass/PopularClass";
import Slider from "../Slider/Slider";


const Home = () => {
    const [toggle, setToggle] = useState(true);

    const toggleMode = () => {
        setToggle(!toggle);
    };


    return (
        <div className={`max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 ${toggle ? "bg-white text-black" : "bg-black text-white"}`}>
            <Slider />
            <PopularClass />
            <button onClick={toggleMode}>{toggle? "Night" : "Day"}</button>
        </div>
    );
};

export default Home;