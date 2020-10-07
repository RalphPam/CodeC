import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAllProfiles } from '../../redux/actions/profile'
import Spinner from '../layout/Spinner'
import UserProfile from './UserProfile'

const AllProfiles = ({ profiles, isLoading, getAllProfiles }) => {
   useEffect(() => {
      getAllProfiles()
   }, [getAllProfiles])
   if (isLoading) return <Spinner />
   return (
      <div className='profiles-page'>
         <h1 className='header'>Professionals</h1>
         <p className='header-label'>
            <i className='fab fa-connectdevelop'></i> Browse and Connect with
            other people
         </p>
         {profiles.length > 0 ? (
            profiles.map((profile) => (
               <UserProfile key={profile._id} profile={profile} />
            ))
         ) : (
            <h3>No Profiles found...</h3>
         )}
      </div>
   )
}

AllProfiles.propTypes = {
   profiles: PropTypes.array.isRequired,
   isLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
   profiles: state.profile.profiles,
   isLoading: state.profile.isAllProfilesLoading,
})

export default connect(mapStateToProps, { getAllProfiles })(AllProfiles)
