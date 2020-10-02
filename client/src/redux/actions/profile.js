import axios from 'axios'
import { GET_PROFILE, FAIL2GET_PROFILE, CLR_PROFILE } from './types'

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
