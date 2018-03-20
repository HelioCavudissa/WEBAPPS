module.exports = Room

function Room(name,numberOfRows,numberOfseatsByRows) {
    this.name = name
    this.numberOfRows= numberOfRows
    this.numberOfseatsByRows = numberOfseatsByRows
}

Room.prototype.toString = function () {
    return `{name: ${this.name}, numberOfRows : ${this.numberOfRows}, numberOfseatsByRows
    : ${this.numberOfseatsByRows}`
}