import React from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'

const ProfileTop = ({ profile }) => {
   const {
      user: { name, avatar },
      status,
      bio,
   } = profile
   if (!profile) return <Spinner />
   return (
      <div className='profile-top'>
         <img
            className='profile-avatar-single'
            src={avatar}
            alt='User Avatar'
         />
         <div>
            <h1 className='profile-name'>{name}</h1>
            <h3 className='profile-status'>{status}</h3>
            {bio && <p className='profile-bio'>{bio}</p>}
         </div>
      </div>
   )
}

ProfileTop.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default ProfileTop
