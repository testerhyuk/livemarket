import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginPost } from "../api/MemberApi"
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil"

const initState = {
    email: ''
}

// 자동으로 쿠키 불러오는 설정
const loadMemeberCookie = () => {
    const memberInfo = getCookie("member")

    if(memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }

    return memberInfo
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param)
})

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemeberCookie() || initState,
    reducers : {
        login : (state, action) => {
            setCookie('member', JSON.stringify(action.payload), 1)

            const data = action.payload

            return data
        },
        logout : () => {
            removeCookie('member')
            return {...initState}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            const payload = action.payload

            if(!payload.error) {
                setCookie("member", JSON.stringify(payload), 1)
            }

            return payload
        })
    }
})

export const {login, logout} = loginSlice.actions

export default loginSlice.reducer