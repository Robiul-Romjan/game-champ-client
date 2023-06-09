import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { AuthContext } from "../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const ClassesPage = () => {
    const {user} = useContext(AuthContext)
    const [allClasses, setAllClasses] = useState([]);
    const [userRole, setUserRole]= useState();
    const [loading, setLoading]= useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axios.get("http://localhost:5000/classes")
            .then(data => {
                // console.log(data.data)
                const approvedClasses = data.data.filter(item => item.status === "approved");
                setAllClasses(approvedClasses);
            })
    }, []);

    useEffect(()=> {
        setLoading(true)
        fetch("http://localhost:5000/users")
        .then(res => res.json())
        .then(data => {
          const studentRole = data.find(student => student?.email === user?.email );
          setUserRole(studentRole)
          setLoading(false)
        })
    }, [user?.email]);

    if(loading){
        return "Loading"
    }

    const handleSelect =(item)=> {
        if (user && user.email) {
            const selectedClass = {classId: item._id, class_name: item.class_name, image: item.image, price: item.price, email: user.email, instructor: item.instructor_name};
            console.log(selectedClass);
            fetch("http://localhost:5000/select-classes", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(selectedClass)
            })
                .then(res => res.json())
                .then(data => {
                    if(data.insertedId){
                       toast("successfully select the class");
                       navigate("/dashboard/my-selected-classes")
                    }
                })
        }else{
            Swal.fire({
                title: 'Please Login to select the class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Log in!'
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", {state: {from: location}})
                }
              })
        }
    }

    return (
        <div className="mt-20 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <h2 className="text-3xl text-center">All Classes {allClasses.length}</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {
                    allClasses &&
                    allClasses.map(cls=> <div key={cls._id} className={`card w-96 glass ${cls?.seats == 0 ? "bg-red-500 text-white": ""}`}>
                    <figure><img src={cls.image} alt="car!"/></figure>
                    <div className="card-body">
                      <p className="text-lg">Class: {cls.class_name}</p>
                      <p>Instructor: {cls.instructor_name} </p>
                      <p>Available Seats: {cls.seats} </p>
                      <p>Price: {cls.price} </p>
                      <div className="card-actions">
                        <button onClick={()=> handleSelect(cls)} className="btn btn-primary" disabled={ userRole?.role !== undefined || cls?.seats === 0}>Select</button>
                      </div>
                    </div>
                  </div>)
                }
            </div>
        </div>
    );
};

export default ClassesPage;