import axios from 'axios'
import {
   GET_PROFILE,
   FAIL2GET_PROFILE,
   CLR_PROFILE,
   CREATE_PROFILE,
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
      dispatch(
         setAlert(
            `Profile successfully ${edit ? 'updated' : 'created'}`,
            'success'
         )
      )
      if (!edit) {
         history.push('/dashboard')
      }
   } catch (err) {
      const errors = err.response.data.errors
      if (errors)
         errors.forEach((error) => dispatch(setAlert(error.msg, 'fail')))
   }
}
