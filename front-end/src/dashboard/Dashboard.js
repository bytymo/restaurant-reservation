import React, { useEffect, useState } from 'react'
import DashButtons from './DashButtons'
import ErrorAlert from '../layout/ErrorAlert'
import { listReservations } from '../utils/api'
import ReservationList from '../reservations/ReservationList'

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null)

  useEffect(loadDashboard, [date])

  function loadDashboard() {
    const abortController = new AbortController()
    setReservationsError(null)
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
    return () => abortController.abort()
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className='d-md-flex mb-3'>
        <h4 className='mb-0'>Reservations for {date}</h4>
      </div>
      <div className='col-lg-10 w-100'>
        <DashButtons date={date} setDate={setDate} />
        <ErrorAlert error={reservationsError} />
        {reservations ? (
          reservations.map((reservation, index) => (
            <ReservationList reservation={reservation} key={index} />
          ))
        ) : (
          <h3>There are no reservations for {date}</h3>
        )}
      </div>
    </main>
  )
}

export default Dashboard
