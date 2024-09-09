import React from "react";

const Register = () => {
    
    let registerUser = async (e) => {
        e.preventDefault()
        console.log("cojest kurwa")
        let response = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value,
                'firstName': e.target.firstname.value,
                'lastName': e.target.lastname.value,
                'email': e.target.email.value
            })
        })
        let data = await response.json()
        console.log("data: ", data)
        console.log("response: ", response)
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                
                <div className="mb-3">
                    <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleInputUsername" name="username"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputFirstname1" className="form-label">Firstname</label>
                    <input type="text" className="form-control" id="exampleInputFirstname" name="firstname"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputLastname1" className="form-label">Lastname</label>
                    <input type="text" className="form-control" id="exampleInputLastname" name="lastname"/>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Register;