import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-forms/CreateProfile'
import NotFound from './components/layout/NotFound'
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
               <section>
                  <Switch>
                     <Route exact path='/' component={Login} />
                     <Route exact path='/register' component={Register} />
                     <PrivateRoute
                        exact
                        path='/dashboard'
                        component={Dashboard}
                     />
                     <PrivateRoute
                        exact
                        path='/create-profile'
                        component={CreateProfile}
                     />
                     <Route path='*' component={NotFound} />
                  </Switch>
               </section>
            </Fragment>
         </Router>
      </Provider>
   )
}
