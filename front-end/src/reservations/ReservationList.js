import React from 'react'
import { Link } from 'react-router-dom'

const ReservationList = ({ reservation }) => {
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
        <button type='button' className='btn btn-light float-right' disabled>
          Party: <span className='badge badge-secondary'>{people}</span>
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
}

export default ReservationList
