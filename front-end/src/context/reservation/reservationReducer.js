import {
  GET_DATE,
  SET_DATE,
  ADD_RESERVATION,
  GET_RESERVATIONS,
  UPDATE_RESERVATION,
  RESERVATION_ERROR,
} from '../types'

const reservationReducer = (state, action) => {
  switch (action.type) {
    case GET_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload,
      }
    case ADD_RESERVATION:
      console.log('RES REDUCER -- ADD_RES / STATE: ', state)
      let r = state.reservations || []
      return { ...state, reservations: [action.payload, ...r] }
    case RESERVATION_ERROR:
      return {
        ...state,
        error: action.payload,
      }
    case UPDATE_RESERVATION:
      return {
        ...state,
        reservations: state.reservations.map((reservation) =>
          reservation.reservation_id === action.payload.reservation_id
            ? action.payload
            : reservation
        ),
      }
    default:
      return state
  }
}

export default reservationReducer
