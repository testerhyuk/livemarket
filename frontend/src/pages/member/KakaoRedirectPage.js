import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAccessToken, getMemberWithAccessToken } from '../../api/KakaoApi'
import { useDispatch } from 'react-redux'
import useCustomLogin from '../../hooks/useCustomLogin'
import { login } from '../../slices/loginSlice'

export default function KakaoRedirectPage() {
    const [searchParams] = useSearchParams()

    const dispatch = useDispatch()

    const {moveToPath} = useCustomLogin()

    const authCode = searchParams.get('code')

    useEffect(() => {
        getAccessToken(authCode).then(data => {
            const accessToken = data
            
            getMemberWithAccessToken(accessToken).then(memberInfo => {
                dispatch(login(memberInfo))

                if(memberInfo && memberInfo.social) {
                    moveToPath("/member/modify")
                } else {
                    moveToPath("/")
                }
            })
        })
    }, [authCode])

  return (
    <div>
        <div>Kakao Login Redirect</div>
    </div>
  )
}
