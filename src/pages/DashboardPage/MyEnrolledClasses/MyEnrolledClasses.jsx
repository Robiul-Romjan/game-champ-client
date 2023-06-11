import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";


const MyEnrolledClasses = () => {
    const {user} = useContext(AuthContext);
    const [enrolled, setEnrolled] = useState([]);

    const url = `http://localhost:5000/payments?email=${user?.email}`

    useEffect(()=> {
        axios.get(url)
        .then(res => {
            setEnrolled(res.data)
        })
    }, [url, user?.email])
    return (
        <div className="w-full mt-12 mb-12 mx-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">My Enrolled Classes</h2>
            <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-36 bg-[#4021a5]"></div>
                <span className="text-red-500 font-semibold">Enrolled Class</span>
                <div className="h-1 w-36 bg-[#4021a5]"></div>
            </div>
            <div className="mt-12">
                {
                    enrolled &&
                    enrolled.map(item => <div key={item._id} className="flex gap-4 items-center justify-center mb-8 border-2 p-4 rounded bg-[#58429f] text-white">
                        <img className="object-cover w-1/2 h-52 rounded" src={item.image} alt="" />
                        <div className="mt-4">
                            <h4 className="text-xl font-semibold">{item.class}</h4>
                            <p><span className="font-semibold">Instructor:</span> {item?.instructor}</p>
                            <p><span className="font-semibold">Price:</span><span> ${item?.price}</span></p>
                            <p><span className="font-semibold">Payment Id:</span> <span>{item.transactionId}</span></p>
                            <p><span className="font-semibold">Payment Date:</span> <span>{item.date}</span></p>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyEnrolledClasses;