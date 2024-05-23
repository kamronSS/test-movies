import ErrorBoundary from '../components/error-boundary/error-boundary'
import Hero from '../components/hero/hero'

function HomePage() {
	return (
		<>
			<ErrorBoundary>
				<Hero />
			</ErrorBoundary>
		</>
	)
}

export default HomePage