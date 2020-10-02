import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../redux/actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'

const Dashboard = ({
   getCurrentProfile,
   auth: { user },
   profile: { profile, isLoading },
}) => {
   useEffect(() => {
      getCurrentProfile()
   }, [])

   if (!profile && isLoading) return <Spinner />

   const noProfile = (
      <Fragment>
         <p>You have not yet setup a profile, please add some info</p>
         <Link to='/create-profile'>Create Profile</Link>
      </Fragment>
   )

   return (
      <Fragment>
         <h1>Welcome {user && user.name}</h1>
         {profile === null ? noProfile : <Fragment>Hi</Fragment>}
      </Fragment>
   )
}

Dashboard.propTypes = {
   getCurrentProfile: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
   auth: state.auth,
   profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
