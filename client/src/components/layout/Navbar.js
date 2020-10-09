import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../redux/actions/auth'
import { clrProfile } from '../../redux/actions/profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faBell,
   faUserTie,
   faUser,
   faSignOutAlt,
   faUserPlus,
   faSignInAlt,
   faHatWizard,
} from '@fortawesome/free-solid-svg-icons'

const Navbar = ({ isAuthenticated, isLoading, logout, clrProfile }) => {
   const userLink = (
      <Fragment>
         <Link to={'/posts'} className='link'>
            <li>
               {!isLoading && (
                  <Fragment>
                     <FontAwesomeIcon className='nav-icon' icon={faBell} />
                     <span> Posts</span>
                  </Fragment>
               )}
            </li>
         </Link>
         <Link to={'/profiles'} className='link'>
            <li>
               {!isLoading && (
                  <Fragment>
                     <FontAwesomeIcon className='nav-icon' icon={faUserTie} />
                     <span> Professionals</span>
                  </Fragment>
               )}
            </li>
         </Link>
         <Link to={'/dashboard'} className='link'>
            <li>
               {!isLoading && (
                  <Fragment>
                     <FontAwesomeIcon className='nav-icon' icon={faUser} />
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
                     <FontAwesomeIcon
                        className='nav-icon'
                        icon={faSignOutAlt}
                     />
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
               <FontAwesomeIcon className='nav-icon' icon={faUserTie} />
               <span> Professionals</span>
            </li>
         </Link>
         <Link to='/register' className='link'>
            <li>
               <FontAwesomeIcon className='nav-icon' icon={faUserPlus} />
               <span> Register</span>
            </li>
         </Link>
         <Link to='/' className='link'>
            <li>
               <FontAwesomeIcon className='nav-icon' icon={faSignInAlt} />
               <span> Login</span>
            </li>
         </Link>
      </Fragment>
   )
   return (
      <nav className='navbar'>
         <Link to={isAuthenticated ? '/dashboard' : '/'} className='logo'>
            <h1>
               <FontAwesomeIcon className='logo-icon' icon={faHatWizard} />{' '}
               CodeC
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
