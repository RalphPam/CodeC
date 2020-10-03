import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { addEducation } from '../../redux/actions/profile'

const AddEducation = ({ addEducation, history }) => {
   const [userData, setUserData] = useState({
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      current: false,
      to: '',
      description: '',
   })
   const {
      school,
      degree,
      fieldofstudy,
      from,
      current,
      to,
      description,
   } = userData
   const onChangeHandler = (e) =>
      setUserData({ ...userData, [e.target.name]: e.target.value })
   const submitHandler = (e) => {
      e.preventDefault()
      addEducation({ ...userData }, history)
   }
   return (
      <Fragment>
         <h1>Add Education</h1>
         <p>
            <i className='fas fa-graduation-cap'></i> Add any school or bootcamp
            that you have attended
         </p>
         <form className='form' onSubmit={(e) => submitHandler(e)}>
            <div className='form-group'>
               <input
                  type='text'
                  placeholder='School or Bootcamp (Required)'
                  name='school'
                  required
                  value={school}
                  onChange={(e) => onChangeHandler(e)}
               />
            </div>
            <div className='form-group'>
               <input
                  type='text'
                  placeholder='Degree or Certificate (Required)'
                  name='degree'
                  required
                  value={degree}
                  onChange={(e) => onChangeHandler(e)}
               />
            </div>
            <div className='form-group'>
               <input
                  type='text'
                  placeholder='Field of Study'
                  name='fieldofstudy'
                  value={fieldofstudy}
                  onChange={(e) => onChangeHandler(e)}
               />
            </div>
            <div className='form-group'>
               <h4>From Date</h4>
               <input
                  type='date'
                  name='from'
                  value={from}
                  onChange={(e) => onChangeHandler(e)}
               />
            </div>
            <div className='form-group'>
               <p>
                  <input
                     type='checkbox'
                     name='current'
                     value={current}
                     checked={current}
                     onChange={() =>
                        setUserData({ ...userData, current: !current })
                     }
                  />{' '}
                  Current
               </p>
            </div>
            <div className='form-group'>
               <h4>To Date</h4>
               <input
                  type='date'
                  name='to'
                  value={to}
                  onChange={(e) => onChangeHandler(e)}
                  disabled={current}
               />
            </div>
            <div className='form-group'>
               <textarea
                  name='description'
                  placeholder='Program Description'
                  value={description}
                  onChange={(e) => onChangeHandler(e)}
               ></textarea>
            </div>
            <input type='submit' value='Save' />
            <Link to='/dashboard'>Go Back</Link>
         </form>
      </Fragment>
   )
}

AddEducation.propTypes = {
   addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation))
