import { useForm } from "react-hook-form";


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    };


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input  {...register("name",  { required: true })} type="text"  placeholder="type your name" className="input input-bordered" />
                            {errors.name && <span className="text-red-400 text-sm">Name is required</span>}
                        </div>
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
                            <input  {...register("password", { required: true, minLength:6, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} type="password" placeholder="type password" className="input input-bordered" />
                            {errors.password?.type === 'required' && <p className="text-red-400 text-sm">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-400 text-sm">Password must be 6 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-400 text-sm">Password must have one Uppercase one lower case, one number and one special character.</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input  {...register("confirm_password", { required: true, minLength: 6, maxLength: 20 })} type="password" placeholder="type confirm password" className="input input-bordered" />
                            {errors.confirm_password && <span className="text-red-400 text-sm">Confirm password is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input  {...register("photo",  { required: true })} type="url" placeholder="type photo url" className="input input-bordered" />
                            {errors.photo && <span className="text-red-400 text-sm">Photo url is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;