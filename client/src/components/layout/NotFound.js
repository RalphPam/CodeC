import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
   return (
      <div className='not-found-page'>
         <h1 className='not-found'>Page not found</h1>
         <Link className='not-found-link' to='/'>
            <i className='fas fa-hand-point-left'></i> Go back to Homepage
         </Link>
      </div>
   )
}

export default NotFound
