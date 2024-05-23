import "./loading.scss"

function Loading(){
	return(
		<div className="center">
			<div className="spinner__wrapper">
				<img src="/spinner.svg" alt="spinner" className='spinner'/>
			</div>
		</div>
	)
}

export default Loading