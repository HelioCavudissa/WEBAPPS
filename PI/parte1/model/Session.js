module.exports =Session

function Session( movie, date,room) {
    this.date = date
    this.room = room
    this.movie = movie
}

Session.prototype.toString = function () {
    return `{movie: ${this.movie}, room: ${this.room},date: [ ${this.date} ]}`
}