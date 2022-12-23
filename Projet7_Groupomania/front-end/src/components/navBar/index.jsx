import { Link } from 'react-router-dom'
import logo from '../../assets/icon/icon-left-font.png';

function NavBar() {
    return (
        <header>
            <Link to="/"><img src={logo} alt="Logo" /></Link>
            <nav>
                <Link className="space" to="/signup"> Sign Up</Link>
                <Link className="space" to="/login"  >Login</Link>
                
            </nav>
        </header>
    )
}

export default NavBar