import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../../pages/sign-in'
import LazyLoader from '../lazy-loader/lazy-loader'
import Navbar from '../navbar/navbar'

const NotFoundPage = lazy( () => import( '../../pages/not-found/not-found-page')),
	HomePage = lazy( () => import('../../pages/home')),
	TrandingPage = lazy( () => import('../../pages/tranding-page')),
	PopularPage = lazy( () => import('../../pages/popular-page')),
	TvPage = lazy( () => import('../../pages/tv')),
	DetailedPage = lazy( () => import('../../pages/detailed'))


function App() {
	return (
		<div className='app'>
			<Navbar />
			<Suspense fallback={<LazyLoader />}>
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route path='/home' element={<HomePage />} />
					<Route path='/tv' element={<TvPage />} />
					<Route path='/popular' element={<PopularPage />} />
					<Route path='/tranding' element={<TrandingPage />} />
					<Route path='/movie/:id' element={<DetailedPage />} />
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			</ Suspense>
		</div>
	)
}

export default App
