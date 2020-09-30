import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
   return (
      <nav>
         <Link to='/'>
            <h1>Logo</h1>
         </Link>
         <ul>
            <Link to=''>
               <li>Profiles</li>
            </Link>
            <Link to='/register'>
               <li>Register</li>
            </Link>
            <Link to='/login'>
               <li>Login</li>
            </Link>
         </ul>
      </nav>
   )
}
