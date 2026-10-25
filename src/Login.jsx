import React from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

function Login(){

    const navigate = useNavigate()

    const[login,setLogin] = React.useState([])

    const[email,setEmail] = React.useState("")
    const[password,setPassword] = React.useState("")

    return(
        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">
                    Shop<span>Flow</span>
                </div>


                <div className="login-heading">

                    <h1>Welcome back</h1>

                    <p>
                        Sign in to continue shopping with ShopFlow.
                    </p>

                </div>


                <div className="login-form">

                    <div className="login-input-group">

                        <label>Email</label>

                        <input
                        className="login-input"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={function(e){
                            setEmail(e.target.value)
                        }}
                        />

                    </div>


                    <div className="login-input-group">

                        <label>Password</label>

                        <input
                        className="login-input"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={function(e){
                            setPassword(e.target.value)
                        }}
                        />

                    </div>


                    <button
                    className="login-submit"
                    onClick={function(){

                        fetch("http://localhost:5000/login",{

                            method:"POST",

                            headers:{
                                "Content-Type":"application/json"
                            },

                            body:JSON.stringify({

                                email:email,
                                password:password

                            })

                        })

                        .then(function(response){
                            return response.json()
                        })

                        .then(function(data){

                            localStorage.setItem(
                                "token",
                                data.token
                            )

                            setLogin(data)
navigate("/")
                        })

                    }}
                    >
                        Login
                        <span>→</span>
                    </button>


                    <div className="login-divider">

                        <span></span>

                        <p>OR</p>

                        <span></span>

                    </div>




                    <button
                    className="login-register"
                    onClick={function(){
                        navigate("/register")
                    }}
                    >
                        Don't have an account?
                        <strong> Register</strong>
                    </button>

                </div>


                <p className="login-footer">
                    Secure login · ShopFlow
                </p>

            </div>

        </div>
    )
}

export default Login