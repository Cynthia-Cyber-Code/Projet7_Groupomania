import Header from "../../components/navBar";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const Login = () => {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("Two@two.com");
    const [password, setPassword] = useState("Two222");
    let navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        const emailError = document.querySelector(".emailError");
        const passwordError = document.querySelector(".passwordError");
        axios({
            method: "post",
            url: `http://localhost:8080/api/user/login`,
            withCredentials: true,
            data: {
                email,
                password,
            },
        })
            .then((res) => {
            console.log(res.data);
            if (res.data.errors) {
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.erros.password;
            } else if (res.data.isAdmin === true) {
                localStorage.setItem("Token", res.data.token);
                localStorage.setItem("id", res.data.userId);
                localStorage.setItem("isAdmin", res.data.isAdmin);
                navigate("/admin", { replace: true });
            } else {
                localStorage.setItem("Token", res.data.token);
                localStorage.setItem("id", res.data.userId);
                navigate("/posts", { replace: true });
            }
            })
            .catch((error) => {
                console.log(error);
                setError(error.message);
            });
    };

    return (
        <>
            <Header />
            <div className="app">
                {/* <div className="login-form"> */}
                <form className="login-form" action="" onSubmit={handleLogin} id="login-form">
                    <div className="input-container">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" onChange={(event) => setEmail(event.target.value)} value={email} />
                        <div className="emailError"></div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} value={password} />
                        <div className="passwordError"></div>
                    </div>
                    <div className="button-container">
                        <input className="submit-btn" type="submit" value="Se connecter"/>
                    </div>
                    {error && 
                        <div>{ error }</div>
                    }
                </form>
            </div>
            {/* </div> */}
        </>
    );
};

export default Login;
