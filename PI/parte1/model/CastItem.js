module.exports = CastItem

function CastItem(obj) {
    this.name = obj.name
    this.id = obj.id
    this.character = obj.character
}

CastItem.prototype.toString = function () {
    return `{name: ${this.name}, id: ${this.id}, character: ${this.character}`
}