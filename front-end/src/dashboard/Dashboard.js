import React, { useEffect, useState } from 'react'
import { listReservations } from '../utils/api'
import ErrorAlert from '../layout/ErrorAlert'
import { Link } from 'react-router-dom'
import { previous, next } from '../utils/date-time'

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null)

  let today = date
  const prevDay = previous(date)
  const nextDay = next(date)

  useEffect(loadDashboard, [date])

  function loadDashboard() {
    const abortController = new AbortController()
    setReservationsError(null)
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
    return () => abortController.abort()
  }

  const changeDate = (e) => {
    date = e
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className='d-md-flex mb-3'>
        <h4 className='mb-0'>Reservations for {date}</h4>
      </div>
      <div className='col-lg-10 w-100'>
        <div className='buttons d-flex justify-content-between ml-0'>
          <button className='btn btn-dark' onClick={() => changeDate(prevDay)}>
            {' '}
            <i className='fas fa-chevron-left' /> Previous
          </button>
          <button className='btn btn-dark' onClick={() => changeDate(today)}>
            Today
          </button>
          <button className='btn btn-dark' onClick={() => changeDate(nextDay)}>
            Next <i className='fas fa-chevron-right' />
          </button>
        </div>
        <ErrorAlert error={reservationsError} />
        {reservations ? (
          reservations.map((reservation) => {
            const {
              reservation_id,
              first_name,
              last_name,
              people,
              reservation_time,
            } = reservation
            return (
              <div key={reservation_id} className='card mt-3 h-100'>
                <div className='card-header'>
                  {' '}
                  <button
                    type='button'
                    className='btn btn-light float-right'
                    disabled
                  >
                    Party:{' '}
                    <span className='badge badge-secondary'>{people}</span>
                  </button>
                  <h4>{reservation_time.slice(0, 5)}</h4>
                </div>
                <div className='card-body'>
                  <Link
                    to={`/reservations/${reservation_id}/seat`}
                    className='btn btn-danger float-right'
                  >
                    Seat
                  </Link>
                  <h5 className='card-title align-self-center'>
                    {last_name}, {first_name}
                  </h5>
                </div>
              </div>
            )
          })
        ) : (
          <h3>There are no reservations for {date}</h3>
        )}
      </div>
    </main>
  )
}

export default Dashboard
