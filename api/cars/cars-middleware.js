const { getById, getAll } = require("../cars/cars-model")

const checkCarId = () => {
  return async (req, res, next) => {
    try {
      const car = await getById(req.params.id)
        if(!car){
          res.status(404).json({
            message: `car with id ${req.params.id} is not found`
          })  
        } else {
          req.car = car
          next()
        }
    } catch (err){
      next(err)
    }
  }
}

const checkCarPayload = () => {
  return (req, res, next) => {
    if(!req.body.vin){
      return res.status(400).json({
        message: `vin is missing`
      })
    } else if(!req.body.make){
        return res.status(400).json({
        message: `make is missing`
      })
    } else if(!req.body.model){
      return res.status(400).json({
        message: `model is missing`
      })
    } else if(!req.body.mileage){
      return res.status(400).json({
        message: `mileage is missing`
      })
    } else {
      next()
    }
  }
}

const checkVinNumberValid = () => {
  return (req, res, next) => {
    if(req.body.vin.length !== 17){
      res.status(400).json({
        message: `vin ${req.body.vin} is invalid`
      })
    }
    else {
      next()
    }
  }
}

const checkVinNumberUnique = () => {
  return async (req, res, next) => {
    try {
      const allCars = await getAll()
      allCars.forEach(car => {
        if(car.vin === req.body.vin){
          res.status(400).json({
            message: `vin ${req.body.vin} already exists`
          })
        }
      })
      next()
    } catch(err) {
      next(err)
    }
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
