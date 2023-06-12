import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import SocialSignIn from "../../components/Shared/SocialSignIn/SocialSignIn";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";


const Register = () => {
    const [show, setShow] = useState(true);
    const [showConfirm, setShowConfirm] = useState(true);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [err, setErr] = useState("");

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();


    const onSubmit = data => {
        // console.log(data)
        setErr(false)
        if (password !== confirmPassword) {
            return setErr("Password did not match")
        }
        createUser(data.email, data.password)
            .then(result => {
                const signedUser = result.user;
                console.log(signedUser);
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const savedUser = { name: data.name, email: data.email, image: data.photo };
                        fetch("https://assignment-12-server-ivory.vercel.app/users", {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(savedUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    Swal.fire({
                                        title: 'Success!',
                                        text: 'You have successfully registered',
                                        icon: 'success',
                                        confirmButtonText: 'Ok'
                                    })
                                    navigate("/login")
                                }
                            })

                    })
                    .catch(error => setErr(error.message))
            })
            .catch(error => {
                setErr(error.message)
            })
    };


    return (
        <div className="hero min-h-screen bg-base-200 text-black pb-8">

            <div className="card flex-shrink-0 w-1/2 shadow-2xl bg-base-100 mt-24">
                <h2 className="text-3xl text-center mt-5 font-semibold">Register Now</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input  {...register("name", { required: true })} type="text" placeholder="type your name" className="input input-bordered" />
                        {errors.name && <span className="text-red-400 text-sm">Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input  {...register("email", { required: true })} type="email" placeholder="type email" className="input input-bordered" />
                        {errors.email && <span className="text-red-400 text-sm">Email is required</span>}
                    </div>

                    <div className="flex gap-4">
                        <div className="form-control relative w-full">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register("password", { required: true, minLength: 6, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })}
                                type={`${show ? "password" : "text"}`}
                                placeholder="type password"
                                className="input input-bordered"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.password?.type === 'required' && <p className="text-red-400 text-sm">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-400 text-sm">Password must be 6 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-400 text-sm">Password must have one Uppercase one lower case, one number and one special character.</p>}
                            <span onClick={() => setShow(!show)} className="cursor-pointer absolute right-0 top-1/2 mt-2 me-4"><FaEye /></span>
                        </div>
                        <div className="form-control relative w-full">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                {...register("confirm_password", { required: true, minLength: 6, maxLength: 20 })}
                                type={`${showConfirm ? "password" : "text"}`}
                                placeholder="type confirm password"
                                className="input input-bordered"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {errors.confirm_password && <span className="text-red-400 text-sm">Confirm password is required</span>}
                            <span onClick={() => setShowConfirm(!showConfirm)} className="cursor-pointer absolute right-0 top-1/2 mt-2 me-4"><FaEye /></span>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input  {...register("photo", { required: true })} type="url" placeholder="type photo url" className="input input-bordered" />
                        {errors.photo && <span className="text-red-400 text-sm">Photo url is required</span>}
                    </div>
                    <p className="text-red-500 mt-2 ms-2">{err}</p>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Register" />
                    </div>
                </form>
                <div className="form-control mt-2 mb-5 mx-6">
                    <SocialSignIn />
                    <Link to="/login" className="mt-4 text-green-600">Have an account? Please Login</Link>
                </div>
            </div>

        </div>
    );
};

export default Register;