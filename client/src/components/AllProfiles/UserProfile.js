import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserProfile = ({
   profile: {
      user: { _id, name, avatar },
      status,
      company,
      location,
      skills,
   },
}) => {
   return (
      <Link className='view-profile' to={`/profile/${_id}`}>
         <div className='profile-item'>
            <div className='avatar-container'>
               <img className='profile-avatar' src={avatar} alt='User Avatar' />
            </div>
            <div className='details-container'>
               <div className='profile-item-top'>
                  <div>
                     <h2 className='name'>{name}</h2>
                     <p className='status'>
                        {status} {company && <span>at {company}</span>}
                     </p>
                     <p className='location'>
                        {location && <span>{location}</span>}
                     </p>
                  </div>
               </div>
               <ul className='profile-skills'>
                  {skills.map((skill, index) => (
                     <li key={index}>{skill}</li>
                  ))}
               </ul>
            </div>
         </div>
      </Link>
   )
}

UserProfile.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default UserProfile
