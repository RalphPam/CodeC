import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { setAlert } from '../../redux/actions/alert'
import { register } from '../../redux/actions/auth'

const Register = ({ setAlert, register }) => {
   const [userData, setUserData] = useState({
      name: '',
      email: '',
      password: '',
      conPassword: '',
   })

   const { name, email, password, conPassword } = userData

   const handler = (e) =>
      setUserData({ ...userData, [e.target.name]: e.target.value })

   const submitHandler = async (e) => {
      e.preventDefault()
      if (password !== conPassword) setAlert('Password do not match', 'fail')
      else {
         register({ name, email, password })
      }
   }

   return (
      <Fragment>
         <h1>Sign Up</h1>
         <p>
            <i className='far fa-user'></i>Create account
         </p>
         <form onSubmit={(e) => submitHandler(e)}>
            <input
               type='text'
               placeholder='Name'
               name='name'
               value={name}
               required
               onChange={(e) => handler(e)}
            />
            <input
               type='email'
               placeholder='Email Address'
               name='email'
               value={email}
               required
               onChange={(e) => handler(e)}
            />
            <small>
               This site uses Gravatar so if you want a profile image, use a
               Gravatar email
            </small>
            <input
               type='password'
               placeholder='Password'
               name='password'
               value={password}
               minLength='6'
               required
               onChange={(e) => handler(e)}
            />
            <input
               type='password'
               placeholder='Confirm Password'
               name='conPassword'
               value={conPassword}
               minLength='6'
               required
               onChange={(e) => handler(e)}
            />
            <input type='submit' value='Register' />
         </form>
         <p>
            Already have an account? <Link to='/login'>Sign In</Link>
         </p>
      </Fragment>
   )
}

Register.propTypes = {
   setAlert: PropTypes.func.isRequired,
   register: PropTypes.func.isRequired,
}

export default connect(null, { setAlert, register })(Register)
