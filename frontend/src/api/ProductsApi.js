import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

const host = `${API_SERVER_HOST}/api/products`

// 상품 등록
export const postAdd = async (product) => {
    const header = {headers: {'Content-Type' : 'multipart/form-data'}}

    const res = await axios.post(`${host}/`, product, header)

    return res.data
}

// 상품 목록 조회
export const getList = async (pageParams) => {
	const {page, size} = pageParams
	const res = await axios.get(`${host}/list`, {params: {page:page, size:size}})
	
	return res.data
}

// 상품 상세 페이지
export const getOne = async (pno) => {
    const res = await axios.get(`${host}/read/${pno}`)

    return res.data
}

// 상품 수정
export const putOne = async (pno, product) => {
    const header = {headers: {'Content-Type' : 'multipart/form-data'}}
	
	const res = await axios.put(`${host}/modify/${pno}`, product, header)
	
	return res.data
}

// 상품 삭제
export const deleteOne = async (pno) => {
	const res = await axios.put(`${host}/remove/${pno}`)
	
	return res.data
}