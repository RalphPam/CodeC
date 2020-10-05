import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteEducation } from '../../redux/actions/profile'

const Education = ({ education, deleteEducation }) => {
   const educations = education.map((educ) => (
      <tr key={educ._id}>
         <td>{educ.school}</td>
         <td>{educ.degree}</td>
         <td>
            <Moment format='MM/DD/YYYY'>{educ.from}</Moment> -{' '}
            {educ.to === null ? (
               'Current'
            ) : (
               <Moment format='MM/DD/YYYY'>{educ.to}</Moment>
            )}
         </td>
         <td>
            <button onClick={() => deleteEducation(educ._id)}>
               <i className='fas fa-trash-alt'></i>
            </button>
         </td>
      </tr>
   ))

   if (education.length < 1) return null

   return (
      <div>
         <table>
            <thead>
               <tr>
                  <th>School</th>
                  <th>Degree</th>
                  <th>Years</th>
                  <th></th>
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
