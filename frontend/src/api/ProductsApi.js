import axios from "axios"
import jwtAxios from "../util/jwtUtil"

export const API_SERVER_HOST = 'http://localhost:8080'

const host = `${API_SERVER_HOST}/api/products`

// 상품 등록
export const postAdd = async (product) => {
    const header = {headers: {'Content-Type' : 'multipart/form-data'}}

    const res = await jwtAxios.post(`${host}/`, product, header)

    return res.data
}

// 상품 목록 조회
export const getList = async (pageParams) => {
	const {page, size} = pageParams
	const res = await axios.get(`${host}/list`, {params: {page:page, size:size}})
	
	return res.data
}

// 판매 상품 목록 조회
export const salesProduct = async (pageParams, email) => {
	const {page, size} = pageParams
	const res = jwtAxios.get(`${host}/myList`, {params: {page:page, size:size, email:email}})

	return res
}

// 카테고리 조회 페이지
export const searchCategory = async (pageParams, categoryIdx) => {
	const {page, size} = pageParams
	const res = axios.get(`${host}/categories/${categoryIdx}`, {params: {page:page, size:size}})

	return res
}

// 상품 상세 페이지
export const getOne = async (pno) => {
    const res = await axios.get(`${host}/read/${pno}`)

    return res.data
}

// 상품 수정
export const putOne = async (pno, product) => {
    const header = {headers: {'Content-Type' : 'multipart/form-data'}}
	
	const res = await jwtAxios.put(`${host}/modify/${pno}`, product, header)
	
	return res.data
}

// 상품 삭제
export const deleteOne = async (pno) => {
	const res = await jwtAxios.put(`${host}/remove/${pno}`)
	
	return res.data
}

// 오늘의 새상품
export const todayProduct = async () => {
	const res = await axios.get(`${host}/today_product`)

	return res.data
}
