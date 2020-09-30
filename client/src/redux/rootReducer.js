import { combineReducers } from 'redux'
import { alertReducer as alert } from './reducers/alert'
import { registerReducer as register } from './reducers/auth'

export default combineReducers({ alert, register })
