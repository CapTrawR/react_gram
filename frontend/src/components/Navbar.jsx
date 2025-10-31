import React from 'react'
import "./Navbar.css"

// Componentes
import { NavLink, Link } from 'react-router-dom'
import {
    BsSearch,
    BsHouseDoorFill,
    BsPersonFill,
    BsCameraFill,  
    } from 'react-icons/bs'


function Navbar() {
  return (
    <nav id="nav">
        <Link to={"/"}>ReactGram</Link>
        <form id='search-form'>
            <BsSearch/>
            <input type="text" placeholder='Search' />
        </form>
        <ul id="nav-links">
            <li>
            <NavLink to="/">
                <BsHouseDoorFill/>
            </NavLink>
            </li>
            <li>
            <NavLink to="/login">
                Login
            </NavLink>
            </li>
            <li>
            <NavLink to="/register">
                Register
            </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar