import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import { timestampParser } from "../../components/configurateDate";

import Header from "../../components/headerAdmin"
import Footer from "../../components/footer"

import AddPost from "../addPost"

import "../styles/posts.css"


function Posts() {
    const [isAdd, setAddButton] = useState(false);
    const [isNothing, setNothing]= useState(false);
    const [postData, setPostsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            axios({
                method: "get",
                url: `http://localhost:8080/api/posts/`,
                headers: {
                    'authorization': "Bearer "+ localStorage.getItem("Token"),
                }
            })
                .then((res) => {
                    if (typeof res.data !== 'undefined' && res.data.length > 0) {
                        const cardData = res.data;
                        setPostsData(cardData.sort().reverse());
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
    const handleAdd = (event) => {
        event.preventDefault();
        setAddButton(true);
    }
    
    return (
        <>
            {isAdd ? (
                <div><AddPost /></div>
            ) : (
            <>
                <Header />
                <main className="limitedWidthBlockContainer">
                    {/* <div className="limitedWidthBlock"> */}
                        <div className="titles">
                            <h1>Nos Evenements Groupomania</h1>
                            <h2>Articles</h2>
                        </div>
                        <section className="items">
                            {isNothing ? (
                                <div>
                                    <h3>Des événements et activités prochainement</h3>
                                </div>
                            ) : (
                                <div>
                                    {postData?.map(function (postData, index) {
                                        return (
                                            <div key={index}>
                                                <Link className="post" to={`/posts/${postData._id}`}>
                                                    <article>
                                                        <img src={postData.imageUrl} alt="image_evenement" />
                                                        <h3 className="productName" id="title">{postData.title}</h3>
                                                        <p className="textDescription" id="description">{postData.description}</p>
                                                        <div>{timestampParser(postData.date)}</div>
                                                    </article>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </section>
                        <form className="buttonCenter" onSubmit={handleAdd}>
                            <input type="submit" value="add" />
                        </form>
                    {/* </div> */}
                </main>
                <Footer />
            </>
        )}
        </>
    )
}

export default Posts