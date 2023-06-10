
import PopularClass from "../PopularClass/PopularClass";
import Slider from "../Slider/Slider";
import PopularInsTructors from "./PopularInstructors/PopularInsTructors";
import Upcoming from "../Upcoming/Upcoming";


const Home = () => {

    return (
        <div className="max-w-[2520px] relative mx-auto xl:px-20 md:px-10 sm:px-2">
            <Slider />
            <PopularClass />
            <PopularInsTructors />
            <Upcoming />
        </div>
    );
};

export default Home;