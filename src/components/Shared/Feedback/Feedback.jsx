import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Feedback = () => {
    const {id} = useParams();
    const [feedbackClass, setFeedbackClass] = useState()

    useEffect(()=> {
        axios.get("http://localhost:5000/classes")
        .then(res => {
            const feedbackClass = res.data.find(fd => fd._id === id);
            setFeedbackClass(feedbackClass)
        })
    }, [id]);

    const handleFeedback = (e) => {
        e.preventDefault();
        const form = e.target;
        const feedback = form.feedback.value;
        // console.log(feedback)
        fetch(`http://localhost:5000/classes/denied/${feedbackClass?._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({feedback})
        })
        .then(res => res.json())
        .then(data=> {
            console.log(data)
        })
        
    }

    return (
        <div className="ms-4 w-full mt-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">Sent Feedback for Denied</h2>
            <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-36 bg-[#4021a5]"></div>
                <span className="text-red-500 font-semibold">Feedback</span>
                <div className="h-1 w-36 bg-[#4021a5]"></div>
            </div>

            <form onSubmit={handleFeedback} className="w-1/2 mx-auto mt-20">
                <h4 className="font-semibold text-xl my-4">Sent feedback for Class: <span className="text-[#4021a5]">{feedbackClass?.class_name}</span></h4>
                <textarea name="feedback" className="textarea w-full textarea-warning" placeholder="Feedback"></textarea>
                <div className="text-center mt-4">
                    <input className="btn-all" type="submit" value="Send Feedback" />
                </div>
            </form>

        </div>
    );
};

export default Feedback;