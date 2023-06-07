import { useQuery } from "@tanstack/react-query"

const ManageUsers = () => {
    const { data: users = [], refetch } = useQuery(["users"], async () => {
        const res = await fetch("http://localhost:5000/users")
        return res.json();
    });

    return (
        <div>
            <h2 className="text-3xl">Manage user</h2>
            <div className="overflow-x-auto">
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
                            users.map((user, i)=> <tr key={user._id}>
                            <th>{i+1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td><button className="btn btn-sm btn-info">Make Instructor</button></td>
                            <td><button className="btn btn-sm btn-error">Make Admin</button></td>
                        </tr>)
                        }              
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;