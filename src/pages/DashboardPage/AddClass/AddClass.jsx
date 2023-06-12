import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const AddClass = () => {
    const { user } = useContext(AuthContext);
    

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const class_name = form.class_name.value;
        const image = form.image.value;
        const instructor_name = form.instructor_name.value;
        const email = form.email.value;
        const seats = form.seats.value;
        const price = form.price.value;

        const newClass = { class_name, image, instructor_name, email, seats: parseFloat(seats), status: "pending", price: parseFloat(price), enrolled: parseFloat(0), feedback: "" }
    
        fetch("https://assignment-12-server-ivory.vercel.app/classes", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newClass)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'You have successfully added class',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                }
            })
            form.reset();
    };


    return (
        <div className='w-full mt-12'>
            <h2 className="text-2xl md:text-3xl font-semibold text-center">Add A Class</h2>
            <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-36 bg-[#4021a5]"></div>
                <span className="text-red-500 font-semibold">Add Class</span>
                <div className="h-1 w-36 bg-[#4021a5]"></div>
            </div>
            <form onSubmit={handleSubmit} className="p-12 bg-gray-200 me-12 rounded-lg mt-8 ms-8 mb-12">

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Class name*</span>
                    </label>
                    <input type="text" name='class_name' placeholder="Class name" className="input input-bordered w-full" required />
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Class Image*</span>
                    </label>
                    <input type="url" name='image' placeholder="class Image" className="input input-bordered w-full" required />
                </div>

                <div className="flex gap-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Instructor Name*</span>
                        </label>
                        <input type="text" name='instructor_name' placeholder="Recipe name" className="input input-bordered w-full" readOnly defaultValue={user?.displayName} />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Instructor Email*</span>
                        </label>
                        <input type="email" name='email' placeholder="Instructor Email" className="input input-bordered w-full" readOnly defaultValue={user?.email} />
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Available Seats*</span>
                        </label>
                        <input type="number" name='seats' placeholder="Available Seats" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input type="number" name='price' placeholder="Price" className="input input-bordered w-full" required />
                    </div>
                </div>

                <input className="btn btn-active btn-accent mt-5" type="submit" value="Add Class" />

            </form>
        </div>
    );
};

export default AddClass;