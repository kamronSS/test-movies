import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieService from '../../services/movie-service'
import ErrorLoader from '../error/error'
import Loading from '../loading/loading'
import "./details.scss"

function Details() {
	const {id} = useParams()
	const [movie, setMovie] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const movieService = new MovieService()

	const getMovie = () => {
		setLoading(true)
		movieService
			.getDetailedMovie(id)
			.then(res => setMovie(res))
			.catch(() => setError(true))
			.finally(() => setLoading(false))
	}

	useEffect(() => {
		getMovie()
	}, [id])

	const loadingContent = loading ? <Loading /> : null,
		errorContent = error ? <ErrorLoader /> : null,
		content = !(error || loading) ? (
			<Content movie={movie} getMovie={getMovie} />
		) : null

	return (
		<>
			{loadingContent}
			{errorContent}
			{content}
		</>		
	)
}

export default Details

function Content({movie}) {
	return (
		<div className='details'>
			<div className='details__img'>
				<img src={movie.poster_path} alt="img" />
			</div>	
			<div className='details__movie-descr'>
				<h2>{movie.name}</h2>
				<p>{movie.description}</p>
				<div className="details__info">
					<div className='vote details__info-block'>
						<div className='star'>
							<img src="/star.png" alt="" />
						</div>
						<p>
							{movie.vote_average}
						</p>
					</div>
					<div className="vote__count details__info-block">
						<div className="users-icon">
							<img src="/info.png" alt="" />
						</div>
						<p>{movie.vote_count}</p>
					</div>
					<div className="date details__info-block">
						<div className='date-icon'>
							<img src="/calendar.png" alt="" />
						</div>
						<p>{movie.date}</p>
					</div>
				</div>
			</div>
		</div>
	)
}