import { Link } from 'react-router-dom'

import logo from '../../assets/icon/icon-left-font.png';

function Header() {

    const deleteToken = (event) => {
        event.preventDefault();
        localStorage.clear();
        window.location.href = "http://localhost:3000/"
    }
    return (
        <header>
            <Link to="/Posts" ><img src={logo} alt="Logo" /></Link>
            <nav>
                <Link className="space" to={`/posts/userId/${localStorage.getItem("id")}`} >Mes Posts</Link>
                <input className="buttonCustom"  type="button" onClick={(event) => deleteToken(event)} value="Log out" />
            </nav>
        </header>
    )
}

export default Header