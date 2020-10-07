import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../redux/actions/auth'
import { clrProfile } from '../../redux/actions/profile'

const Navbar = ({ isAuthenticated, isLoading, logout, clrProfile }) => {
   const userLink = (
      <Fragment>
         <Link to={'/posts'} className='link'>
            <li>
               {!isLoading && (
                  <Fragment>
                     <i className='fas fa-bell'></i>
                     <span> Posts</span>
                  </Fragment>
               )}
            </li>
         </Link>
         <Link to={'/profiles'} className='link'>
            <li>
               {!isLoading && (
                  <Fragment>
                     <i className='fab fa-black-tie'></i>
                     <span> Professionals</span>
                  </Fragment>
               )}
            </li>
         </Link>
         <Link to={'/dashboard'} className='link'>
            <li>
               {!isLoading && (
                  <Fragment>
                     <i className='fas fa-user'></i>
                     <span> Dashboard</span>
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
            className='link'
         >
            <li>
               {!isLoading && (
                  <Fragment>
                     <i className='fas fa-sign-out-alt'></i>
                     <span> Logout</span>
                  </Fragment>
               )}
            </li>
         </Link>
      </Fragment>
   )
   const guestLink = (
      <Fragment>
         <Link to='/profiles' className='link'>
            <li>
               <i className='fab fa-black-tie'></i>
               <span> Professionals</span>
            </li>
         </Link>
         <Link to='/register' className='link'>
            <li>
               <i className='fas fa-user-plus'></i>
               <span> Register</span>
            </li>
         </Link>
         <Link to='/' className='link'>
            <li>
               <i className='fas fa-sign-in-alt'></i>
               <span> Login</span>
            </li>
         </Link>
      </Fragment>
   )
   return (
      <nav className='navbar'>
         <Link to={isAuthenticated ? '/dashboard' : '/'} className='logo'>
            <h1>
               <i className='fas fa-hat-wizard'></i> CodeC
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
