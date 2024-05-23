import './row-movies-item.scss'

function RowMoviesItem({movie, onToggleOpen}) {
	
	return (
		<div className='moviesitem' onClick={() => onToggleOpen(movie)}>
			<img src={movie.poster_path} alt={movie.name} />
			<h2>
				{movie.name}
			</h2>
			<div className='moviesitem-descr'>
				<p>{movie.date}</p>
				<div className='dot'></div>
				<p>{movie.vote_average}</p>
			</div>
		</div>
	)
}

export default RowMoviesItem