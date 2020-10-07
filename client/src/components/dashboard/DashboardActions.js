import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = () => {
   return (
      <div className='actions-container'>
         <Link className='dashboard-actions' to='/create-profile'>
            <i className='fas fa-user'></i> Edit Profile
         </Link>
         <Link className='dashboard-actions' to='/add-experience'>
            <i className='fas fa-user-tie'></i> Add Experience
         </Link>
         <Link className='dashboard-actions' to='/add-education'>
            <i className='fas fa-user-graduate'></i> Add Education
         </Link>
      </div>
   )
}

export default DashboardActions
