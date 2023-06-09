import { useEffect, useState } from "react";


const PopularClass = () => {
    const [populars, setPopular] = useState([]);

    useEffect(()=> {
        fetch("http://localhost:5000/popular-classes")
        .then(res => res.json())
        .then(data=> {
            setPopular(data)
        })
    }, [])
    return (
        <div className="mt-12 mb-8">
            <h2 className="text-3xl text-center">Our Popular Classes</h2>
        </div>
    );
};

export default PopularClass;