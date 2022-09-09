import { Link, useNavigate } from "react-router-dom";

const Apinavbar = () => {
    const navigate = useNavigate()
    function logout(){
        localStorage.removeItem('token')
        navigate('/authentification') 
    }

    return(
        <>
            <div className="navbar2">
                <h3><Link to="/">ToDoApp</Link></h3>
                <button onClick={logout}>Logout</button>
            </div>
        </>
    )
}


export default Apinavbar;