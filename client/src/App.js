import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Show from './components/layout/Show'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
import './App.css'

import { setAuthToken } from './utils/setAuthToken'
import { Provider } from 'react-redux'
import store from './redux/store'
import { loadUser } from './redux/actions/auth'

if (localStorage.token) {
   setAuthToken(localStorage.token)
}

export const App = () => {
   useEffect(() => {
      store.dispatch(loadUser())
   }, [])
   return (
      <Provider store={store}>
         <Router>
            <Fragment>
               <Navbar />
               <Alert />
               <Switch>
                  <Route exact path='/' component={Show} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
               </Switch>
            </Fragment>
         </Router>
      </Provider>
   )
}
