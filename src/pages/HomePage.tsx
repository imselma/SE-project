import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const userToken = localStorage.getItem('userToken')
    const navigate = useNavigate()
    const [loginHovered, setLoginHovered] = useState(false);
    const [registerHovered, setRegisterHovered] = useState(false);
    return (
        <>

            <div className='homepage-text' style={{textAlign: 'center', marginTop: '12%'}}>
                <h1 style={{color: '#976B7A'}}>Welcome to CookBook!</h1>
                <h2 style={{marginTop: '10px', color: '#976B7A'}}>Discover your favorite dish with our tasty recipes!</h2>
            </div>
            {!userToken && (  /*If userToken is null, undefined, false, or an empty string (''), !userToken will be true and the button will not be render*/
            <div className='buttons'  style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '5%' }}>
            <button type="button" className="btn" style={{backgroundColor: loginHovered ? '#7B556A' : '#976B7A', color: 'white', width: '160px', height: '50px', fontSize: '20px'}} 
            onMouseEnter={() => setLoginHovered(true)}
            onMouseLeave={() => setLoginHovered(false)}
            onClick={() => navigate("/login")}>Login</button>
            <button type="button" className="btn" style={{backgroundColor: registerHovered ? '#f2f2f2' : 'white',  border: '2px solid #976B7A', color: '#976B7A', width: '160px', height: '50px', fontSize: '20px', fontWeight: 'bold' }} 
            onMouseEnter={() => setRegisterHovered(true)}
            onMouseLeave={() => setRegisterHovered(false)}
            onClick={() => navigate("/register")}>Register</button>
            </div>)}
            
        </>
    )
}

export default HomePage