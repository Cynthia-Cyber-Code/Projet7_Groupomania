import { Link } from 'react-router-dom'

import "../../pages/styles/index.css"
    
function Footer() {
    return (
        <footer>
            <div className="align-logo">
                <Link to="https://fr-fr.facebook.com/">
                    <div>
                        <i className="fa-brands fa-facebook"></i>
                        <p className="align-p">Facebook</p>
                    </div>
                </Link>
                <Link to="/">
                    <div>
                        <i className="fa-solid fa-info"></i>
                        <p className="align-p">Site internet</p>
                    </div>
                </Link>
                <Link to="https://www.linkedin.com/">
                    <div>
                        <i className="fa-brands fa-linkedin"></i>
                        <p className="align-p">LinkedIn</p>
                    </div>
                </Link>
            </div>
            <div>
                <p className="containRight">Company ©Groupomania. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer