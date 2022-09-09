import { Link , useNavigate} from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";

const Login = () => {
    const navigate = useNavigate()
    
    useEffect(()=>{
        const token = localStorage.getItem('token')
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({token: token})
        }

        fetch('/verify',requestOptions)
        .then(res => res.json())
        .then(data => {
            if(data.islogedin === true){
                navigate('/api', {state: {id: data.userid}})
                
            }
        })
    }, [])

    const handleclick = async () => {
        const usernameinput = document.querySelector('input[name="username"]')
        const passwordinput = document.querySelector('input[name="password"]')

        const user = {
            username: usernameinput.value,
            password: passwordinput.value
        }

        usernameinput.value = ""
        passwordinput.value = ""
        
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }
        
        let response = await fetch('/login', requestOptions)
        let result = await response.json()

        if(result.isuser === true){
            localStorage.setItem('token', result.token)
            navigate('/api', {state: {id: result.userid}})
        }
        return
    }

    

    return(
        <>
            <div className="container">
                <div className='navcontainer'>
                    <Navbar />    
                </div>
                <div className="loginform">
                    <h2>Login</h2>
                    <hr/>
                    <label for="username">Username :</label>
                    <input type="text" name="username" required/>
                    <label for="password">Password :</label>
                    <input type="password" name="password"/>
                    <button type="submit" onClick={handleclick}>Submit</button>
                    <p>you don't have an account yet, <Link to='/register'>register ...</Link></p>
                </div>
            </div>
        </>
    )
}


export default Login;