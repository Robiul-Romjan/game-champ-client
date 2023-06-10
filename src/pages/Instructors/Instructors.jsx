import axios from "axios";
import { useEffect, useState } from "react";

const Instructors = () => {
    const [instructor, setInstructor] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:5000/users")
        .then(data => {
          const insUser = data.data.filter(user => user.role === "instructor");
          setInstructor(insUser);
        })
    },[])
    return (
        <div className="pt-24 pb-12 className='max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4'">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">All Instructors</h2>
            <div className="flex items-center justify-center gap-2"> 
                <div className="h-1 w-36 bg-[#4021a5]"></div>
                <span className="text-red-500 font-semibold">Instructors</span>
                <div className="h-1 w-36 bg-[#4021a5]"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
                {
                    instructor.map(inst => <div key={inst._id} className="p-4 border-2 flex rounded hover:shadow-xl flex-col items-center shadow-md">
                    <img className="w-36 h-36 rounded-full" src={inst.image} alt="" />
                    <h2 className="text-xl">{inst.name}</h2>
                    <h4 className="font-semibold">Instructor</h4>
                    <h4 className="font-semibold">Email: {inst.email}</h4>
                </div>)
                }
            </div>
        </div>
    );
};

export default Instructors;