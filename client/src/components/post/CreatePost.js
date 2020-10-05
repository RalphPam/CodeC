import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreatePost = ({ addPost, isDiscussion, id, addComment }) => {
   const [userData, setUserData] = useState({
      text: '',
   })
   const submitHandler = (e) => {
      e.preventDefault()
      if (isDiscussion) {
         addComment(userData, id)
      } else {
         addPost(userData)
      }
      setUserData({ text: '' })
   }
   return (
      <form onSubmit={submitHandler}>
         <input
            type='text'
            required
            placeholder={
               isDiscussion ? 'Leave a comment...' : 'Post something...'
            }
            value={userData.text}
            onChange={(e) => setUserData({ text: e.target.value })}
         />
         <input type='submit' value={isDiscussion ? 'Comment' : 'Post'} />
      </form>
   )
}

CreatePost.propTypes = {
   addPost: PropTypes.func,
   isDiscussion: PropTypes.bool.isRequired,
   id: PropTypes.string,
   addComment: PropTypes.func,
}

export default CreatePost
