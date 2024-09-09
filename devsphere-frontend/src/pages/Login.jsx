import React from "react";

const Login = () => {

    let loginUser = async (e) => {
        e.preventDefault()
        console.log("cojest kurwa")
        let response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value,
                'password': e.target.password.value,
            })
        })
        let data = await response.json()
        console.log("data: ", data)
        console.log("response: ", response)
    }

    return (
        <>
            <h1>Login</h1>
                <form onSubmit={loginUser}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUsername1" className="form-label">Username</label>
                        <input type="text" className="form-control" id="exampleInputUsername" name="username"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Login;