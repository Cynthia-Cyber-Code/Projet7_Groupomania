import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'

import logo from '../../assets/icon/icon-left-font.png';

function HeaderAdmin() {

    const [isAdmin, setIsAdmin] = useState(false);
    

    useEffect(() => {
        if (localStorage.getItem("isAdmin") && localStorage.getItem("isAdmin") === "true") {
            setIsAdmin(true);
        }
    }, [])

    const deleteToken = (event) => {
        event.preventDefault();
        localStorage.clear();
        window.location.href = "http://localhost:3000/"
    }
    return (
        <header>
            {isAdmin ? (
                <>
                    <Link to="/admin" >
                        <img src={logo} alt="Logo" />
                    </Link>
                    <h1>Administrateur</h1>
                </>
            ) : (
                <Link to="/posts" >
                    <img src={logo} alt="Logo" />
                </Link>
            )}
            <nav>
                <Link className="space" to="/Posts" >Posts</Link>
                {isAdmin ? (null) : (
                    <Link className="space" to={`/posts/userId/${localStorage.getItem("id")}`} >Mes Posts</Link>
                )}
                <input className="buttonCustom"  type="button" onClick={(event) => deleteToken(event)} value="Log out" />
            </nav>
        </header>
    )
}

export default HeaderAdmin