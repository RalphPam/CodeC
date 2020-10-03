import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserProfile } from '../../redux/actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import Profile2nd from './Profile2nd'

const UserProfile = ({
   match,
   profile: { profile, isLoading },
   auth,
   getUserProfile,
}) => {
   useEffect(() => {
      getUserProfile(match.params.id)
   }, [getUserProfile, match.params.id])

   if (isLoading && !profile) return <Spinner />

   return (
      <div>
         <Link to='/profiles'>Back to Profiles</Link>
         {auth.isAuthenticated &&
            !auth.isLoading &&
            auth.user._id === profile.user._id && (
               <Link to='/create-profile'>Edit Profile</Link>
            )}
         <ProfileTop profile={profile} />
         <Profile2nd profile={profile} />
      </div>
   )
}

UserProfile.propTypes = {
   profile: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   getUserProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
   profile: state.profile,
   auth: state.auth,
})

export default connect(mapStateToProps, { getUserProfile })(UserProfile)
