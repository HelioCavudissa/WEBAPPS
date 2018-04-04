module.exports = Cinema

function Cinema(name,city,id) {
    this.name = name
    this.city = city
    this.id=id

}

Cinema.prototype.toString = function () {

    return `{name: ${this.name}, city: ${this.city}, id: ${this.id}}`
}