module.exports = Movie

function Movie(obj,id) {
    this.id = id
    this.title = obj.title
    this.release_date = obj.release_date
    this.duration = obj.duration
}

Movie.prototype.toString = function () {
    return `{title: ${this.title}, id: ${this.id}, releaseDate: ${this.release_date}, duration: ${this.duration}}`
}