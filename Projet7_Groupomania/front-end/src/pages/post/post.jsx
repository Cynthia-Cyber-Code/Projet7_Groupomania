import React, { useState, useEffect } from "react";
import axios from "axios";
import { timestampParser } from "../../components/configurateDate";

import "../styles/post.css"
import { useParams, useNavigate, Link } from "react-router-dom";

function Post() {
    const [postData, setPostsData] = useState({});
    const [likes, setLikes] = useState(0);
    const [isUserCard, setUserCard] = useState(false);

    let navigate = useNavigate();

    const { postId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            axios({
                method: "get",
                url: `http://localhost:8080/api/posts/${postId}`,
                headers: {
                    'authorization': "Bearer "+ localStorage.getItem("Token"),
                },
            })
                .then((res) => {
                    if ((res.data.userId === localStorage.getItem("id")) || (localStorage.getItem("isAdmin") && localStorage.getItem("isAdmin") === "true")) {
                        setUserCard(true);
                    }
                    const cardData = res.data;
                    setPostsData(cardData);
                    setLikes(cardData.likes);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
        fetchData();
    }, [postId]);

    const handleClick = async (event) => {
        event.preventDefault();
        axios({
            method: "post",
            url: `http://localhost:8080/api/posts/${postId}/like`,
            headers: {
                'authorization': "Bearer " + localStorage.getItem("Token"),
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            console.log(res.data);
            setLikes(res.data.likes);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    };
    
    const handleDelete = async (event) => {
        event.preventDefault();
        axios({
            method: "delete",
            url: `http://localhost:8080/api/posts/${postId}`,
            headers: {
                'authorization': "Bearer " + localStorage.getItem("Token"),
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                console.log(res);
                navigate("/posts", { replace: true });
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    return (
        <>
            <section className="info">
                <article>
                    <img src={postData.imageUrl} alt="image_evenement" />
                    <button className={ `like-button ${'liked'}` } onClick={ handleClick }>
                        <span className="likes-counter">{ `Like | ${likes}` }</span>
                    </button>
                    <div className="alignTitleComment"><h1 className="title" id="title">{postData.title}</h1>
                    <p className="description" id="description">{timestampParser(postData.date)}</p></div>
                    <p className="description" id="description">{postData.description}</p>
                </article>
                <article>
                    {isUserCard ? (
                        <div className="btn-send">
                            <Link to={`/modifyPost/${postId}`}>
                                <button className="send"> Modifier </button>
                            </Link>
                            <button className="delete" onClick={(event) => handleDelete(event)}> Supprimer </button>
                        </div>
                    ) : (null)}  
                </article>
            </section>
        </>
    )
}

export default Post