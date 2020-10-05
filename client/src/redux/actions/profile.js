import axios from 'axios'
import {
   GET_PROFILE,
   FAIL2GET_PROFILE,
   CLR_PROFILE,
   CREATE_PROFILE,
   UPDATE_PROFILE,
   AUTH_ERROR,
   GET_ALL_PROFILES,
   GET_REPOS,
} from './types'
import { setAlert } from './alert'

export const getCurrentProfile = () => async (dispatch) => {
   try {
      const res = await axios.get('/api/profile/me')
      dispatch({
         type: GET_PROFILE,
         payload: res.data,
      })
   } catch (err) {
      dispatch({
         type: FAIL2GET_PROFILE,
         payload: { msg: err.response.statusText, status: err.response.status },
      })
   }
}

export const getAllProfiles = () => async (dispatch) => {
   try {
      const res = await axios.get('/api/profile')
      dispatch({
         type: GET_ALL_PROFILES,
         payload: res.data,
      })
   } catch (err) {
      dispatch({
         type: FAIL2GET_PROFILE,
         payload: { msg: err.response.statusText, status: err.response.status },
      })
   }
}

export const getUserProfile = (userId) => async (dispatch) => {
   try {
      dispatch({ type: CLR_PROFILE })
      const res = await axios.get(`/api/profile/user/${userId}`)
      dispatch({
         type: GET_PROFILE,
         payload: res.data,
      })
      if (res.data.githubusername) {
         const repos = await axios.get(
            `/api/profile/github/${res.data.githubusername}`
         )
         dispatch({
            type: GET_REPOS,
            payload: repos.data,
         })
      }
   } catch (err) {
      dispatch({
         type: FAIL2GET_PROFILE,
         payload: { msg: err.response.statusText, status: err.response.status },
      })
   }
}

export const clrProfile = () => (dispatch) => {
   dispatch({
      type: CLR_PROFILE,
   })
}

export const createProfile = (userData, history, edit) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      }
      const body = JSON.stringify({ ...userData })
      const res = await axios.post('/api/profile', body, config)
      dispatch({
         type: CREATE_PROFILE,
         payload: res.data,
      })
      edit && dispatch(setAlert('Profile successfully updated', 'success'))

      if (!edit && history !== null) {
         history.push('/dashboard')
      }
   } catch (err) {
      const errors = err.response.data.errors
      if (errors)
         errors.forEach((error) => dispatch(setAlert(error.msg, 'fail')))
   }
}

export const addExperience = (userData, history) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      }
      const body = JSON.stringify({ ...userData })
      const res = await axios.put('/api/profile/experience', body, config)
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      })
      dispatch(setAlert('Experience successfully added', 'success'))
      history.push('/dashboard')
   } catch (err) {
      const errors = err.response.data.errors
      if (errors)
         errors.forEach((error) => dispatch(setAlert(error.msg, 'fail')))
   }
}

export const addEducation = (userData, history) => async (dispatch) => {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
         },
      }
      const body = JSON.stringify({ ...userData })
      const res = await axios.put('/api/profile/education', body, config)
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      })
      dispatch(setAlert('Education successfully added', 'success'))
      history.push('/dashboard')
   } catch (err) {
      const errors = err.response.data.errors
      if (errors)
         errors.forEach((error) => dispatch(setAlert(error.msg, 'fail')))
   }
}

export const deleteExperience = (id) => async (dispatch) => {
   try {
      const res = await axios.delete(`/api/profile/experience/${id}`)
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      })
      dispatch(setAlert('Experience Successfully Removed', 'success'))
   } catch (err) {
      dispatch({
         type: FAIL2GET_PROFILE,
         payload: { msg: err.response.statusText, status: err.response.status },
      })
   }
}

export const deleteEducation = (id) => async (dispatch) => {
   try {
      const res = await axios.delete(`/api/profile/education/${id}`)
      dispatch({
         type: UPDATE_PROFILE,
         payload: res.data,
      })
      dispatch(setAlert('Education Successfully Removed', 'success'))
   } catch (err) {
      dispatch({
         type: FAIL2GET_PROFILE,
         payload: { msg: err.response.statusText, status: err.response.status },
      })
   }
}

export const deleteAccount = () => async (dispatch) => {
   if (window.confirm('Are you sure? This can NOT be undone!')) {
      try {
         const res = await axios.delete('/api/profile')
         dispatch({ type: CLR_PROFILE })
         dispatch({ type: AUTH_ERROR })
         dispatch(setAlert(res.data.msg, 'success'))
      } catch (err) {
         dispatch({
            type: FAIL2GET_PROFILE,
            payload: {
               msg: err.response.statusText,
               status: err.response.status,
            },
         })
      }
   }
}
