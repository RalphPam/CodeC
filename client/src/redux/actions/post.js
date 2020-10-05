import {
   GET_POSTS,
   POSTS_ERROR,
   POSTS_UPDATE,
   DELETE_POST,
   ADD_POST,
   CLEAR_POSTS,
   GET_POST,
   UPDATE_COMMENT,
} from './types'
import axios from 'axios'
import { setAlert } from './alert'

export const getAllPosts = () => async (dispatch) => {
   try {
      const res = await axios.get('/api/posts')
      dispatch({
         type: GET_POSTS,
         payload: res.data,
      })
   } catch (err) {
      dispatch({
         type: POSTS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      })
   }
}

export const likePost = (id) => async (dispatch) => {
   try {
      const res = await axios.put(`/api/posts/like/${id}`)
      dispatch({
         type: POSTS_UPDATE,
         payload: { id, likes: res.data },
      })
   } catch (err) {
      dispatch({
         type: POSTS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      })
   }
}

export const unlikePost = (id) => async (dispatch) => {
   try {
      const res = await axios.put(`/api/posts/unlike/${id}`)
      dispatch({
         type: POSTS_UPDATE,
         payload: { id, likes: res.data },
      })
   } catch (err) {
      dispatch({
         type: POSTS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      })
   }
}

export const deletePost = (id) => async (dispatch) => {
   try {
      const res = await axios.delete(`/api/posts/${id}`)
      dispatch({
         type: DELETE_POST,
         payload: { id },
      })
      dispatch(setAlert(res.data.msg, 'success'))
   } catch (err) {
      dispatch({
         type: POSTS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      })
   }
}

export const addPost = (userData) => async (dispatch) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   }
   try {
      const res = await axios.post('/api/posts', userData, config)
      dispatch({
         type: ADD_POST,
         payload: res.data,
      })
      dispatch(setAlert('Post Added', 'success'))
   } catch (err) {
      dispatch({
         type: POSTS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      })
   }
}

export const clearPosts = () => (dispatch) => {
   dispatch({ type: CLEAR_POSTS })
}

export const getPost = (id) => async (dispatch) => {
   try {
      const res = await axios.get(`/api/posts/${id}`)
      dispatch({
         type: GET_POST,
         payload: res.data,
      })
   } catch (err) {
      dispatch({
         type: POSTS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      })
   }
}

export const addComment = (userData, id) => async (dispatch) => {
   const config = {
      headers: {
         'Content-Type': 'application/json',
      },
   }
   try {
      const res = await axios.put(`/api/posts/comment/${id}`, userData, config)
      dispatch({
         type: UPDATE_COMMENT,
         payload: res.data,
      })
      dispatch(setAlert('Comment Added', 'success'))
   } catch (err) {
      dispatch({
         type: POSTS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      })
   }
}

export const deleteComment = (postId, commentId) => async (dispatch) => {
   try {
      const res = await axios.put(`/api/posts/comment/${postId}/${commentId}`)
      dispatch({
         type: UPDATE_COMMENT,
         payload: res.data,
      })
      dispatch(setAlert('Comment Removed', 'success'))
   } catch (err) {
      dispatch({
         type: POSTS_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status },
      })
   }
}
