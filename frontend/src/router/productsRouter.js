import { lazy, Suspense } from "react"
import { Navigate } from "react-router-dom"
import FetchingModal from "../components/common/FetchingModal"

const ProductList = lazy(() => import('../pages/products/ListPage'))
const ProductAdd = lazy(() => import('../pages/products/AddPage'))
const ProductRead = lazy(() => import('../pages/products/ReadPage'))
const ProductModify = lazy(() => import('../pages/products/ModifyPage'))

const productsRouter = () => {
    return [
        {
            path: '',
            element: <Navigate replace to={'/products/list'} />
        },
        {
            path: 'list',
            element: <Suspense fallback={<FetchingModal />}><ProductList /></Suspense>
        },
        {
            path:'add',
            element: <Suspense fallback={<FetchingModal />}><ProductAdd /></Suspense>
        },
        {
            path:'read/:pno',
            element: <Suspense fallback={<FetchingModal />}><ProductRead /></Suspense>
        },
        {
            path:'modify/:pno',
            element: <Suspense fallback={<FetchingModal />}><ProductModify /></Suspense>
        }
    ]
}

export default productsRouter;