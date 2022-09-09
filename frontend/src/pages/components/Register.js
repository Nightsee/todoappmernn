import { Link } from "react-router-dom";

import Navbar from "./Navbar";

const Register = () => {
    const createUser = async () => {
        let username = document.querySelector('input[name = "username"]')
        let password = document.querySelector('input[name = "password"]')
        let checkPassword = document.querySelector('input[name = "checkPassword"]')
        const Password = password.value

        if(checkPassword.value !== password.value){
            return
        }

        const Username = username.value
        const user = {username : Username , password: Password}
        username.value = ""
        password.value = ""
        checkPassword.value = ""
        //sending the post request to sever.js to create the user
        const requestOptions = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }
        
        let response = await fetch('/register', requestOptions)
        let result = await response.json()
        
        // create a pop up for account created with success
    }   

    return(
        <>
            <div className="container">
                <div className='navcontainer'>
                    <Navbar />    
                </div>
                <div className="regform">
                    <h2>Register</h2>
                    <hr/>
                    <label for="username">Username :</label>
                    <input type="text" name="username" placeholder="enter a unique username" required/>
                    <label for="password">Password :</label>
                    <input type="password" name="password"/>
                    <label for="password">enter you password again :</label>
                    <input type="password" name="checkPassword"/>
                    <button type="submit" onClick={() => createUser()}>Submit</button>
                    <p>you already have an account, <Link to='/authentification'>Login ...</Link></p>
                </div>
            </div>
        </>
    )
}


export default Register;