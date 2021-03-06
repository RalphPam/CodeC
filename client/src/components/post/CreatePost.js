import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'

const socket = io()

const CreatePost = ({ addPost, isDiscussion, id, addComment, getAllPosts, getPost, postId }) => {
   const [userData, setUserData] = useState({
      text: '',
   })

   useEffect(() => {
      socket.on('Post status', status => {
         getAllPosts()
      })
      socket.on('Comment status', status => {
         postId && getPost(postId)
      })
   }, [getAllPosts, getPost, postId])

   const submitHandler = (e) => {
      e.preventDefault()
      if (isDiscussion) {
         addComment(userData, id)
         socket.emit('comment', 'Comment Update')
      } else {
         addPost(userData)
         socket.emit('post', 'Post Update')
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
   postId: PropTypes.string,
   addComment: PropTypes.func,
   getAllPosts: PropTypes.func.isRequired,
   getPost: PropTypes.func.isRequired,
}

export default CreatePost
