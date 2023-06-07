// save user in db
export const saveUser = user => {
   
    fetch(`http://localhost:5000/users`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
};