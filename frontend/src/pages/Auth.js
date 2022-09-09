import {useState} from 'react';
import Login from "./components/Login";
import Register from './components/Register';

const Auth = ({bool}) => {

    return(
        <>
            {bool ? <Login /> : <Register />}
        </>
    )
}


export default Auth;