import React, { useEffect, useState } from 'react'
import DashButtons from './DashButtons'
import ErrorAlert from '../layout/ErrorAlert'
import { API_BASE_URL as url, listReservations, listTables } from '../utils/api'
import ReservationList from '../reservations/ReservationList'
import TableList from '../tables/TableList'

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null)
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)

  useEffect(
    loadDashboard,
    // eslint-disable-next-line
    [date]
  )

  function loadDashboard() {
    const abortController = new AbortController()
    setReservationsError(null)
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
    listTables().then(setTables).catch(setTablesError)
    return () => abortController.abort()
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className='d-md-flex mb-5'>
        <h4 className='mb-0'>Reservations for {date}</h4>
      </div>
      <div className='col-lg-10 w-100'>
        <DashButtons date={date} setDate={setDate} />
        <ErrorAlert error={reservationsError} />
        <ErrorAlert error={tablesError} />

        <h3 className='mt-3'>Reservations:</h3>
        {reservations.length ? (
          reservations.map((reservation, index) => (
            <ReservationList url={url} reservation={reservation} key={index} />
          ))
        ) : (
          <h5>There are no reservations for {date}</h5>
        )}

        <hr />

        <h3 className='mt-3'>Tables</h3>
        {tables ? (
          tables.map((table, index) => (
            <TableList url={url} table={table} key={index} />
          ))
        ) : (
          <h3>There are no tables currently available</h3>
        )}
      </div>
    </main>
  )
}

export default Dashboard
