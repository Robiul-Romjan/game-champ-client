import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js"
import { useState } from "react";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState("")

    const handleSubmit = async(event) => {
        event.preventDefault();
        setCardError(false)

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            return
        }
        // console.log("Card", card)
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card
        })

        if(error){
            setCardError(error.message)
        }else{
            console.log("Payment method", paymentMethod)
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
                <p className="my-4 text-red-500">{cardError}</p>
                <button className="btn-all mt-6" type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;