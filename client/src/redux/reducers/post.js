import {
   GET_POSTS,
   POSTS_ERROR,
   POSTS_UPDATE,
   DELETE_POST,
   ADD_POST,
   CLEAR_POSTS,
   GET_POST,
   UPDATE_COMMENT,
} from '../actions/types'

const initialState = {
   AllPosts: [],
   post: null,
   isLoading: true,
   error: {},
}

export const post = (state = initialState, action) => {
   const { type, payload } = action
   switch (type) {
      case GET_POSTS:
         return {
            ...state,
            AllPosts: payload,
            isLoading: false,
         }
      case GET_POST:
         return {
            ...state,
            post: payload,
            isLoading: false,
         }
      case POSTS_ERROR:
         return {
            ...state,
            error: payload,
            isLoading: false,
         }
      case POSTS_UPDATE:
         return {
            ...state,
            AllPosts: state.AllPosts.map((post) =>
               post._id === payload.id
                  ? { ...post, likes: payload.likes }
                  : post
            ),
            isLoading: false,
         }
      case UPDATE_COMMENT:
         return {
            ...state,
            post: { ...state.post, comments: payload },
            isLoading: false,
         }
      case ADD_POST:
         return {
            ...state,
            AllPosts: [payload, ...state.AllPosts],
            isLoading: false,
         }
      case DELETE_POST:
         return {
            ...state,
            AllPosts: state.AllPosts.filter((post) => post._id !== payload.id),
            isLoading: false,
         }
      case CLEAR_POSTS:
         return {
            ...state,
            AllPosts: [],
            isLoading: true,
         }
      default:
         return state
   }
}
