module.exports = Cinema

function Cinema(name,city,rooms) {
    this.name = name
    this.city = city
    this.rooms = rooms
}

Cinema.prototype.toString = function () {
    let str = ''
    this.rooms.forEach(s=> str += s.toString())
    return `{name: ${this.name}, city: ${this.city}, rooms: [ ${str} ]}`
}