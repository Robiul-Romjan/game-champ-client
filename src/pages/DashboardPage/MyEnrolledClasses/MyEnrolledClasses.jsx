import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import Loader from "../../../components/Shared/Loader/Loader";


const MyEnrolledClasses = () => {
    const { user } = useContext(AuthContext);
    const [enrolled, setEnrolled] = useState([]);
    const [loading, setLoading] = useState(false);

    const url = `https://assignment-12-server-ivory.vercel.app/payments?email=${user?.email}`

    useEffect(() => {
        setLoading(true)
        axios.get(url)
            .then(res => {
                setEnrolled(res.data)
                setLoading(false)
            })
    }, [url, user?.email]);

    return (
        <div className="w-full mt-12 mb-12 mx-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">My Enrolled Classes</h2>
            <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-36 bg-[#4021a5]"></div>
                <span className="text-red-500 font-semibold">Enrolled Class</span>
                <div className="h-1 w-36 bg-[#4021a5]"></div>
            </div>
            {
                loading ? <Loader /> :
                    <div className="mt-12">
                        {
                            enrolled && enrolled.length > 0 ?
                                enrolled.map(item => <div key={item._id} className="flex gap-4 items-center justify-center mb-8 border-2 p-4 rounded bg-[#58429f] text-white">
                                    <img className="object-cover w-1/2 h-52 rounded" src={item.image} alt="" />
                                    <div className="mt-4">
                                        <h4 className="text-xl font-semibold">{item.class}</h4>
                                        <p><span className="font-semibold">Instructor:</span> {item?.instructor}</p>
                                        <p><span className="font-semibold">Price:</span><span> ${item?.price}</span></p>
                                        <p><span className="font-semibold">Payment Id:</span> <span>{item.transactionId}</span></p>
                                        <p><span className="font-semibold">Payment Date:</span> <span>{item.date}</span></p>
                                    </div>
                                </div>) :
                                <div className="text-center mt-12">
                                    <h2 className="text-2xl font-bold">You have no enrolled classes</h2>
                                    <p className="font-light text-neutral-500 mt-2">Please enrolled classes first.</p>
                                </div>
                        }
                    </div>
            }
        </div>
    );
};

export default MyEnrolledClasses;