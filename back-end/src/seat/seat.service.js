const knex = require('../db/connection')

const read = (reservationId) =>
  knex('reservations')
    .select('people')
    .where({ reservation_id: reservationId })
    .first()

const update = (tableId, updatedTable) =>
  knex('tables')
    .select('*')
    .where({ table_id: tableId })
    .update(updatedTable, '*')

const destroy = (reservationId) => {
  knex('reservations').where({ reservation_id: reservationId }).del()
}

module.exports = {
  read,
  update,
  destroy,
}
