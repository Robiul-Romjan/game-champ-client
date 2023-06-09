import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

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

        const newClass = {class_name, image, instructor_name, email, seats: parseFloat(seats), status: "pending", price: parseFloat(price), enrolled: parseFloat(0), feedback: ""}

        fetch("http://localhost:5000/classes", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newClass)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                alert("successfully added class")
            }
        })
    };

    return (
        <div className='w-full'>
            <h2 className="text-3xl">Add class by instructors</h2>
            <form onSubmit={handleSubmit} className="p-12 bg-gray-200 me-12 rounded-lg">

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