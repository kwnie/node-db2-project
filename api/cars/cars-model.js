const db = require("../../data/db-config")

const getAll = () => {
  return db("cars")
}

const getById = (id) => {
  return db("cars")
    .where({id})
    .first()
}

const create = (car) => {
  db("cars").insert(car)
    .then(id => {
      return getById(id)
    })
}

module.exports = {
  getAll,
  getById,
  create
}