import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

const host = `${API_SERVER_HOST}/api/member`

export const loginPost = async (loginParam) => {
    const header = {headers: {"Content-Type": "x-www-form-urlencoded"}}

    const form = new FormData()
    form.append('username', loginParam.email)
    form.append('password', loginParam.pw)

    const res = await axios.post(`${host}/login`, form, header)

    return res.data
}

// 회원 등록
export const registerMember = async(member) => {
    const header = {headers: {"Content-Type": "application/json"}}

    const form = new FormData()
    form.append('email', member.email)
    form.append('nickname', member.nickname)
    form.append('pw', member.pw)

    const res = await axios.post(`${host}/register`, form, header)

    return res.data
}

// 회원 수정
export const modifyMember = async (member) => {
    const res = await axios.put(`${host}/modify`, member)

    return res.data
}