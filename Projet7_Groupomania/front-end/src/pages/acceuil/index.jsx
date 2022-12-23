import NavBar from "../../components/navBar"

function Acceuil() {
    return (
        <div>
            <NavBar />
            <main>
                <h1>Bienvenue au réseau social interne de Groupomania</h1>
                <ul>
                    <li>Si c'est votre première fois, veuillez créez votre compte avec Sign Up</li>
                    <li>Si vous avez déjà un compte, veuillez vous connectez à celui-ci avec Login</li>
                </ul>
            </main>
        </div>
    )
}

export default Acceuil