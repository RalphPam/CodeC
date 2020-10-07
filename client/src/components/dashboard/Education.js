import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../redux/actions/profile'

const Education = ({ education, deleteEducation }) => {
   const educations = education.map((educ) => (
      <tr key={educ._id}>
         <td className='table-element'>{educ.school}</td>
         <td className='table-element'>{educ.degree}</td>
         <td className='table-element'>
            <Moment format='MM/DD/YYYY'>{educ.from}</Moment> -{' '}
            {educ.to === null ? (
               'Current'
            ) : (
               <Moment format='MM/DD/YYYY'>{educ.to}</Moment>
            )}
         </td>
         <td className='table-element'>
            <button
               className='trashcan'
               onClick={() => deleteEducation(educ._id)}
            >
               <i className='fas fa-trash-alt'></i>
            </button>
         </td>
      </tr>
   ))

   if (education.length < 1) return null

   return (
      <div className='table'>
         <h1 className='table-title'>Education</h1>
         <table>
            <thead>
               <tr>
                  <th className='table-element'>School</th>
                  <th className='table-element'>Degree</th>
                  <th className='table-element'>Years</th>
                  <th className='table-element'></th>
               </tr>
            </thead>
            <tbody>{educations}</tbody>
         </table>
      </div>
   )
}

Education.propTypes = {
   education: PropTypes.array.isRequired,
   deleteEducation: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
   education: state.profile.profile.education,
})

export default connect(mapStateToProps, { deleteEducation })(Education)
