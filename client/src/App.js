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
import AddExperience from './components/profile-forms/AddExperience'
import AddEducation from './components/profile-forms/AddEducation'
import AllProfiles from './components/AllProfiles/AllProfiles'
import UserProfile from './components/Profile/UserProfile'
import Post from './components/post/Post'
import SinglePost from './components/post/SinglePost'
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
               <section className='main'>
                  <Switch>
                     <Route exact path='/' component={Login} />
                     <Route exact path='/register' component={Register} />
                     <PrivateRoute
                        exact
                        path='/dashboard'
                        component={Dashboard}
                     />
                     <Route exact path='/profiles' component={AllProfiles} />
                     <Route exact path='/profile/:id' component={UserProfile} />
                     <PrivateRoute exact path='/posts' component={Post} />
                     <PrivateRoute
                        exact
                        path='/post/:id'
                        component={SinglePost}
                     />
                     <PrivateRoute
                        exact
                        path='/create-profile'
                        component={CreateProfile}
                     />
                     <PrivateRoute
                        exact
                        path='/add-experience'
                        component={AddExperience}
                     />
                     <PrivateRoute
                        exact
                        path='/add-education'
                        component={AddEducation}
                     />
                     <Route path='*' component={NotFound} />
                  </Switch>
               </section>
            </Fragment>
         </Router>
      </Provider>
   )
}
