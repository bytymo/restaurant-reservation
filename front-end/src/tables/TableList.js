import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_BASE_URL as url, findReservation } from '../utils/api'

const TableList = ({ table }) => {
  const [reservation, setReservation] = useState([])
  const { table_id, table_name, capacity, reservation_id } = table

  useEffect(() => {
    const abortController = new AbortController()
    reservation_id && findReservation(reservation_id).then(setReservation)
    return () => abortController.abort()
    // eslint-disable-next-line
  }, [])

  let status, name

  if (reservation_id === null) {
    status = 'info'
    name = 'free'
  } else {
    status = 'danger'
    name = 'occupied'
  }

  const finishReservation = (e) => {
    e.preventDefault()

    window.confirm(
      'Is this table ready to seat new guests? This cannot be undone.'
    ) &&
      axios.delete(`${url}/tables/${table_id}/seat`).then((res) => {
        res.status === 200 && window.location.reload()
      })
  }

  return (
    <div className='card mt-3 h-100'>
      <div className='card-header'>
        {' '}
        <div className='float-right' data-table-id-status={table_id}>
          Status:{' '}
          <span className={`badge badge-pill badge-${status}`}>{name}</span>
        </div>
        <h4>{table_name}</h4>
      </div>
      <div className='card-body'>
        {reservation_id && (
          <button
            onClick={finishReservation}
            className='btn btn-danger float-right'
            data-table-id-finish={table_id}
          >
            Finish
          </button>
        )}
        <h5 className='card-title align-self-center'>
          {reservation_id
            ? `Reserved: ${reservation.last_name}, ${reservation.first_name} (${reservation.people})`
            : `Capacity: ${capacity}`}
        </h5>
      </div>
    </div>
  )
}

export default TableList
