import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../redux/actions/auth'
import { clrProfile } from '../../redux/actions/profile'

const Navbar = ({ isAuthenticated, isLoading, logout, clrProfile }) => {
   const userLink = (
      <Fragment>
         <Link to={'/posts'}>
            <li>
               {!isLoading && (
                  <Fragment>
                     <i className='fas fa-bell'></i> Posts
                  </Fragment>
               )}
            </li>
         </Link>
         <Link to={'/profiles'}>
            <li>
               {!isLoading && (
                  <Fragment>
                     <i className='fas fa-portrait'></i> Profiles
                  </Fragment>
               )}
            </li>
         </Link>
         <Link to={'/dashboard'}>
            <li>
               {!isLoading && (
                  <Fragment>
                     <i className='fas fa-user'></i> Dashboard
                  </Fragment>
               )}
            </li>
         </Link>
         <Link
            to={'/'}
            onClick={() => {
               logout()
               clrProfile()
            }}
         >
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
         <Link to='/profiles'>
            <li>
               <i className='fas fa-portrait'></i> Profiles
            </li>
         </Link>
         <Link to='/register'>
            <li>
               <i className='fas fa-user-plus'></i>Register
            </li>
         </Link>
         <Link to='/'>
            <li>
               <i className='fas fa-sign-in-alt'></i>Login
            </li>
         </Link>
      </Fragment>
   )
   return (
      <nav className='navbar'>
         <Link to={isAuthenticated ? '/dashboard' : '/'}>
            <h1>
               <i className='fas fa-hat-wizard'></i> CODEC
            </h1>
         </Link>
         <ul className='nav-links'>{isAuthenticated ? userLink : guestLink}</ul>
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

export default connect(mapStateToProps, { logout, clrProfile })(Navbar)
