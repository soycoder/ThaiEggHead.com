import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <br/>
            <li>
                <NavLink to="/login">Login Page</NavLink>
            </li>
            <li>
                <NavLink to="/profile">Profile Page</NavLink>
            </li>
            
            
        </div>
    )
}

export default Home


