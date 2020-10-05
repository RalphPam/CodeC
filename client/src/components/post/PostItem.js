import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { likePost, unlikePost, deletePost } from '../../redux/actions/post'
import { Link } from 'react-router-dom'

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
      <div>
         <div>
            <Link to={`/profile/${user}`}>
               <img src={avatar} alt='User Avatar' />
               <h3>{name}</h3>
            </Link>
            {isAuthenticated && user === loginId && (
               <button onClick={() => deletePost(_id)}>
                  <i className='fas fa-trash-alt'></i>
               </button>
            )}
         </div>
         <p>{text}</p>
         <div>
            <Moment format='LT'>{date}</Moment> &middot;{' '}
            <Moment format='L'>{date}</Moment>
         </div>
         {(likes || comments) && (
            <div>
               {comments.length > 0 && (
                  <p>
                     {comments.length} Comment{comments.length > 1 && 's'}
                  </p>
               )}
               {likes.length > 0 && (
                  <p>
                     {likes.length} Like{likes.length > 1 && 's'}
                  </p>
               )}
            </div>
         )}
         {!isDiscussion && (
            <div>
               <button onClick={likeHandler}>
                  <i className='fas fa-heart'></i>
               </button>
               <Link to={`/post/${_id}`}>
                  <i className='fas fa-comment'></i>
               </Link>
            </div>
         )}
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
