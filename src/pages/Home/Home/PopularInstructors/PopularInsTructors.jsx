import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Providers/AuthProvider";


const PopularInsTructors = () => {
    const {user} = useContext(AuthContext);
    const [instructors, setInstructors]= useState([]);
    useEffect(()=> {
        fetch("http://localhost:5000/users")
        .then(res => res.json())
        .then(data => {
          const studentRole = data.filter(student => student?.role === "instructor" );
          setInstructors(studentRole)
        })
    }, [user?.email]);

    return (
        <div className="mt-12">
            <h2 className="text-3xl text-center">Our Popular Instructors</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {
                    instructors.slice(0, 6).map((instructor)=> <div className="mx-auto shadow-lg p-4 w-full" key={instructor._id}>
                        <img className="w-36 h-36 rounded-full mx-auto" src={instructor.image} alt="" />
                        <div className="text-center mt-5">
                            <p className="text-xl font-bold">{instructor?.name}</p>
                            <p className="">{instructor?.role}</p>
                            <p className="">Email: {instructor?.email}</p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularInsTructors;