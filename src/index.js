import React from 'react'
import { render } from 'react-dom'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import App from './pages/App'
import CityWeatherDetails from './pages/CityWeatherDetails'
import Notfound from './pages/NotFound'
import './index.scss'

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/city/:id" component={CityWeatherDetails} />
      <Route component={Notfound} />
    </Switch>
  </Router>
)

render(routing, document.getElementById('root'))
