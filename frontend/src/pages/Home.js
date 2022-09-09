import { Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import image from '../image.jpg';

const Home = () => {


    return(
    <>
        <div className='container'>
            <div className='navcontainer'>
                <Navbar />    
            </div>
        <div className='main'>
            <div className='Hook'>
            <h1>The best ToDo application Ever !</h1>
            <p>dont wast your time again, register now for early access ...</p>
            <Link to='/register' className='signup'>Sign Up</Link>
            </div>
            <div className='img'>
                <img src={image} alt=""/>
            </div>
        </div>
        </div>
    </>
    )
}


export default Home;