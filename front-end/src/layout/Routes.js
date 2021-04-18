import React, { useState } from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from '../dashboard/Dashboard'
import ReservationForm from '../reservations/ReservationForm'
import NotFound from './NotFound'
import { today } from '../utils/date-time'

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [date, setDate] = useState(today())
  const [current, setCurrent] = useState(null)

  return (
    <Switch>
      <Route exact={true} path='/'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact={true} path='/reservations'>
        <Redirect to={'/dashboard'} />
      </Route>
      {/* <Route path='/dashboard/:date'>
        <Dashboard date='2020-12-30' />
      </Route> */}
      <Route path='/dashboard'>
        <Dashboard date={date} setDate={setDate} />
      </Route>
      <Route path='/reservations/new'>
        <ReservationForm current={current} setDate={setDate} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Routes
