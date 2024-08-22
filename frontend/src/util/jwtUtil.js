import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/MemberApi";

const jwtAxios = axios.create()

// refreshToken 호출
const refreshJWT = async (accessToken, refreshToken) => {
    const host = API_SERVER_HOST

    const header = {headers : {'Authorization' : `Bearer ${accessToken}`}}

    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`, header)

    return res.data
}

// befroe request
const beforeReq = (config) => {
    const memberInfo = getCookie('member')

    if(!memberInfo) {
        return Promise.reject(
            {response :
                {data :
                    {error: "REQUIRE_LOGIN"}
                }
            }
        )
    }

    // 쿠키가 없다면 Authorization 헤더에 beraer 토큰 보냄
    const {accessToken} = memberInfo

    config.headers.Authorization = `Bearer ${accessToken}`

    return config
}

// fail request
const requestFail = (err) => {
    return Promise.reject(err)
}

// before return response
const beforeRes = async (res) => {
    const data = res.data
    console.log('data', data)
    console.log(getCookie('member').refreshToken)

    if(data && data.error === 'ERROR_ACCESS_TOKEN') {
        const memberCookieValue = getCookie('member')
        console.log("membercookie : ", memberCookieValue)
        const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken)

        console.log("result : ", result)

        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken

        console.log("refreshJWT RESULT", result)

        setCookie('member', JSON.stringify(memberCookieValue), 1)

        const originalRequest = res.config
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`

        return await axios(originalRequest)
    }

    return res
}

// fail response
const responseFail = (err) => {
    return Promise.reject(err);
}

// request 보내기 전 동작
jwtAxios.interceptors.request.use(beforeReq, requestFail)

// response 보내기 전 동작
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios