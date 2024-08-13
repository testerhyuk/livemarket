import React, { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import productsRouter from './productsRouter'
import FetchingModal from '../components/common/FetchingModal'

const Main = lazy(() => import('../pages/home/MainPage'))

// product 라우터
const ProductsIndex = lazy(() => import('../pages/products/IndexPage'))

const root = createBrowserRouter([
    {
        path: '',
        element: <Suspense fallback={<FetchingModal />}><Main /></Suspense>
    },
    // product 라우터
    {
        path: 'products',
        element: <Suspense fallback={<FetchingModal />}><ProductsIndex /></Suspense>,
        children: productsRouter()
    }
])

export default root;