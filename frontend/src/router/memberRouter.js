import { lazy, Suspense } from "react";
import FetchingModal from "../components/common/FetchingModal"

const Login = lazy(() => import('../pages/member/LoginPage'))
const KakaoRedirect = lazy(() => import('../pages/member/KakaoRedirectPage'))
const MemberModify = lazy(() => import('../pages/member/MemberModifyPage'))
const MemberRegister = lazy(() => import('../pages/member/RegisterPage'))
const MemberInfo = lazy(() => import('../pages/member/MemberInfoPage'))
const MySales = lazy(() => import('../pages/member/MySellListPage'))
const DeleteAccount = lazy(() => import('../pages/member/DeleteAccountPage'))

const memberRouter = () => {
    return [
        {
            path: 'login',
            element: <Suspense fallback={<FetchingModal />}><Login /></Suspense>
        },
        {
            path: 'kakao',
            element: <Suspense fallback={<FetchingModal />}><KakaoRedirect /></Suspense>
        },
        {
            path: 'modify',
            element: <Suspense fallback={<FetchingModal />}><MemberModify /></Suspense>
        },
        {
            path: 'register',
            element: <Suspense fallback={<FetchingModal />}><MemberRegister /></Suspense>
        },
        {
            path: 'info',
            element: <Suspense fallback={<FetchingModal />}><MemberInfo /></Suspense>
        },
        {
            path: 'my_sales',
            element: <Suspense fallback={<FetchingModal />}><MySales /></Suspense>
        },
        {
            path: 'delete_account',
            element: <Suspense fallback={<FetchingModal />}><DeleteAccount /></Suspense>
        },
    ]
}

export default memberRouter