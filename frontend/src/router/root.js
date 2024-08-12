import React, { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import productsRouter from './productsRouter'

const Loading = <div>Loading...</div>
const Main = lazy(() => import('../pages/home/MainPage'))

// product 라우터
const ProductsIndex = lazy(() => import('../pages/products/IndexPage'))

const root = createBrowserRouter([
    {
        path: '',
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    // product 라우터
    {
        path: 'products',
        element: <Suspense fallback={Loading}><ProductsIndex /></Suspense>,
        children: productsRouter()
    }
])

export default root;