import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "./comment";
import "../styles/post.css"
import { useParams } from "react-router-dom";


function Comments() {
    const [title, setTitle] = useState("");
    const [comment, setcomment] = useState("");
    const [commentData, setCommentData] = useState([]);
    // const [showForm, setShowForm] = useState(true);

    const { postId } = useParams();

    useEffect(() => {
        const fetch = async () => {
            axios({
                method: "get",
                url: `http://localhost:8080/api/comment/${postId}`,
                headers: {
                    'authorization': "Bearer "+ localStorage.getItem("Token"),
                },
            })
                .then((res) => {
                    const cardCommentData = res.data;
                    setCommentData(cardCommentData.reverse());
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
        fetch();
    }, [postId]);

    const addComment = async (event) => {
        event.preventDefault();
        if (title && comment) {
            const data = new FormData();
            data.append("postId", postId);
            data.append("date", Date.now());
            data.append("title", title);
            data.append("comment", comment);
            axios({
                method: "post",
                url: `http://localhost:8080/api/comment/add`,
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
                        console.log(res.data.comment);
                        const comments = [...commentData]
                        comments.push(res.data.comment);
                        setCommentData(comments);
                    }
                })
                .catch((error) => {
                    console.log(error.response.data);
            });
        }
    };

    return (
        <>
            <section>
                {/* {showForm && ( */}
                    <form onSubmit={() => addComment}>
                        <div className="commentOrder">
                            <label id="title">
                                Title
                                <input type="text" id="title" name="title" onChange={(event) => setTitle(event.target.value)} value={title} required="required" />
                            </label>
                            <textarea name="comment" id="comment" placeholder="Ecrire un commentaire" onChange={(event) => setcomment(event.target.value)} value={comment} required="required" />
                            <button className="send" onClick={addComment}> reply </button>
                            {/* <button className="cancel" onClick={()=>setShowForm(false)}> Cancel </button> */}
                        </div>
                    </form>
                {/* )} */}
                <section>
                    {commentData?.map((comment, index) => (
                    <Comment data={comment} key={index} setCommentData={setCommentData} commentData={commentData} />
                ))}
                </section>
            </section>
        </>
    )
}

export default Comments;