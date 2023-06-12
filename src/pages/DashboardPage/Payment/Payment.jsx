import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";

// TODO
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    const {user}  = useContext(AuthContext)
    const {id} = useParams();
    const [classes, setClasses] = useState([]);

    const url = `https://assignment-12-server-ivory.vercel.app/select-classes?email=${user?.email}`;
    
    const item = classes.find(cls => cls._id === id);

    const selectClass = classes.find(item=> item._id === id);

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [url, user?.email]);
    

    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-center">Pay for Enrolled Class</h2>
                <div className="flex items-center justify-center gap-2">
                    <div className="h-1 w-36 bg-[#4021a5]"></div>
                    <span className="text-red-500 font-semibold">Pay</span>
                    <div className="h-1 w-36 bg-[#4021a5]"></div>
                </div>

                <Elements stripe={stripePromise}>
                    <CheckoutForm item={item} price={parseFloat(selectClass?.price)} />
                </Elements>

            </div>
        </div>
    );
};

export default Payment;