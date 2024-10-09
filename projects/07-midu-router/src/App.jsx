import { Router } from './Router'
import { Route } from './Route'

import { lazy, Suspense } from 'react'

const AboutPage = lazy(() => import('./pages/About.jsx'))
const HomePage = lazy(() => import('./pages/Home.jsx'))
const Page404 = lazy(() => import('./pages/Page404.jsx'))

const appRoutes = [
  {
    path: '/:lang/about',
    Component: AboutPage
  },
  {
    path: '/search/:query',
    Component: ({ routeParams }) => <h1>Has buscado {routeParams.query}</h1>
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={HomePage} />
          <Route path='/about' Component={AboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
