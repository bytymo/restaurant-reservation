import React, { useState } from 'react'
import ReservationState from '../context/reservation/ReservationState'

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

  return (
    <ReservationState>
      <Switch>
        <Route exact={true} path='/'>
          <Redirect to={'/dashboard'} />
        </Route>
        <Route exact={true} path='/reservations'>
          <Redirect to={'/dashboard'} />
        </Route>
        <Route path='/dashboard/:date'>
          <Dashboard date='2021-04-17' />
        </Route>
        <Route path='/dashboard'>
          <Dashboard date={date} setDate={setDate} />
        </Route>
        <Route path='/reservations/new'>
          <ReservationForm />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </ReservationState>
  )
}

export default Routes
