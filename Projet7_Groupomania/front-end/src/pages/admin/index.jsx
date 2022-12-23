import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

import Header from "../../components/headerAdmin"
import Footer from "../../components/footer"

import "../styles/admin.css"

function Admin() {
    const [isNothing, setNothing] = useState(false);
    const [dataUser, setPostsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            axios({
                method: "get",
                url: `http://localhost:8080/api/user/`,
                headers: {
                    'authorization': "Bearer "+ localStorage.getItem("Token"),
                }
            })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                    if (localStorage.getItem("isAdmin") && localStorage.getItem("isAdmin") === "true") {
                        const cardData = res.data;
                        console.log(res.data);
                        setPostsData(cardData);
                    } else {
                        setNothing(true);
                    }
                })
                .catch((error) => {
                    console.log(error.res.data);
                });
        }
        fetchData();
    }, []);
    
    return (
        <>
            <Header />
            <main className="admin" >
                <section className="titles">
                    <h1>Mail employés Groupomania</h1>
                    <h2>Utilisateurs inscrit</h2>
                </section>
                <section>
                    {isNothing ? (
                        <div>
                            <h3>Erreur: vous n'êtes pas reconnu administrateur</h3>
                        </div>
                    ) : (
                        <div>
                            <div className="alignementUser">
                                <p>User ID</p>
                                <p>Email User</p>
                            </div>
                            {dataUser?.map(function (dataUser, index) {
                                return (
                                    <div key={index}>
                                        <Link className="post" to={`/posts/userId/${dataUser._id}`}>
                                            <article>
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <th>
                                                                <h3 id="title"><i className="fa-regular fa-address-card"></i> {dataUser._id}</h3>
                                                            </th>
                                                            <th><p className="textDescription" id="description">{dataUser.email}</p></th>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </article>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Admin