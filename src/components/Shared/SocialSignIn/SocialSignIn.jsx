import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";


const SocialSignIn = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                const savedUser = { name: result.user.displayName, email: result.user.email, image: result.user.photoURL }
                fetch("http://localhost:5000/users", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.insertedId) {
                            alert("Successfully Register")
                            navigate(from, { replace: true }) || "/"
                        }
                    })
            })
            .catch(error => console.log(error.message))
    }

    return (
        <div>
            <button onClick={handleGoogleLogin} className="btn btn-success w-full">Sign up with Google</button>
        </div>
    );
};

export default SocialSignIn;