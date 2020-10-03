import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const Education = ({ education }) => {
   return (
      <div>
         <h2>Education</h2>
         {education.length > 0
            ? education.map((educ, index) => (
                 <div key={index}>
                    {index > 0 ? <hr /> : null}
                    <h3>{educ.school}</h3>
                    <p>
                       <Moment format='MM/DD/YYYY'>{educ.from}</Moment> -{' '}
                       {educ.to === null ? (
                          'Current'
                       ) : (
                          <Moment format='MM/DD/YYYY'>{educ.to}</Moment>
                       )}
                    </p>
                    <p>
                       <strong>Degree:</strong> {educ.degree}
                    </p>
                    {educ.fieldofstudy && (
                       <p>
                          <strong>Field of Study:</strong> {educ.fieldofstudy}
                       </p>
                    )}
                    {educ.description && (
                       <p>
                          <strong>Description:</strong> {educ.description}
                       </p>
                    )}
                 </div>
              ))
            : null}
      </div>
   )
}

Education.propTypes = {
   education: PropTypes.array.isRequired,
}

export default Education
