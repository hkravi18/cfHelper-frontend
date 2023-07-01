import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
        <ul>
           <li><h1><Link to="/">CodeforcesHelper</Link></h1></li>
           <li><Link to="/">Home</Link></li>
           <li><Link to="/about">About</Link></li> 
           <li><Link to="/contact">Contact</Link></li>
        </ul>  
    </nav>
  )
}

export default Nav