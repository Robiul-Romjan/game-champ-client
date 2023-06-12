import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";


const SocialSignIn = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                const savedUser = { name: result.user.displayName, email: result.user.email, image: result.user.photoURL }
                
                fetch("https://assignment-12-server-ivory.vercel.app/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    // eslint-disable-next-line no-unused-vars
                    .then(data => {
                        navigate(from, { replace: true }) || "/"
                    })
            })
            .catch(error => console.log(error.message))
    }

    return (
        <div>
            <button onClick={handleGoogleLogin} className="btn btn-success text-white w-full"><FaGoogle /> Sign up with Google</button>
        </div>
    );
};

export default SocialSignIn;