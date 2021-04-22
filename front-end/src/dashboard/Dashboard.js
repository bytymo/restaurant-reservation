import React, { useEffect, useState } from 'react'
import DashButtons from './DashButtons'
import ErrorAlert from '../layout/ErrorAlert'
import { listReservations, listTables } from '../utils/api'
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

  useEffect(loadDashboard, [date])

  function loadDashboard() {
    const abortController = new AbortController()
    setReservationsError(null)
    setTablesError(null)
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
        {reservations.length === 0 && (
          <h5>There are no reservations for {date}</h5>
        )}

        {reservations.map((reservation) => (
          <ReservationList
            key={reservation.reservation_id}
            reservation={reservation}
          />
        ))}

        <hr />

        <h3 className='mt-3'>Tables:</h3>
        {tables.map((table) => (
          <TableList key={table.table_id} table={table} />
        ))}
      </div>
    </main>
  )
}

export default Dashboard
