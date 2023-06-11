import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

// TODO
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
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
                    <CheckoutForm />
                </Elements>

            </div>
        </div>
    );
};

export default Payment;