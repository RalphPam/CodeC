import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

const Comment = ({
   comment: { user, avatar, text, name, date, _id },
   isAuthenticated,
   postId,
   deleteComment,
   user_id,
}) => {
   return (
      <div className='post'>
         <div className='post-top'>
            <Link className='post-link' to={`/profile/${user}`}>
               <div>
                  <img className='post-avatar' src={avatar} alt='User Avatar' />
               </div>
               <h3 className='post-name'>{name}</h3>
            </Link>
            {isAuthenticated && user_id === user && (
               <button
                  className='post-btn-del'
                  onClick={() => deleteComment(postId, _id)}
               >
                  <i className='fas fa-trash-alt'></i>
               </button>
            )}
         </div>
         <p className='post-text'>{text}</p>
         <div>
            <Moment format='LT'>{date}</Moment> &middot;{' '}
            <Moment format='MM/DD/YYYY'>{date}</Moment>
         </div>
      </div>
   )
}

Comment.propTypes = {
   comment: PropTypes.object.isRequired,
   isAuthenticated: PropTypes.bool.isRequired,
   postId: PropTypes.string.isRequired,
   user_id: PropTypes.string.isRequired,
   deleteComment: PropTypes.func.isRequired,
}

export default Comment
