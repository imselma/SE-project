import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'


const NavigationBar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const ItemStyle = {
        marginRight: '20px',
        fontWeight: 'bolder',
    }
    const TextStyle = {
        color: 'white'
    }
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#47817E' }}>
            <div className="container-fluid">
                <a className="navbar-brand"
                    style={{
                        marginLeft: '30px',
                        fontSize: '23px',
                        fontWeight: 'bold',
                        color: 'white'
                    }} href="#">CookBook</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav" style={{
                        marginLeft: 'auto',
                        marginRight: '30px'
                    }}>
                        <li className="nav-item" style={ItemStyle}>
                            <a className="nav-link" style={TextStyle} href="/home">Home</a>
                        </li>
                        <li className="nav-item" style={ItemStyle}>
                            <a className="nav-link" style={TextStyle} href="/recipes">Recipes</a>
                        </li>
                        <li className="nav-item" style={ItemStyle}>
                            <a className="nav-link" style={TextStyle} href="/aboutus">About Us</a>
                        </li>
                        {localStorage.getItem('userToken') &&  (
                            <>
                                <li className="nav-item" style={ItemStyle}>
                                    <a className="nav-link" style={TextStyle} href="/profile">Profile</a>
                                </li>
                                <li className="nav-item" style={ItemStyle}>
                                    <button type="button" className="btn"
                                        style={{
                                            backgroundColor: 'white',
                                            color: '#47817E',
                                            width: '75px',
                                            height: '35px',
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            marginLeft: '10px',
                                            marginTop: '3px'
                                        }} onClick={() => { dispatch(logout()); navigate("/home") }}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavigationBar;