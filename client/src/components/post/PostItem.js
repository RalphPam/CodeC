import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { likePost, unlikePost, deletePost } from '../../redux/actions/post'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faTrashAlt,
   faHeart,
   faComment,
} from '@fortawesome/free-solid-svg-icons'

const PostItem = ({
   post: { avatar, name, text, date, likes, comments, user, _id },
   isAuthenticated,
   likePost,
   unlikePost,
   deletePost,
   loginId,
   isDiscussion,
}) => {
   useEffect(
      () =>
         likes.findIndex((like) => like.user === loginId) > -1
            ? setLikeToggle(true)
            : setLikeToggle(false),
      [likes, loginId]
   )

   const likeHandler = () => {
      if (likeToggle) {
         unlikePost(_id)
         setLikeToggle(false)
      } else if (likeToggle === false) {
         likePost(_id)
         setLikeToggle(true)
      } else {
      }
   }

   const [likeToggle, setLikeToggle] = useState(null)
   return (
      <div className='post'>
         <div className='post-top'>
            <Link className='post-link' to={`/profile/${user}`}>
               <div>
                  <img className='post-avatar' src={avatar} alt='User Avatar' />
               </div>
               <h3 className='post-name'>{name}</h3>
            </Link>
            {isAuthenticated && user === loginId && (
               <button className='post-btn-del' onClick={() => deletePost(_id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
               </button>
            )}
         </div>
         <p className='post-text'>{text}</p>
         <div className='post-bottom'>
            <div className='post-date'>
               <Moment format='LT'>{date}</Moment> &middot;{' '}
               <Moment format='MM/DD/YYYY'>{date}</Moment>
            </div>
            <div>
               {!isDiscussion && (
                  <div>
                     <button className='heart' onClick={likeHandler}>
                        {likes.length > 0 && likes.length}{' '}
                        <FontAwesomeIcon icon={faHeart} />
                     </button>
                     <Link className='comment' to={`/post/${_id}`}>
                        {comments.length > 0 && comments.length}{' '}
                        <FontAwesomeIcon icon={faComment} />
                     </Link>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

PostItem.propTypes = {
   post: PropTypes.object.isRequired,
   isAuthenticated: PropTypes.bool.isRequired,
   loginId: PropTypes.string.isRequired,
   likePost: PropTypes.func.isRequired,
   unlikePost: PropTypes.func.isRequired,
   deletePost: PropTypes.func.isRequired,
   isDiscussion: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
   isAuthenticated: state.auth.isAuthenticated,
   loginId: state.auth.user._id,
})

export default connect(mapStateToProps, { likePost, unlikePost, deletePost })(
   PostItem
)
