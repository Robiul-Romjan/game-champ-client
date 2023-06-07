import { useContext } from "react";
import SocialSignIn from "../../components/Shared/SocialSignIn/SocialSignIn";
import { AuthContext } from "../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn } = useContext(AuthContext);
 
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const onSubmit = data => {
        // console.log(data)
        signIn(data.email, data.password)
            .then(result => {
                const signedUser = result.user;
                console.log(signedUser);
                alert("Successfully Login");
                navigate(from, { replace: true }) || "/"
            })
            .catch(error => {
                console.log(error.message)
            })
    };

    return (
        <div className="hero min-h-screen bg-base-200">

            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mt-24">
                <h2 className="text-3xl text-center mt-5 font-semibold">Login Now</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input  {...register("email", { required: true })} type="email" placeholder="type email" className="input input-bordered" />
                        {errors.email && <span className="text-red-400 text-sm">Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input  {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} type="password" placeholder="type password" className="input input-bordered" />
                        {errors.password?.type === 'required' && <p className="text-red-400 text-sm">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-400 text-sm">Password must be 6 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-400 text-sm">Password must have one Uppercase one lower case, one number and one special character.</p>}
                    </div>
                    
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Login" />
                    </div>
                </form>
                <div className="form-control mt-2 mb-5 mx-6">
                    <SocialSignIn />
                    <Link to="/register" className="mt-4 text-green-600">Do not have an account? Please Register</Link>
                </div>
            </div>

        </div>
    );
};

export default Login;