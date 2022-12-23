import Header from "../../components/navBar"
import { useNavigate } from "react-router-dom"

import React, { useState } from "react";
import axios from "axios";

import "../styles/form.css";

function SignUp() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [password, setPassword] = useState("");
    const [controlPassword, setControlPassword] = useState("");
    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const emailError = document.querySelector(".emailError");
        const passwordError = document.querySelector(".passwordError");
        const passwordConfirmError = document.querySelector(".password-confirm.error");

        passwordConfirmError.innerHTML = "";

        if (password !== controlPassword) {
            passwordConfirmError.innerHTML = "Les deux mots de passe ne sont pas identiques";
        } else {
            axios({
                method: "post",
                url: `http://localhost:8080/api/user/signup`,
                withCredentials: true,
                data: {
                    email,
                    password,
                },
            })
                .then((res) => {
                    console.log(res);
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
                    console.log(error.response.data);
                    setError(error.response.data);
            });
        }
    };
    return (
        <>
            <Header />
            <div className="app">
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label>Email </label>
                        <input type="text" name="email" id="email" onChange={(event) => setEmail(event.target.value)} value={email} />
                        <div className="emailError"></div>
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} value={password} />
                        <div className="passwordError"></div>
                    </div>
                    <div className="input-container">
                        <label htmlFor="password-conf">Confirmer mot de passe</label>
                        <input type="password" name="password" id="password-conf" onChange={(event) => setControlPassword(event.target.value)} value={controlPassword} />
                        <div className="password-confirm error"></div>
                    </div>
                    <div className="button-container">
                        <input type="submit" />
                    </div>
                    {error && <div>{ error }</div>}
                </form>
            </div> 
        </>
    )
}

export default SignUp;