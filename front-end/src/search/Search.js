import React, { useState } from 'react'
import { listReservations } from '../utils/api'
import ReservationList from '../reservations/ReservationList'

import ErrorAlert from '../layout/ErrorAlert'

const Search = () => {
  const [reservations, setReservations] = useState([])
  const [input, setInput] = useState('')
  const [errors, setErrors] = useState(null)

  // function loadDashboard() {
  //   const abortController = new AbortController()
  //   listReservations({ mobile_number }, abortController.signal)
  //     .then(setReservations)
  //     .catch(setReservationsError)
  //   return () => abortController.abort()
  // }

  const onChange = (e) => setInput(e.target.value)

  const onSubmit = (e) => {
    e.preventDefault()
    const abortController = new AbortController()
    listReservations({ mobile_number: input }, abortController.signal)
      .then(setReservations)
      .catch((err) => {
        setErrors({ message: err.message })
      })
  }

  return (
    <div>
      <h1>Search Reservations</h1>
      <ErrorAlert error={errors} />
      <form className='form-inline' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            name='mobile_number'
            className='form-control'
            onChange={onChange}
          />
          <button className='btn btn-primary' type='submit'>
            Find
          </button>
        </div>
      </form>
      {reservations.length ? (
        reservations.map((reservation, index) => (
          <ReservationList reservation={reservation} key={index} />
        ))
      ) : (
        <h5 className='mt-3'>No reservations found</h5>
      )}
    </div>
  )
}

export default Search
