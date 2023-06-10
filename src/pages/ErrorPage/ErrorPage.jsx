import { Link, useRouteError } from "react-router-dom";
import image from "../../assets/error.png"


const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="h-[100vh] w-full flex items-center justify-center">
            <div className="text-center">
                <img src={image} alt="" />
                <p className='text-red-500 font-semibold mt-4'>{error.data}</p>
                <div className="mt-8">
                    <Link className="btn-all"> Go to home page</Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;