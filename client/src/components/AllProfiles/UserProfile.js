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
      <div>
         <img src={avatar} alt='User Avatar' />
         <div>
            <h2>{name}</h2>
            <p>
               {status} {company && <span>at {company}</span>}
            </p>
            <p>{location && <span>{location}</span>}</p>
            <Link to=''>View Profile</Link>
         </div>
         <ul>
            {skills.slice(0, 4).map((skill, index) => (
               <li key={index}>
                  <i className='fas fa-check'></i> {skill}
               </li>
            ))}
         </ul>
      </div>
   )
}

UserProfile.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default UserProfile
