import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
   const [userData, setUserData] = useState({
      email: '',
      password: '',
   })

   const handler = (e) =>
      setUserData({ ...userData, [e.target.name]: e.target.value })

   const submitHandler = async (e) => {
      e.preventDefault()
      console.log('SUCCESS')
   }

   const { email, password } = userData

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
