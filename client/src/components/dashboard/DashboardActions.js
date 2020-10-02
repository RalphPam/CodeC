import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = () => {
   return (
      <div>
         <Link to='/create-profile'>
            <i className='fas fa-user'></i>Edit Profile
         </Link>
         <Link to='/add-experience'>
            <i className='fas fa-user-tie'></i>Add Experience
         </Link>
         <Link to='/add-education'>
            <i className='fas fa-user-graduate'></i>Add Education
         </Link>
      </div>
   )
}

export default DashboardActions
