import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/home'
import { Cart } from './pages/cart'

import { Layout } from './components/layolt'

const router = createBrowserRouter([
  {
    element: <Layout/>, //rotas router-dom
    children:[
      {
        path: '/',
        element: <Home/> 
      },
      {
        path: '/cart',
        element: <Cart/>
      }
    ]
  }
])

export { router };