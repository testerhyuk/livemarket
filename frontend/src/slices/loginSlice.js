import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginPost } from "../api/MemberApi"

const initState = {
    email: ''
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param)
})

const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: initState,
    reducers : {
        login : (state, action) => {
            return {email: action.payload.email}
        },
        logout : () => {
            return {...initState}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginPostAsync.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

export const {login, logout} = loginSlice.actions

export default loginSlice.reducer