import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Nav = () => {

    const navigate = useNavigate();

    const auth = localStorage.getItem("user");
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }


    return (

        <div >
            <img src='https://graphicdesignjunction.com/wp-content/uploads/2023/01/best-logo-3.jpg' alt='logo' className='logo'/>
            {auth ? <ul className='nav-ul'>
                <li><Link to="/">products</Link></li>
                <li><Link to="/add">Add product</Link></li>
                <li><Link to="/update">Update product</Link></li>
                <li><Link to="/profile">profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
                :
                <ul className='nav-ul text-right'>
                    <li> <Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>

            }

        </div>
    )
}

export default Nav;