import {
   REGISTER_SUCCESS,
   REGISTER_FAILED,
   USER_LOADED,
   AUTH_ERROR,
   LOGIN_SUCCESS,
   LOGIN_FAILED,
} from '../actions/types'

const initialState = {
   token: localStorage.getItem('token'),
   isAuthenticated: null,
   isLoading: true,
   user: null,
}

export const registerReducer = (state = initialState, action) => {
   const { type, payload } = action
   switch (type) {
      case USER_LOADED:
         return {
            ...state,
            isAuthenticated: true,
            isLoading: false,
            user: payload,
         }
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
         localStorage.setItem('token', payload.token)
         return {
            ...state,
            ...payload,
            isAuthenticated: true,
            isLoading: false,
         }
      case LOGIN_FAILED:
      case AUTH_ERROR:
      case REGISTER_FAILED:
         localStorage.removeItem('token')
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            isLoading: false,
         }
      default:
         return state
   }
}
