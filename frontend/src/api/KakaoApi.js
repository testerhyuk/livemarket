import axios from "axios"
import { API_SERVER_HOST } from "./MemberApi"

const rest_api_key = process.env.REACT_APP_KAKAO_API_KEY

const redirect_uri = 'http://localhost:3000/member/kakao'

const auth_code_path = 'https://kauth.kakao.com/oauth/authorize'

const access_token_url = 'https://kauth.kakao.com/oauth/token'

// 카카오 로그인 창
export const getkakaoLoginLink = () => {
    console.log('rest : ', rest_api_key)
    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

    return kakaoURL
}

// 카카오 로그인 후 엑세스 토큰 get
export const getAccessToken = async (authCode) => {
    const header = {headers : {"Content-Type" : "application/x-www-form-urlencoded;charset=UTF-8"}}

    const params = {
        grant_type: 'authorization_code',
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode
    }

    const res = await axios.post(access_token_url, params, header)

    const accessToken = res.data.access_token

    return accessToken
}

export const getMemberWithAccessToken = async (accessToken) => {
    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`)

    return res.data
}