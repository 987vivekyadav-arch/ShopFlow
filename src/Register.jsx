import React from "react"
import { useNavigate } from "react-router-dom"
import "./Register.css"

function Register(){

    const navigate = useNavigate()

    const[register,setRegister] = React.useState([])

    const[name,setName] = React.useState("")
    const[email,setEmail] = React.useState("")
    const[password,setPassword] = React.useState("")

    return(
        <div className="register-page">

            <div className="register-card">

                <div className="register-logo">
                    Shop<span>Flow</span>
                </div>

                <div className="register-heading">
                    <h1>Create your account</h1>

                    <p>
                        Join ShopFlow and start shopping smarter.
                    </p>
                </div>


                <div className="register-form">

                    <div className="register-input-group">

                        <label>Name</label>

                        <input
                        className="register-input"
                        placeholder="Enter your name"
                        value={name}
                        onChange={function(e){
                            setName(e.target.value)
                        }}
                        />

                    </div>


                    <div className="register-input-group">

                        <label>Email</label>

                        <input
                        className="register-input"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={function(e){
                            setEmail(e.target.value)
                        }}
                        />

                    </div>


                    <div className="register-input-group">

                        <label>Password</label>

                        <input
                        className="register-input"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={function(e){
                            setPassword(e.target.value)
                        }}
                        />

                    </div>


                    <button
                    className="register-submit"
                    onClick={function(){

if(name.trim()===""){
    alert("Please fill in your name");
    return;
}
if(email.trim()===""){
    alert("Please fill in your email");
    return;
}
if(!email.includes("@")===""){
    alert("Please fill in your email");
    return;
}



if(password.trim()===""){
    alert("Please fill in your password");
    return;
}
if(password.length<8){
    alert("Password must be ateast 8 character");
    return;
}




                        fetch("https://shopflow-wkvz.onrender.com/register",{

                            method:"POST",

                            headers:{
                                "Content-Type":"application/json"
                            },

                            body:JSON.stringify({

                                name:name,
                                email:email,
                                password:password

                            })

                        })

                        .then(function(response){
                            return response.json()
                        })

                       
                         .then(function(data){
if(data.message){
    alert(data.message)
    return;
}
                            setRegister(data)
                            alert("Registration Successful")
                            navigate("/login")

                        })
 .catch(function(error){
alert("Something went wrong .Pleae try again")
                            
                            

                        })

                    }}
                    >
                        Create Account
                        <span>→</span>
                    </button>


                    <div className="register-divider">

                        <span></span>

                        <p>OR</p>

                        <span></span>

                    </div>


                    <button
                    className="register-login"
                    onClick={function(){
                        navigate("/login")
                    }}
                    >
                        Already have an account?
                        <strong> Login</strong>
                    </button>

                </div>


                <p className="register-footer">
                    By continuing, you agree to our terms and privacy policy.
                </p>

            </div>

        </div>
    )
}

export default Register