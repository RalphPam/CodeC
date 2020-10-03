import {
   GET_PROFILE,
   FAIL2GET_PROFILE,
   CLR_PROFILE,
   CREATE_PROFILE,
   UPDATE_PROFILE,
   GET_ALL_PROFILES,
   GET_REPOS,
} from '../actions/types'

const initialState = {
   profile: null,
   profiles: [],
   repos: [],
   isLoading: true,
   isAllProfilesLoading: true,
   error: {},
}

export const profile = (state = initialState, action) => {
   const { type, payload } = action
   switch (type) {
      case UPDATE_PROFILE:
      case CREATE_PROFILE:
      case GET_PROFILE:
         return {
            ...state,
            profile: payload,
            isLoading: false,
         }
      case GET_ALL_PROFILES:
         return {
            ...state,
            profiles: payload,
            isAllProfilesLoading: false,
         }
      case GET_REPOS:
         return {
            ...state,
            repos: payload,
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
