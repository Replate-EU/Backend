function intToBoolean(param) {
  return param ? true : false;
}

function pickupConvert(pickup) {
    return {
        ...pickup,
        completed: intToBoolean(pickup.completed)
    }
}

module.exports = pickupConvert