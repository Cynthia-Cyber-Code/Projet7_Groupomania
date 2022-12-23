import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { timestampParser } from "../../components/configurateDate";
import Header from "../../components/header";
import Footer from "../../components/footer";

import "../styles/post.css";

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [postPicture, setPostPicture] = useState("");
    const [file, setFile] = useState();
    let [currentPost, setCurrentPost] = useState({});
    
    let navigate = useNavigate();

    const handlePicture = (event) => {
        event.preventDefault();
        setPostPicture(URL.createObjectURL(event.target.files[0]));
        setFile(event.target.files[0]);
    };


    const { postId } = useParams();
    console.log(postId);

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
                    if (res.data.errors) {
                        console.log(res.data.errors);
                    } else {
                        const cardData = res.data;
                        setCurrentPost(res.data);
                        setFile(cardData.file);
                        setTitle(cardData.title);
                        setDescription(cardData.description);
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
        fetchData();
    }, [postId]);

    const handlePost = async (event) => {
        event.preventDefault();
        if (title || description || postPicture) {
            const data = new FormData();
            data.append("userId", currentPost.userId);
            data.append("title", title);
            data.append("description", description);
            if (file) {
                data.append('imageUrl', file.name);
                data.append('image', file);
            } 
            axios({
                method: "put",
                url: `http://localhost:8080/api/posts/${postId}`,
                data: data,
                headers: {
                    'authorization': "Bearer " + localStorage.getItem("Token"),
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((res) => {
                    if (res.data.errors) {
                        console.log(res.data.errors);
                    } else {
                        navigate("/posts", { replace: true });
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
            });
        }
    };

    const cancelPost = (event) => {
        event.preventDefault();
        navigate("/posts", { replace: true });
        setDescription("");
        setTitle("");
        setPostPicture("");
        setFile("");
    };

    return (
        <>
            <Header />
            {/* <div className="post-container"> */}
            <form className="post-container" onSubmit={() => handlePost}>
                {postPicture ? (
                    <section className="postView">
                        <img src={postPicture} alt="image_de_l'activité" />
                    </section>
                ) : (
                    <section className="info">
                        <article>
                            <img src={currentPost.imageUrl} alt="image_evenement" />
                        </article>
                    </section>
                )}
                <div className="alignDescribePost">
                    <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .png, .gif" onChange={(event) => handlePicture(event)} />
                    <label>
                        Title
                        <input type="text" id="title" name="title" onChange={(event) => setTitle(event.target.value)} value={title} />
                    </label>
                    {timestampParser(currentPost.date)}
                    <textarea name="description" id="description" placeholder="Ecrire une description" onChange={(event) => setDescription(event.target.value)} value={description} />
                </div>
                <div className="btn-send">
                    <button className="cancel" onClick={cancelPost}> Annuler </button>
                    <button className="send" onClick={handlePost}> Envoyer </button>
                </div>
            </form>
            {/* </div> */}
            <Footer />
        </>
    );
};

export default NewPost;
