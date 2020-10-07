import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'

import { connect } from 'react-redux'
import { login } from '../../redux/actions/auth'

const Login = ({ login, isAuthenticated, isLoading }) => {
   const [userData, setUserData] = useState({
      email: '',
      password: '',
   })

   const { email, password } = userData

   const handler = (e) =>
      setUserData({ ...userData, [e.target.name]: e.target.value })

   const submitHandler = async (e) => {
      e.preventDefault()
      login({ email, password })
   }

   if (isLoading) return <Spinner />
   else if (isAuthenticated) {
      return <Redirect to='/dashboard' />
   } else {
      return (
         <div className='login-page'>
            <div className='login-img'>
               <img
                  src='https://i.ibb.co/N2T7x6k/Group-7.png'
                  alt='background'
               />
            </div>
            <div className='login-form'>
               <p className='already'>
                  Don't have an account?{' '}
                  <Link to='/register' className='sign-up'>
                     Sign Up
                  </Link>
               </p>
               <form onSubmit={(e) => submitHandler(e)}>
                  <input
                     className='login'
                     type='email'
                     placeholder='Email'
                     name='email'
                     value={email}
                     required
                     onChange={(e) => handler(e)}
                  />
                  <input
                     className='login'
                     type='password'
                     placeholder='Password'
                     name='password'
                     value={password}
                     required
                     onChange={(e) => handler(e)}
                  />
                  <input className='login-btn' type='submit' value='Log In' />
               </form>
            </div>
         </div>
      )
   }
}

Login.propTypes = {
   login: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool.isRequired,
   isLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
   isLoading: state.auth.isLoading,
})

export default connect(mapStateToProps, { login })(Login)
