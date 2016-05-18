import React from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import FrontPageView from 'views/FrontPageView'
import SearchForm from 'forms/SearchForm'

export default (store) => (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={FrontPageView} />
    <Route component={SearchForm} path='/search' />
  </Route>
)
