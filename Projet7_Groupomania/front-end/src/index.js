import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Acceuil from './pages/acceuil';
import Login from './pages/login';
import SignUp from "./pages/signUp";
import Posts from "./pages/posts";
import Post from "./pages/post";
import ModifyPost from "./pages/modifyPost";
import Admin from "./pages/admin";
import ListPost from "./pages/listPosts"

import Error from './components/error'
import './pages/styles/index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Acceuil />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/modifyPost/:postId" element={<ModifyPost />} />
                <Route path="/posts/:postId" element={<Post />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/posts/userId/:_id" element={<ListPost />} />
                <Route path="/Error" element={<Error />} />
            </Routes>
    </BrowserRouter>
);