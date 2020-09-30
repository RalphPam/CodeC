import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../redux/actions/auth'

const Navbar = ({ isAuthenticated, isLoading, logout }) => {
   const userLink = (
      <Fragment>
         <Link to={'/'} onClick={() => logout()}>
            <li>
               {!isLoading && (
                  <Fragment>
                     <i className='fas fa-sign-out-alt'></i> Logout
                  </Fragment>
               )}
            </li>
         </Link>
      </Fragment>
   )
   const guestLink = (
      <Fragment>
         <Link to=''>
            <li>Profiles</li>
         </Link>
         <Link to='/register'>
            <li>Register</li>
         </Link>
         <Link to='/login'>
            <li>Login</li>
         </Link>
      </Fragment>
   )
   return (
      <nav>
         <Link to='/'>
            <h1>Logo</h1>
         </Link>
         <ul>{isAuthenticated ? userLink : guestLink}</ul>
      </nav>
   )
}

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
   isLoading: state.auth.isLoading,
})

Navbar.propTypes = {
   isAuthenticated: PropTypes.bool,
   isLoading: PropTypes.bool,
   logout: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { logout })(Navbar)
