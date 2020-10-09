import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteExperience } from '../../redux/actions/profile'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const Experience = ({ experience, deleteExperience }) => {
   const experiences = experience.map((exp) => (
      <tr key={exp._id}>
         <td className='table-element'>{exp.company}</td>
         <td className='table-element'>{exp.title}</td>
         <td className='table-element'>
            <Moment format='MM/DD/YYYY'>{exp.from}</Moment> -{' '}
            {exp.to === null ? (
               'Current'
            ) : (
               <Moment format='MM/DD/YYYY'>{exp.to}</Moment>
            )}
         </td>
         <td className='table-element'>
            <button
               className='trashcan'
               onClick={() => deleteExperience(exp._id)}
            >
               <FontAwesomeIcon icon={faTrashAlt} />
            </button>
         </td>
      </tr>
   ))

   if (experience.length < 1) return null

   return (
      <div>
         <h1 className='table-title'>Experience</h1>
         <table className='table'>
            <thead>
               <tr>
                  <th className='table-element'>Company</th>
                  <th className='table-element'>Title</th>
                  <th className='table-element'>Years</th>
                  <th className='table-element'></th>
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
