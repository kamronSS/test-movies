import { useNavigate } from 'react-router-dom'
import './movie-info.scss'

function MovieInfo({movie}) {
	const navigate = useNavigate()
	return (
		<div className='movieinfo'>
			<img src={movie.backdrop_path} alt="image" />

			<div className="movieinfo-descr">
				<h1>{movie.name}</h1>
				<p>
					{movie.description && movie.description.length > 200 ? `${movie.description.slice(0, 250)}...` : movie.description}
				</p>
			</div>
			<button className='btn btn-primary' onClick={() => navigate(`/movie/${movie.id}`)}>Details</button>
		</div>
	)
	
}

export default MovieInfo