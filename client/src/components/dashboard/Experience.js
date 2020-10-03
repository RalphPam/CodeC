import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from '../../redux/actions/profile'

const Experience = ({ experience, deleteExperience }) => {
   const experiences = experience.map((exp) => (
      <tr key={exp._id}>
         <td>{exp.company}</td>
         <td>{exp.title}</td>
         <td>
            <Moment format='MM/DD/YYYY'>{exp.from}</Moment> -{' '}
            {exp.to === null ? (
               'Current'
            ) : (
               <Moment format='MM/DD/YYYY'>{exp.to}</Moment>
            )}
         </td>
         <td>
            <button onClick={() => deleteExperience(exp._id)}>
               <i className='far fa-trash-alt'></i>
            </button>
         </td>
      </tr>
   ))

   return (
      <div>
         <table>
            <thead>
               <tr>
                  <th>Company</th>
                  <th>Title</th>
                  <th>Years</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>{experiences}</tbody>
         </table>
      </div>
   )
}

Experience.propTypes = {
   experience: PropTypes.array.isRequired,
   deleteExperience: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
   experience: state.profile.profile.experience,
})

export default connect(mapStateToProps, { deleteExperience })(Experience)
