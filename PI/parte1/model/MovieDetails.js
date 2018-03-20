module.exports = MovieDetails

function MovieDetails(obj, credits, director) {
    this.tagline = obj.tagline
    this.id = obj.id
    this.original_title = obj.original_title
    this.overview = obj.overview
    this.release_date = obj.release_date
    this.vote_average = obj.vote_average
    this.credits = credits
    this.director = director
}

MovieDetails.prototype.toString = function () {
    return `{id: ${this.id}, tagLine: ${this.tagline}, originalTitle: ${this.original_title}, overView: ${this.overview}, releaseDate: ${this.release_date}, voteAverage: ${this.vote_average}}, cast: ${this.credits.toString()}, director: ${this.director}`
}