import { lazy, Suspense } from "react";
import FetchingModal from "../components/common/FetchingModal"

const Login = lazy(() => import('../pages/member/LoginPage'))

const memberRouter = () => {
    return [
        {
            path: 'login',
            element: <Suspense fallback={<FetchingModal />}><Login /></Suspense>
        },
       
    ]
}

export default memberRouter