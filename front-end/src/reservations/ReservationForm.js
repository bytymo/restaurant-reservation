import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useHistory } from 'react-router-dom'
import ErrorAlert from '../layout/ErrorAlert'

const ReservationForm = ({ current, setDate }) => {
  const url = process.env.REACT_APP_API_BASE_URL

  const history = useHistory()
  const [reservationsError, setReservationsError] = useState(null)

  useEffect(() => {
    if (current !== null) {
      setReservation(current)
    } else {
      setReservation({
        first_name: '',
        last_name: '',
        mobile_number: '',
        reservation_date: '',
        reservation_time: '',
        people: 1,
      })
    }
  }, [current])

  const [reservation, setReservation] = useState({
    first_name: '',
    last_name: '',
    mobile_number: '',
    reservation_date: '',
    reservation_time: '',
    people: 1,
  })

  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = reservation

  // Add Reservation
  const addReservation = (reservation) => {
    axios
      .post(`${url}/reservations`, { data: reservation })
      .then((res) =>
        res.status === 201
          ? history.push(`/dashboard?date=${reservation.reservation_date}`)
          : null
      )
      .catch((err) => {
        setReservationsError({ message: err.response.data.error })
      })
  }

  // Update Reservation
  const updateReservation = async (reservation) => {
    axios
      .put(`${url}/reservations/${reservation.reservation_id}`, {
        data: reservation,
      })
      .then((res) =>
        res.status === 201
          ? history.push(`/dashboard?date=${reservation.reservation_date}`)
          : null
      )
      .catch((err) => {
        setReservationsError({ message: err.response.data.error })
      })
  }

  const shortenDate = (date) => {
    return date.toISOString().slice(0, 10)
  }

  const onChange = (e) =>
    setReservation({ ...reservation, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    setReservationsError(null)
    const newRes = {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people: Number(people),
    }

    if (current === null) {
      addReservation(newRes)
    } else {
      updateReservation(newRes)
    }
    setDate(newRes.reservation_date)
  }

  let today = new Date()
  today = shortenDate(today)

  return (
    <div>
      <form className='col-lg-10' onSubmit={onSubmit}>
        <h3 className='text-center py-4'>New Reservation</h3>

        <ErrorAlert error={reservationsError} />
        <div className='form-group'>
          <label htmlFor='first_name'>First Name</label>
          <input
            className='form-control'
            type='text'
            name='first_name'
            placeholder='Enter your first name'
            value={first_name}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='last_name'>Last Name</label>
          <input
            className='form-control'
            type='text'
            name='last_name'
            placeholder='Enter your last name'
            value={last_name}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='mobile_number'>Mobile Number</label>
          <input
            className='form-control'
            type='tel'
            name='mobile_number'
            placeholder='xxx-xxx-xxxx'
            value={mobile_number}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='reservation_date'>Reservation Date</label>
          <input
            className='form-control'
            type='date'
            name='reservation_date'
            id='reservation_date'
            value={reservation_date}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='reservation_time'>Time</label>
          <input
            className='form-control'
            type='time'
            name='reservation_time'
            id='reservation_time'
            value={reservation_time}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='people'>Party Size</label>
          <input
            className='form-control'
            type='number'
            name='people'
            id='people'
            min='1'
            value={people}
            onChange={onChange}
            required
          />
        </div>

        <div className='btns mt-2'>
          <button className='btn btn-primary mr-2' type='submit'>
            Submit
          </button>

          <button
            onClick={() => history.goBack()}
            className='btn btn-secondary'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReservationForm
