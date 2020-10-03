import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, deleteAccount } from '../../redux/actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({
   getCurrentProfile,
   auth: { user },
   profile: { profile, isLoading },
   deleteAccount,
}) => {
   useEffect(() => {
      getCurrentProfile()
   }, [getCurrentProfile])

   if (!profile && isLoading) return <Spinner />

   const noProfile = (
      <Fragment>
         <p>You have not yet setup a profile, please add some info</p>
         <Link to='/create-profile'>Create Profile</Link>
      </Fragment>
   )

   const withProfile = (
      <Fragment>
         <DashboardActions />
         {profile.experience.length > 0 ? <Experience /> : null}
         {profile.education.length > 0 ? <Education /> : null}
         <button onClick={() => deleteAccount()}>
            <i className='fas fa-user-slash'></i> Delete Account
         </button>
      </Fragment>
   )

   return (
      <Fragment>
         <h1>Welcome {user && user.name}</h1>
         {profile === null ? noProfile : withProfile}
      </Fragment>
   )
}

Dashboard.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
   deleteAccount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
   auth: state.auth,
   profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
   Dashboard
)