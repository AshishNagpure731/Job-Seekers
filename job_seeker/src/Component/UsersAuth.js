
import React, { useState } from "react";
import {useNavigate } from "react-router-dom";

const UsersAuth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Role, setRole] = useState('')
    const navigate = useNavigate()

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleRole = (e) => {
        setRole(e.target.value)
    }

    const registerUser = async () => {
        if (Email === "" || Password === '' || Role === '') {
            alert("any field will be going empty please give input there")
        } else {
            const data = {
                email: Email,//'Ashi',
                password: Password,
                role: Role
            };

            await fetch("http://127.0.0.1:8000/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Convert data to JSON string
            }).then(response => response.json()).then(data => {
                alert(data.message)
                setIsLogin(true)


            }).catch((error) => {
                console.error('Error:', error);
            });
        }
    }

    const loginUser = () => {
        if (Email === "" || Password === '' ) {
            alert("any field will be going empty please give input there")
        } else {
            const data = {
                email: Email,
                password: Password
            };

            fetch("http://127.0.0.1:8000/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // Convert data to JSON string
            }).then(response => response.json()).then(data => {
                if(data.auth === false){
                    alert(data.message)
                }else if(data.auth === true){
                    if(data.data.role === "User"){
                    navigate('/joblistings',{state:data})
                    }else if(data.data.role === "Recruiter"){
                        navigate('/recruitermanage',{state:data})
                    }
                }
            }).catch((error) => {
                console.error('Error:', error);
            });
        }
    }


    return (
        <div style={{
            width: "100%",
            minHeight: "50vh", /* Now it won't force full screen */
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                width: "320px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <h2 style={{ width: "100%" }}>{isLogin ? "Login" : "Register"}</h2>
                {/* <input type="text" placeholder="Username" style={{
                    width: "90%",
                    padding: "10px",
                    margin: "10px 0",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }} /> */}
                <input type="email" placeholder='Email' style={{
                    width: "90%",
                    padding: "10px",
                    margin: "10px 0",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }} onChange={(e) => handleEmail(e)} />

                <input type="password" placeholder='Password' style={{
                    width: "90%",
                    padding: "10px",
                    margin: "10px 0",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }} onChange={(e) => handlePassword(e)} />

                {!isLogin && (
                    <>
                        {/* <input type="email" placeholder="Email" style={{
                            width: "90%",
                            padding: "10px",
                            margin: "10px 0",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }} /> */}

                        {/* <input type="text" placeholder="Role : User Or Recruitor Only" style={{
                            width: "90%",
                            padding: "10px",
                            margin: "10px 0",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }} onChange={(e)=>setRole(e)} /> */}
                        <select
                            style={{
                                width: "90%",
                                padding: "10px",
                                margin: "10px 0",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                            onChange={(e) => handleRole(e)}
                            value={Role}  // This ensures the dropdown reflects the selected value
                        >
                            <option value="">Select Role</option>
                            <option value="User">User</option>
                            <option value="Recruiter">Recruiter</option>
                        </select>
                    </>
                )}
                <button style={{
                    background: "#2a5298",
                    color: "white",
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "95%"
                }} onClick={isLogin ? loginUser : registerUser}>{isLogin ? "Login" : "Register"}</button>
                <a onClick={() => setIsLogin(!isLogin)} style={{
                    display: "block",
                    marginTop: "10px",
                    color: "#2a5298",
                    textDecoration: "none",
                    cursor: "pointer",
                }}>{isLogin ? "Register Here" : "Already have an account? Login"}</a>
            </div>
        </div>
    );
};



export default UsersAuth

