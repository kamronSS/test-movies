import { useParams } from 'react-router-dom'
import Details from '../components/details/details'

function DetailedPage() {
	const {id} = useParams()

	return (
		<Details id={id}/>
	)
}

export default DetailedPage