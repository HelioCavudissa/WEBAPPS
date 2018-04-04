module.exports =Session

function Session( movie, date,room,id) {
    this.date = date
    this.room = room
    this.movie = movie
    this.id = id
}

Session.prototype.toString = function () {
    return `{movie: ${this.movie}, room: ${this.room},date: [ ${this.date} ]}`
}