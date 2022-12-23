import Header from "../../components/header";
import Footer from "../../components/footer"
import Post from "./post";
import Comments from "./comments";

import "../styles/post.css"

function DetailEvent() {

    return (
        <>
            <Header />
            <main>
                <Post />
                <Comments />
            </main>
            <Footer />
        </>
    )
}

export default DetailEvent