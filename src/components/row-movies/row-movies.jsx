import { useEffect, useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useLocation } from 'react-router-dom'
import MovieService from '../../services/movie-service'
import ErrorLoader from '../error/error'
import Loading from '../loading/loading'
import MovieInfo from '../movie-info/movie-info'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import './row-movies.scss'


const RowMovies = () => { 
	const [open, setOpen] = useState(false)
	const [movies, setMovies] = useState([])
	const [moviesPage, setMoviesPage] = useState(1)
	const [movie, setMovie] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const [newItemsLoading, setNewItemsLoading] = useState(false)
	const [path_name, setPathName] = useState(null)


	const movieService = new MovieService()

	const {pathname} = useLocation()

	const onToggleOpen = (movie) => {
		setOpen(!open)
		setMovie(movie)
	}


	const getMovies = (moviesPage = 1) => {
		switch(pathname){
			case "/popular":
					setPathName("Popular")
					movieService.getPopularMovies(moviesPage)
				.then(res => setMovies([...movies, ...res]))
				.catch(() => setError(true))
				.finally(() => {
					setLoading(false)
					setNewItemsLoading(false)
				})
				break;
			case "/tranding":
				setPathName("Tranding")
					movieService.getTrandingMovies(moviesPage)
				.then(res => setMovies([...movies, ...res]))
				.catch(() => setError(true))
				.finally(() => {
					setLoading(false)
					setNewItemsLoading(false)
				})
				break;
			case "/tv":
				setPathName("Tv Series")
				movieService.getTvShows(moviesPage)
				.then(res => setMovies([...movies, ...res]))
				.catch(() => setError(true))
				.finally(() => {
					setLoading(false)
					setNewItemsLoading(false)
				})
		}
	}

	const loadingMovies = () => {
		setMoviesPage(moviesPage+1)
		getMovies(moviesPage)
	}

	useEffect( () => {
		setMoviesPage(moviesPage+1)
		getMovies(moviesPage)
	}, []) 


	const loadingContent = loading ? <Loading /> : null,
		errorContent = error ? <ErrorLoader /> : null
	const moviesContent =	!(loading || error) ? <Content getMovies={movies} onToggleOpen={onToggleOpen} /> : null

	return (
		<div className='rowmovies'>
			<div className='rowmovies__top'>
				<div className='rowmovies__top-title'>
					<img src="/tranding.svg" alt="tranding" />
					<h2>
						{path_name}
					</h2>
				</div>
				<div className='hr' />
			</div>
			{loadingContent}
			{errorContent}
			{moviesContent}

			<div className='rowmovies__load-more'>
				<button 
					className='btn btn-secondary' 
					onClick={loadingMovies}
					disabled={newItemsLoading}		
				>
					Load more
				</button>
			</div>

			<Modal open={open} onClose={() => onToggleOpen(movie)}>
				<MovieInfo  movie={movie}/>
			</Modal>
		</div>
	)
}
export default RowMovies

const Content = ({getMovies, onToggleOpen}) => {
	return(
		<div className='rowmovies__list'>
			{getMovies.map((movie) => (
				<RowMoviesItem 
					key={movie.id} 
					movie={movie}
					onToggleOpen = {onToggleOpen}
				/>
			))}
		</div>
	)
}