import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReservationContext from '../context/reservation/reservationContext'

const ReservationForm = () => {
  const history = useHistory()
  const reservationContext = useContext(ReservationContext)
  const { addReservation, updateReservation, current } = reservationContext

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
  }, [reservationContext, current])

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

  const onChange = (e) =>
    setReservation({ ...reservation, [e.target.name]: e.target.value })

  const handleCancel = () => {
    history.goBack()
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { reservation_date } = reservation
    if (current === null) {
      addReservation(reservation)
    } else {
      updateReservation(reservation)
    }
    // console.log(reservation)
    history.push('/dashboard', { date: reservation_date })
  }

  let date = new Date()
  let today = date.toISOString().slice(0, 10)

  return (
    <div>
      <form className='col-lg-10' onSubmit={onSubmit}>
        <h3 className='text-center py-4'>New Reservation</h3>
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
            min={today}
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
            min='10:30'
            max='21:30'
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
            max='12'
            value={people}
            onChange={onChange}
            required
          />
        </div>

        <div className='btns mt-2'>
          <button className='btn btn-primary mr-2' type='submit'>
            Submit
          </button>
          <button onClick={handleCancel} className='btn btn-secondary'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReservationForm
