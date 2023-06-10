import { useQuery } from "@tanstack/react-query"

const ManageUsers = () => {

    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await fetch("http://localhost:5000/users")
        return res.json();
    });

    const handleMakeAdmin = (id) => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    alert("user now admin")
                }
            })
    };

    const handleMakeInstructor = (id) => {
        fetch(`http://localhost:5000/users/instructor/${id}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    alert("user now Instructor")
                }
            })
    };

    return (
        <div className="w-full mt-12 ms-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-center">Manage All Users</h2>
            <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-36 bg-[#4021a5]"></div>
                <span className="text-red-500 font-semibold">Manage Users</span>
                <div className="h-1 w-36 bg-[#4021a5]"></div>
            </div>
            <div className="overflow-x-auto mt-8">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action 1</th>
                            <th>Action 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, i) => <tr key={user._id}>
                                <th>{i + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleMakeInstructor(user._id)} className="btn btn-sm btn-info" disabled={user.role == "instructor"}>Make Instructor</button>
                                </td>
                                <td>
                                    <button onClick={() => handleMakeAdmin(user._id)} className="btn btn-sm btn-error" disabled={user.role == "admin"} >Make Admin</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;