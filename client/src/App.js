import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Show from './components/layout/Show'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/Alert'
import './App.css'

import { Provider } from 'react-redux'
import store from './redux/store'

export const App = () => {
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
