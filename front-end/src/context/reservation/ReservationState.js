import React, { useReducer } from 'react'
import axios from 'axios'
import { today } from '../../utils/date-time'

import ReservationContext from './reservationContext'
import reservationReducer from './reservationReducer'
import {
  GET_DATE,
  SET_DATE,
  ADD_RESERVATION,
  GET_RESERVATIONS,
  UPDATE_RESERVATION,
  RESERVATION_ERROR,
} from '../types'

const ReservationState = (props) => {
  const url = process.env.REACT_APP_API_BASE_URL

  const initialState = {
    date: today(),
    reservations: null,
    current: null,
    error: null,
  }

  const [state, dispatch] = useReducer(reservationReducer, initialState)

  // Get Reservations
  const getReservations = async () => {
    try {
      const res = await axios.get(`${url}/reservations`)
      dispatch({ type: GET_RESERVATIONS, payload: res.data })
    } catch (err) {
      dispatch({ type: RESERVATION_ERROR, payload: err /*.response.msg*/ })
    }
  }

  // Add Reservation
  const addReservation = async (reservation) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      // console.log('RES STATE ADD RESERVATION / RESERVATION: ', reservation)
      const res = await axios.post(
        `${url}/reservations`,
        { data: reservation },
        config
      )
      console.log('RES', res)
      console.log('RES DATA', res.data)
      dispatch({ type: ADD_RESERVATION, payload: res.data })
    } catch (err) {
      dispatch({ type: RESERVATION_ERROR, payload: err })
    }
  }

  // Update Reservation
  const updateReservation = async (reservation) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await axios.put(
        `${url}/reservations/${reservation.reservation_id}`,
        reservation,
        config
      )
      dispatch({ type: UPDATE_RESERVATION, payload: res.data })
    } catch (err) {
      dispatch({ type: RESERVATION_ERROR, payload: err /*.response.msg*/ })
    }
  }

  return (
    <ReservationContext.Provider
      value={{
        date: state.date,
        reservations: state.reservations,
        current: state.current,
        error: state.error,
        getReservations,
        addReservation,
        updateReservation,
      }}
    >
      {props.children}
    </ReservationContext.Provider>
  )
}

export default ReservationState
