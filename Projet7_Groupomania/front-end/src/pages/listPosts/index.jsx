import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom'
import { timestampParser } from "../../components/configurateDate";
import axios from "axios";

import Header from "../../components/headerAdmin"
import Footer from "../../components/footer"

import "../styles/posts.css"


function ListPost() {
    const [isNothing, setNothing]= useState(false);
    const [postData, setPostsData] = useState([]);

    const { _id } = useParams();
    console.log(_id);

    useEffect(() => {
        const fetchData = async () => {
            axios({
                method: "get",
                url: `http://localhost:8080/api/posts/userId/${_id}`,
                headers: {
                    'authorization': "Bearer "+ localStorage.getItem("Token"),
                }
            })
                .then((res) => {
                    if (typeof res.data !== 'undefined' && res.data.length > 0) {
                        const cardData = res.data;
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
    }, [_id]);
    
    return (
        <>
            <Header />
            <main className="limitedWidthBlockContainer" >
                {/* <div className="limitedWidthBlock"> */}
                <section className="titles">
                    <h1>Nos Evenements Groupomania</h1>
                    <h2>Articles</h2>
                </section>
                <section className="items">
                    {isNothing ? (
                        <div>
                            <h3>aucun posts réalisé</h3>
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
                {/* </div> */}
            </main>
            <Footer />
        </>
    )
}

export default ListPost