import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faUserTie,
   faUser,
   faUserGraduate,
} from '@fortawesome/free-solid-svg-icons'

const DashboardActions = () => {
   return (
      <div className='actions-container'>
         <Link className='dashboard-actions' to='/create-profile'>
            <FontAwesomeIcon icon={faUser} /> Edit Profile
         </Link>
         <Link className='dashboard-actions' to='/add-experience'>
            <FontAwesomeIcon icon={faUserTie} /> Add Experience
         </Link>
         <Link className='dashboard-actions' to='/add-education'>
            <FontAwesomeIcon icon={faUserGraduate} /> Add Education
         </Link>
      </div>
   )
}

export default DashboardActions
