import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import MovieService from '../../services/movie-service'
import ErrorLoader from '../error/error'
import Loading from '../loading/loading'
import './hero.scss'

const Hero = () => {
	const [movie, setMovie] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const movieService = new MovieService()

	const getMovie = () => {
		setLoading(true)
		movieService
			.getRandomMovie()
			.then(res => setMovie(res))
			.catch(() => setError(true))
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		getMovie()
	}, [])

	const loadingContent = loading ? <Loading /> : null,
		errorContent = error ? <ErrorLoader /> : null,
		content = !(error || loading) ? (
			<Content movie={movie} getMovie={getMovie} />
		) : null

	return (
		<div className='hero'>
			<div className='hero__info'>
				<h2>Find Movies</h2>
				<h1>TV shows and more</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
					provident vel modi est dolore necessitatibus ex ad et aliquid
					voluptate cupiditate maxime consectetur molestiae quasi, ipsa, autem
					eligendi, in libero?
				</p>
				<button className='btn btn-secondary' onClick={getMovie}>
					Random movie
				</button>
			</div>
			<div className='hero__movie'>
				{loadingContent}
				{errorContent}
				{content}
			</div>
		</div>
	)
}

export default Hero

const Content = ({ movie }) => {
	const navigate = useNavigate()
	return (
		<>
			<img src={movie.backdrop_path} alt='img' />
			<div className='hero__movie-descr'>
				<h2>{movie.name}</h2>
				<div className="hero__movie-data">
					<div className='dot'></div>
					<p>
						{movie.vote_average}
					</p>
					<div className='data-icon'></div>
					<p>{movie.release_date}</p>
				</div>
				<p>
					{movie.description && movie.description.length >= 280
						? `${movie.description.slice(0, 200)}...`
						: movie.description}
				</p>
				<div className='hero__movie-btn'>
					<button className='btn btn-primary' onClick={() => navigate(`/movie/${movie.id}`)}>Details</button>
				</div>
			</div>
		</>
	)
}
