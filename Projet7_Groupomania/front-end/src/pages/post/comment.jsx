import React, { useState } from "react";
import axios from "axios";
import { timestampParser } from "../../components/configurateDate";
import "../styles/post.css"


function Comment({data, setCommentData, commentData}) {
    const [newTitle , setTitleNew] = useState("");
    const [newComment, setcommentNew] = useState("");
    const [commentModify, setCommentModify] = useState(false);

    const handleCommentModify = async (event, comment) => {
        event.preventDefault();
        setCommentModify(true);
        setTitleNew(comment.title);
        setcommentNew(comment.comment);
    }
    const handleCommentNew = async (event, id) => {
        event.preventDefault();
        if (newTitle.length === 0) {
            alert("Le champ titre ne peut pas être vide");
            return;
        }
        if (newComment.length === 0) {
            alert("Le champ commentaire ne peut pas être vide");
            return;
        }
        // if (newTitle || newComment) {
            // const data = new FormData();
        const data = {
            "userId" : localStorage.getItem("id"),
            "title": newTitle,
            "comment": newComment
        }
            axios({
                method: "put",
                url: `http://localhost:8080/api/comment/${id}`,
                data: data,
                headers: {
                    'authorization': "Bearer " + localStorage.getItem("Token"),
                },
            })
                .then((res) => {
                    console.log(res);
                    if (res.data.errors) {
                        console.log(res.data.errors);
                    } else {
                        console.log(commentData)
                        const comments = [...commentData]; //[...commentData]
                        const comment = comments.find(a => a._id === id) 
                        comment.title = newTitle
                        comment.comment = newComment
                        console.log(comment)
                        setCommentModify(false);
                        setCommentData(comments);
                        // navigate(`/posts/${postId}`, { replace: true });
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
            });
        // }
    };

    const handleCommentDelete = async (event, id) => {
        event.preventDefault();
        axios({
            method: "Delete",
            url: `http://localhost:8080/api/comment/${id}`,
            headers: {
                'authorization': "Bearer " + localStorage.getItem("Token"),
            },
        })
            .then((res) => {
                console.log(res, data, commentData);
                const comments = [...commentData]; // [...data]
                const index = comments.findIndex(a => a._id === id)
                comments.splice(index, 1)

                setCommentData(comments);
                // setdata(comments);
                // navigate(`/posts/${postId}`, { replace: true });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const cancelPost = (event) => {
        event.preventDefault();
        setCommentModify(false);
    };

    return (
        <article className="comment">
            {commentModify ? (
                                <div className="commentOrder">
                                    <label>
                                        Title
                                        <input type="text" id="title" name="title" onChange={(event) => setTitleNew(event.target.value)} value={newTitle} required="required" />
                                    </label>     
                                    <textarea name="comment" id="comment" placeholder="Ecrire un commentaire" onChange={(event) => setcommentNew(event.target.value)} value={newComment} required="required" />
                                    <button className="cancel" onClick={cancelPost}> Annuler </button>
                                    <button className="send"onClick={(event) => handleCommentNew(event, data._id)} > Envoyer </button>
                                </div>
                            ) : (
                            <>
                                {(data.userId === localStorage.getItem("id") || localStorage.getItem("isAdmin") === "true") && (
                                    <button className="modify" onClick={(event) => handleCommentModify(event, data)}><i className="fa-solid fa-arrow-rotate-left"></i> Change</button>
                                )} 
                                <div>
                                    <h3 className="title" id="title">{data.title}</h3>
                                    <p className="describeComment" id="description">{data.comment}</p>
                                    <div>{timestampParser(data.date)}</div>
                                        {/* <span>{data.userId.email}</span> */}
                                    </div>
                                {(data.userId === localStorage.getItem("id") || localStorage.getItem("isAdmin") === "true") && (
                                    <button className="delete" onClick={(event) => handleCommentDelete(event, data._id)}><i className="fa-solid fa-square-xmark"></i> Delete</button>
                                )} 
                            </>
                            )}
                        </article>
    )
}

export default Comment;