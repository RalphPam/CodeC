import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { login } from '../../redux/actions/auth'

const Login = ({ login, isAuthenticated }) => {
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

   if (isAuthenticated) {
      return <Redirect to='/dashboard' />
   }

   return (
      <Fragment>
         <form onSubmit={(e) => submitHandler(e)}>
            <input
               type='email'
               placeholder='Email Address'
               name='email'
               value={email}
               required
               onChange={(e) => handler(e)}
            />
            <input
               type='password'
               placeholder='Password'
               name='password'
               value={password}
               required
               onChange={(e) => handler(e)}
            />
            <input type='submit' value='Log In' />
         </form>
         <p>
            Don't have an account? <Link to='/login'>Sign Up</Link>
         </p>
      </Fragment>
   )
}

Login.propTypes = {
   login: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login)