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
            <div>
                {
                    instructors.slice(0, 6).map((instructor)=> <p key={instructor.name}>{instructor.name}</p>)
                }
            </div>
        </div>
    );
};

export default PopularInsTructors;