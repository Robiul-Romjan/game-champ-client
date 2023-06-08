import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";


const MyClasses = () => {
    const {user} = useContext(AuthContext);
    const [classes, setClasses] = useState([]);

    const url = `http://localhost:5000/instructorClasses?email=${user?.email}`

    useEffect(()=> {
        fetch(url)
        .then(res => res.json())
        .then(data => setClasses(data))
    }, [url])
    return (
        <div>
            <h2 className="text-3xl">Instructors Classes {classes.length}</h2>
        </div>
    );
};

export default MyClasses;