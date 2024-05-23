import './error.scss'

function ErrorLoader(){
	return(
		<div className="center">
			<div className="error__wrapper">
				<img src="/error.svg" alt="error" className='error-message'/>
				<p>Something went wrong!</p>
			</div>
		</div>
	)
}

export default ErrorLoader