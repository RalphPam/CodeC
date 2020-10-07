import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreatePost = ({ addPost, isDiscussion, id, addComment, getAllPosts }) => {
   const [userData, setUserData] = useState({
      text: '',
   })
   const submitHandler = (e) => {
      e.preventDefault()
      if (isDiscussion) {
         addComment(userData, id)
      } else {
         addPost(userData)
         getAllPosts()
      }
      setUserData({ text: '' })
   }
   return (
      <form className='post-form' onSubmit={submitHandler}>
         <textarea
            className='post-area'
            type='text'
            required
            placeholder={
               isDiscussion ? 'Leave a comment...' : 'Post something...'
            }
            value={userData.text}
            onChange={(e) => setUserData({ text: e.target.value })}
         />
         <input
            className='post-submit'
            type='submit'
            value={isDiscussion ? 'Comment' : 'Post'}
         />
      </form>
   )
}

CreatePost.propTypes = {
   addPost: PropTypes.func,
   isDiscussion: PropTypes.bool.isRequired,
   id: PropTypes.string,
   addComment: PropTypes.func,
   getAllPosts: PropTypes.func.isRequired,
}

export default CreatePost
