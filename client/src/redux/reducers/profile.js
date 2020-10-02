import { GET_PROFILE, FAIL2GET_PROFILE, CLR_PROFILE } from '../actions/types'

const initialState = {
   profile: null,
   profiles: [],
   repos: [],
   isLoading: true,
   error: {},
}

export const profile = (state = initialState, action) => {
   const { type, payload } = action
   switch (type) {
      case GET_PROFILE:
         return {
            ...state,
            profile: payload,
            isLoading: false,
         }
      case FAIL2GET_PROFILE:
         return {
            ...state,
            error: payload,
            isLoading: false,
         }
      case CLR_PROFILE:
         return {
            ...state,
            profile: null,
            repos: [],
            isLoading: true,
         }
      default:
         return state
   }
}
