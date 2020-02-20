const isEmpty = require('../empty/isEmpty')

if(typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}

const usergetDistance = (user1, user2) => {
    const earthRadius = 6371
    let lat1 = user1.latitude
    let lat2 = user2.latitude
    const lon1 = user1.longitude
    const lon2 = user2.longitude
    if(isEmpty(lat1) || isEmpty(lat2) || isEmpty(lon1) || isEmpty(lon2)) return null
    const dlat = (lat2 - lat1).toRad()
    const dlon = (lon2 - lon1).toRad()
    const a = Math.sin(dlat / 2) * Math.sin(dlat / 2)
          + Math.cos((lat1).toRad()) * Math.cos((lat2).toRad())
          * Math.sin(dlon / 2) * Math.sin(dlon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    
    return parseInt(earthRadius * c)
}

module.exports = usergetDistance