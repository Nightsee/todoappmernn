import { Link } from "react-router-dom";

const Navbar = () => {

    return(
        <div className="navbar">
            <h3><Link to="/">ToDoApp</Link></h3>
            <Link to="/authentification">Authentification</Link>
        </div>
    )
}

export default Navbar;