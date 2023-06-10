import { useEffect, useState } from "react";


const PopularClass = () => {
    const [popularClasses, setPopularClasses] = useState([]);

    useEffect(()=> {
        fetch("http://localhost:5000/popular-classes")
        .then(res => res.json())
        .then(data=> {
            setPopularClasses(data)
        })
    }, [])
    return (
        <div className="mt-12">
            <h2 className="text-3xl text-center">Our Popular Classes</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {
                    popularClasses.map((popular)=> <div className="shadow-lg p-4 rounded" key={popular._id}>
                        <img className="rounded" src={popular.image} alt="" />
                        <div>
                            <h4 className="text-xl font-semibold">{popular.class_name}</h4>
                            <h4 className="text-xl font-semibold">Instructor: {popular.instructor_name}</h4>
                            <p>Price:<span>${popular.price}</span></p>
                            <p>Enrolled Student:<span>{popular.enrolled}</span></p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default PopularClass;