import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

export const Register = () => {
   const [userData, setUserData] = useState({
      name: '',
      email: '',
      password: '',
      conPassword: '',
   })

   const handler = (e) =>
      setUserData({ ...userData, [e.target.name]: e.target.value })

   const submitHandler = async (e) => {
      e.preventDefault()
      if (password !== conPassword) console.log('Password do no match')
      else {
         console.log('SUCCESS')
      }
   }

   const { name, email, password, conPassword } = userData

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
               minLength='6'
               name='password'
               value={password}
               required
               onChange={(e) => handler(e)}
            />
            <input
               type='password'
               placeholder='Confirm Password'
               minLength='6'
               name='conPassword'
               value={conPassword}
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
