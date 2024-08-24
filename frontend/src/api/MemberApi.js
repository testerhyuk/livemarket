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

// 회원 조회
export const getMemberInfo = async (email) => {
    const form = new FormData()

    form.append('email', email)

    const res = await axios.post(`${host}/getMember`, form)

    return res.data
}

// 프로필 이미지 가져오기
export const getProfileImage = async (fileName) => {
    const res = await axios.get(`${host}/view/${fileName}`)

    return res.data
}

// 프로필 이미지 바꾸기
export const addProfileImage = async (email, fileName) => {
    const header = {headers: {'Content-Type' : 'multipart/form-data'}}

    const form = new FormData()

    form.append('email', email)
    form.append('file', fileName)

    const res = await axios.post(`${host}/profileImage`, form, header)

    return res.data
}

// 회원 등록
export const registerMember = async(member) => {
    const form = new FormData()

    form.append('email', member.email)
    form.append('nickname', member.nickname)
    form.append('pw', member.pw)
    form.append('zipcode', member.zipcode)
    form.append('streetAddress', member.streetAddress)
    form.append('detailAddress', member.detailAddress)

    const res = await axios.post(`${host}/register`, form)

    return res.data
}

// 회원 수정
export const modifyMember = async (member, change) => {
    const form = new FormData()

    form.append('email', member.email)
    form.append('nickname', member.nickname)
    form.append('pw', member.pw)
    form.append('zipcode', member.zipcode)
    form.append('streetAddress', member.streetAddress)
    form.append('detailAddress', member.detailAddress)
    form.append('isChanged', JSON.stringify(change))

    const res = await axios.put(`${host}/modify`, form)

    return res.data
}

// 회원 탈퇴
export const deleteMember = async (email) => {
    const form = new FormData()
    form.append('email', email)

    const res = await axios.post(`${host}/deleteMember`, form)

    return res.data
}

// 이메일 중복 검사
export const checkEmail = async (email) => {
    const form = new FormData()
    form.append('email', email)

    const res = await axios.post(`${host}/check_email`, form)

    return res.data
}

// 닉네임 중복 검사
export const checkNickname = async (nickname) => {
    const form = new FormData()
    form.append('nickname', nickname)

    const res = await axios.post(`${host}/check_nickname`, form)

    return res.data
}

// 이메일 전송
export const sendEmail = async (email) => {
    const form = new FormData()
    form.append('email', email)

    const res = await axios.post(`${host}/sendEmail`, form)

    return res.data
}

// 이메일 인증
export const validateNumberCheck = async (validateNumber) => {
    const form = new FormData()
    form.append('validateNumber', validateNumber)

    const res = await axios.post(`${host}/emailValidateCheck`, form)

    return res.data
}