import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

const host = `${API_SERVER_HOST}/api/products`

// 상품 등록
export const postAdd = async (product) => {
    const header = {headers: {'Content-Type' : 'multipart/form-data'}}

    const res = await axios.post(`${host}/`, product, header)

    return res.data
}