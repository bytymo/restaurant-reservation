import React, { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL as url } from '../utils/api'

const ReservationList = ({ reservation }) => {
  const history = useHistory()
  const {
    reservation_id,
    first_name,
    last_name,
    people,
    reservation_time,
    status,
  } = reservation

  const cancelReservation = () => {
    window.confirm(
      'Do you want to cancel this reservation? This cannot be undone.'
    ) &&
      axios
        .put(`${url}/reservations/${reservation_id}/status`, {
          data: { status: 'cancelled' },
        })
        .then((res) => {
          res.status === 200 && history.push('/')
        })
  }

  return (
    <div className='card mt-3 h-100'>
      <div className='card-header d-flex align-items-center'>
        <h4 className='my-0'>
          {reservation_time.slice(0, 5)} - {last_name}, {first_name}
        </h4>
        <p className='ml-auto my-0'>
          Party: <span className='badge badge-secondary'>{people}</span>
        </p>
      </div>
      <div className='card-body d-flex align-items-center'>
        <h5 data-reservation-id-status={reservation_id} className='my-0'>
          Status: {status.toUpperCase()}
        </h5>
        <div className='buttons ml-auto'>
          {status === 'booked' && (
            <Fragment>
              <Link
                to={`/reservations/${reservation_id}/seat`}
                className='btn btn-primary mr-2 seatBtn'
              >
                Seat
              </Link>
              <Link
                to={`/reservations/${reservation_id}/edit`}
                className='btn btn-info mr-2'
              >
                Edit
              </Link>
              <button
                data-reservation-id-cancel={reservation_id}
                onClick={cancelReservation}
                className='btn btn-secondary'
              >
                Cancel
              </button>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReservationList
