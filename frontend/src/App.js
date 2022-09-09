import './App.css';
import React, {useEffect, useState} from 'react';
import { Route, Routes } from "react-router-dom";
import Home  from './pages/Home';
import Auth from './pages/Auth';
import Api from './pages/Api';

const App = () => {
    const [data, setdata] = useState([{}])

    // useEffect()

    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/authentification" element={<Auth bool={true}/>}/>
            <Route path="/api" element={<Api />}/> 
            <Route path='/register' element={<Auth bool={false}/>}/>
        </Routes>
    )
}

export default App;
