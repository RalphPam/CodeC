import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const Experience = ({ experience }) => {
   return (
      <div className='credentials-exp'>
         <h2 className='header-credential'>Experience</h2>
         {experience.length > 0
            ? experience.map((exp, index) => (
                 <div key={index}>
                    {index > 0 ? <div className='space' /> : null}
                    <h3>{exp.company}</h3>
                    <p>
                       <Moment format='MM/DD/YYYY'>{exp.from}</Moment> -{' '}
                       {exp.to === null ? (
                          'Current'
                       ) : (
                          <Moment format='MM/DD/YYYY'>{exp.to}</Moment>
                       )}
                    </p>
                    <p>
                       <strong>Position:</strong> {exp.title}
                    </p>
                    {exp.description && (
                       <p>
                          <strong>Description:</strong> {exp.description}
                       </p>
                    )}
                 </div>
              ))
            : null}
      </div>
   )
}

Experience.propTypes = {
   experience: PropTypes.array.isRequired,
}

export default Experience
