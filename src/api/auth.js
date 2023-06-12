// save user in db
export const saveUser = user => {
   
    fetch(`https://assignment-12-server-ivory.vercel.app/users`, {
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