import React, { useContext, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import noteContext from './context/notes/noteContext'


const Login = () => {

    const context = useContext(noteContext)

    const { alert, showAlert } = context

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        // event.preventDefault()
        event.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            })

        const resJson = await response.json()
        console.log(resJson)

        if (resJson.success) {
            //save the auth token and then redirect
            localStorage.setItem('token', json.authtoken)
            navigate('/');
            console.log("loging success")
            showAlert("Logged in Successfully", "success")
            console.log(alert, "alert")
        }
        else{
            showAlert("Login Failed-Please enter valid credentials", "danger")
        }
    }


    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div className="container my-5">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className="mb-3 my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} name="email" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} name="password" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login