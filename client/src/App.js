import React, { Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar } from './components/layout/Navbar'
import { Show } from './components/layout/Show'
import { Login } from './components/auth/Login'
import { Register } from './components/auth/Register'
import './App.css'

export const App = () => {
   return (
      <Router>
         <Fragment>
            <Navbar />
            <Switch>
               <Route exact path='/' component={Show} />
               <Route exact path='/register' component={Register} />
               <Route exact path='/login' component={Login} />
            </Switch>
         </Fragment>
      </Router>
   )
}
