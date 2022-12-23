import axios from "axios";

import imagePlaceholder from "../../assets/icon/icon-left-font.png";

import React, { useState } from "react";
import { timestampParser } from "../../components/configurateDate";
import Header from "../../components/header";
import Footer from "../../components/footer";

import "../styles/post.css"
import Posts from "../posts";

const NewPost = () => {
    const [back, setBack] = useState("");
    const [title, setTitle] = useState("");
    const [description, setPost] = useState("");
    const [imageUrl, setPostPicture] = useState(imagePlaceholder);
    const [file, setFile] = useState();


    const handlePicture = (event) => {
        event.preventDefault();
        setPostPicture(URL.createObjectURL(event.target.files[0]));
        setFile(event.target.files[0]);
    };

    const handlePost = async (event) => {
        event.preventDefault();
        if ((title && description) || (title && description && imageUrl)) {
            const data = new FormData();
            data.append("userId", localStorage.getItem("id"));
            data.append("title", title);
            data.append("description", description);
            data.append("date", Date.now());
            if (file) {
                data.append('imageUrl', file.name);
                data.append('image', file);
            }
            axios({
                method: "post",
                url: `http://localhost:8080/api/posts/add`,
                data: data,
                headers: {
                    'authorization': "Bearer " + localStorage.getItem("Token"),
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.errors) {
                        console.log(res.data.errors);
                        
                    } else {
                        console.log(res);
                        setBack(true);
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
            });
        }
    };

    const cancelPost = (event) => {
        event.preventDefault();
        setPost("");
        setTitle("");
        setPostPicture("");
        setFile("");
        setBack(true);
    };

    return (
        <>
            {back ? (
                <Posts />
            ) : (
                <>
                    <Header />
                    <main className="post-container">
                    <form action="" id="formElem" onSubmit={handlePost}>
                        {description || imageUrl ? (
                            <section className="postView">
                                <img src={imageUrl} alt="image_de_l'activité" />
                                    <p>{title}</p>
                                    <p>{description}</p>
                            </section>
                        ) : null}
                            <div className="alignDescribePost">
                                <label htmlFor="image">Image de l'article</label>
                                <input type="file" id="file-upload" name="image" accept=".jpg, .jpeg, .png, .gif" onChange={(event) => handlePicture(event)} />
                                <label htmlFor="title">Title</label>
                                {timestampParser(Date.now())}
                                <input type="text" id="title" name="title" onChange={(event) => setTitle(event.target.value)} value={title} />
                                <textarea type="text" name="description" id="description" placeholder="Ecrire une description" onChange={(event) => setPost(event.target.value)} value={description} />
                            </div>
                            <div className="btn-send">
                                <button className="cancel" onClick={cancelPost}> Annuler </button>
                                <button className="send" onClick={handlePost}> Envoyer </button>
                            </div>
                    </form>
                </main>
                <Footer />
            </>
            )}
        </>
    );
};

export default NewPost;