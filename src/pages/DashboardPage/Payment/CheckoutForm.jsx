/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import axios from "axios";
import "./CheckoutForm.css"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaInstalod, FaOsi, FaTruckLoading } from "react-icons/fa";

const url = "https://assignment-12-server-ivory.vercel.app/create-payment-intent";


const CheckoutForm = ({ price, item }) => {
    const token = localStorage.getItem("access-token")
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("")
    const [processing, setProcessing] = useState(false);
    const [transId, setTransId] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    useEffect(() => {
        if (price > 0) {
            fetch(url, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ price })
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data.clientSecret)
                    setClientSecret(data.clientSecret)
                })
        }

    }, [price, token])



    const handleSubmit = async (event) => {
        event.preventDefault();
        setCardError(false)

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }
        // console.log("Card", card)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if (error) {
            setCardError(error.message)
        } else {
            console.log("Payment method", paymentMethod)
        }

        setProcessing(true)

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "unknown email",
                        email: user?.email || "unknown name"
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError)
        }

        // console.log(paymentIntent)
        setProcessing(false);

        if (paymentIntent?.status === "succeeded") {
            setTransId(paymentIntent.id)
            //save payment data
            // eslint-disable-next-line react/prop-types
            const payment = { email: user?.email, transactionId: paymentIntent.id, price, class: item?.class_name, image: item?.image, instructor: item?.instructor, classId: item?._id, date: new Date() };
            // console.log(payment)
            setLoading(true)
            axios.post("https://assignment-12-server-ivory.vercel.app/payments", payment)
                .then(res => {
                    if(res.data.insertedId){
                        axios.delete(`https://assignment-12-server-ivory.vercel.app/select-classes/${item._id}`)
                        .then(res => {
                            if(res.data.deletedCount > 0){
                                setLoading(false);
                                Swal.fire({
                                    title: 'success!',
                                    text: 'You have successfully payment',
                                    icon: 'success',
                                    confirmButtonText: 'ok'
                                  })
                                navigate("/dashboard/my-enrolled-classes")
                            }
                        })
                    }
                })
        }

    };

    return (
        <div className="w-full mt-12">
            <form className="w-full" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />

                <div className="text-center">
                    <div className="mb-2">
                        {
                            loading ? <p className="flex items-center justify-center gap-2">Processing: <FaOsi className="animate-spin" /></p> : ""
                        }
                    </div>
                    <button className="btn-all" type="submit" disabled={!stripe || !clientSecret || processing}>
                        Pay
                    </button>
                </div>
                {cardError && <p className="mt-4 text-red-500">Error: {cardError}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;