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
      <div>
         <img src={avatar} alt='User Avatar' />
         <div>
            <h1>{name}</h1>
            <h3>{status}</h3>
            {bio && <p>{bio}</p>}
         </div>
      </div>
   )
}

ProfileTop.propTypes = {
   profile: PropTypes.object.isRequired,
}

export default ProfileTop
