import { lazy, Suspense } from "react";
import FetchingModal from "../components/common/FetchingModal"

const Login = lazy(() => import('../pages/member/LoginPage'))
const KakaoRedirect = lazy(() => import('../pages/member/KakaoRedirectPage'))
const MemberModify = lazy(() => import('../pages/member/MemberModifyPage'))
const MemberRegister = lazy(() => import('../pages/member/RegisterPage'))

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
    ]
}

export default memberRouter