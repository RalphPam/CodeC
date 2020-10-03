import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserProfile } from '../../redux/actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import Profile2nd from './Profile2nd'
import Experience from './Experience'
import Education from './Education'
import GithubRepos from './GithubRepos'

const UserProfile = ({
   match,
   profile: { profile, isLoading, repos },
   auth,
   getUserProfile,
   isReposLoading,
}) => {
   useEffect(() => {
      getUserProfile(match.params.id)
   }, [getUserProfile, match.params.id])
   if (!profile) return <Spinner />

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
         <Experience experience={profile.experience} />
         <Education education={profile.education} />
         <GithubRepos repos={repos} />
      </div>
   )
}

UserProfile.propTypes = {
   profile: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   getUserProfile: PropTypes.func.isRequired,
   isReposLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
   profile: state.profile,
   auth: state.auth,
   isReposLoading: state.profile.isReposLoading,
})

export default connect(mapStateToProps, { getUserProfile })(UserProfile)
