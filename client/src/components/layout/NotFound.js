import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons'

const NotFound = () => {
   return (
      <div className='not-found-page'>
         <h1 className='not-found'>Page not found</h1>
         <Link className='not-found-link' to='/'>
            <FontAwesomeIcon icon={faHandPointLeft} /> Go back to Homepage
         </Link>
      </div>
   )
}

export default NotFound
