class MovieService {
	_apiKey = '8dd1ce49ffa76919c61f607c49849f64'
	_apiImg = "https://image.tmdb.org/t/p/original"
	_apiLeng = "language=en-US"
	_apiBase = "https://api.themoviedb.org/3"
	_apiPage = 1

	getResource = async (url) => {
		const request = await fetch(url)

		if(!request.ok){
			throw new Error(`Could not fetch ${url}, status: ${request.status} `)
		}

		return await request.json()
	}

	getTvShows = async (page = this._apiPage) => {
		const res = await this.getResource(`${this._apiBase}/discover/tv?${this._apiLeng}&page=${page}&api_key=${this._apiKey}`)
		const movies = res.results
		return movies && movies.map(movie => this._transformMovie(movie))
	}

	getPopularMovies = async (page = this._apiPage) => {
		const res = await this.getResource(`${this._apiBase}/movie/popular?${this._apiLeng}&page=${page}&api_key=${this._apiKey}`)
		const movies = res.results
		return movies && movies.map(movie => this._transformMovie(movie))
	}

	getTrandingMovies = async (page = this._apiPage) => {
		const res = await this.getResource(`${this._apiBase}/movie/top_rated?${this._apiLeng}&page=${page}&api_key=${this._apiKey}`)
		const movies = res.results
		return movies && movies.map(movie => this._transformMovie(movie))
	}

	getDetailedMovie = async (id = 278) => {
		const res = await this.getResource(`${this._apiBase}/movie/${id}?${this._apiLeng}&api_key=${this._apiKey}`)
		return this._transformMovie(res)
	}

	getRandomMovie = async () => {
		const res = await this.getPopularMovies()
		const movie = res[Math.floor(Math.random() * res.length)]
		return movie
	}

	_transformMovie = (movie) => {
		if(movie.original_name){
			return {
				name: movie.name,
				description: movie.overview,
				backdrop_path: `${this._apiImg}${movie.backdrop_path}`,
				poster_path: `${this._apiImg}${movie.poster_path}`,
				id: movie.id,
				vote_average: movie.vote_average,
				vote_count: movie.vote_count,
				date: movie.first_air_date,
			}
		}else{
			return {
				name: movie.title,
				description: movie.overview,
				backdrop_path: `${this._apiImg}${movie.backdrop_path}`,
				poster_path: `${this._apiImg}${movie.poster_path}`,
				id: movie.id,
				vote_average: movie.vote_average,
				vote_count: movie.vote_count,
				date: movie.release_date,
			}
		}
		
	}
}

export default MovieService