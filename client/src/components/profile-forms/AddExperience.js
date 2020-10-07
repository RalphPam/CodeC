import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addExperience } from '../../redux/actions/profile'

const AddExperience = ({ addExperience, history }) => {
   const [userData, setUserData] = useState({
      title: '',
      company: '',
      location: '',
      from: '',
      current: false,
      to: '',
      description: '',
   })
   const { title, company, location, from, current, to, description } = userData
   const onChangeHandler = (e) =>
      setUserData({ ...userData, [e.target.name]: e.target.value })
   const submitHandler = (e) => {
      e.preventDefault()
      addExperience({ ...userData }, history)
   }
   return (
      <div>
         <h1 className='header'>Add An Experience</h1>
         <p className='header-label'>
            <i className='fas fa-code-branch'></i> Add any developer/programming
            positions that you have had in the past
         </p>
         <form className='form' onSubmit={(e) => submitHandler(e)}>
            <div className='form-group'>
               <input
                  className='input-form'
                  type='text'
                  placeholder='Job Title (Required)'
                  name='title'
                  required
                  value={title}
                  onChange={(e) => onChangeHandler(e)}
               />
            </div>
            <div className='form-group'>
               <input
                  className='input-form'
                  type='text'
                  placeholder='Company (Required)'
                  name='company'
                  required
                  value={company}
                  onChange={(e) => onChangeHandler(e)}
               />
            </div>
            <div className='form-group'>
               <input
                  className='input-form'
                  type='text'
                  placeholder='Location'
                  name='location'
                  value={location}
                  onChange={(e) => onChangeHandler(e)}
               />
            </div>
            <div className='form-group'>
               <h4>From Date</h4>
               <input
                  className='input-form'
                  type='date'
                  name='from'
                  value={from}
                  onChange={(e) => onChangeHandler(e)}
               />
            </div>
            <div className='form-group'>
               <p>
                  <input
                     className='input-form'
                     type='checkbox'
                     name='current'
                     value={current}
                     checked={current}
                     onChange={() =>
                        setUserData({ ...userData, current: !current })
                     }
                  />{' '}
                  Current Job
               </p>
            </div>
            <div className='form-group'>
               <h4>To Date</h4>
               <input
                  className='input-form'
                  type='date'
                  name='to'
                  value={to}
                  onChange={(e) => onChangeHandler(e)}
                  disabled={current}
               />
            </div>
            <div className='form-group'>
               <textarea
                  className='textarea'
                  name='description'
                  placeholder='Job Description'
                  value={description}
                  onChange={(e) => onChangeHandler(e)}
               ></textarea>
            </div>
            <div className='submit-container'>
               <Link className='back' to='/dashboard'>
                  <i className='fas fa-backward'></i>
               </Link>
               <input className='submit-btn' type='submit' value='Save' />
            </div>
         </form>
      </div>
   )
}

AddExperience.propTypes = {
   addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience))
