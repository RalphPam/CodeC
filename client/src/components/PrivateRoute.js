import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({
   isAuthenticated,
   isLoading,
   component: Component,
   ...rest
}) => (
   <Route
      {...rest}
      render={(props) =>
         isAuthenticated && !isLoading ? (
            <Component {...props} />
         ) : (
            <Redirect to='/' />
         )
      }
   />
)

PrivateRoute.propTypes = {
   isAuthenticated: PropTypes.bool,
   isLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
   isLoading: state.auth.isLoading,
})

export default connect(mapStateToProps)(PrivateRoute)
