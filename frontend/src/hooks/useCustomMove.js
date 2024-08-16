import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const getNum = (param, defaultValue) => {
    if(!param) {
        return defaultValue;
    }

    return parseInt(param)
}

// 쿼리 스트링을 유지한 채 페이지 이동 훅스
const useCustomMove = () => {
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false)

    const [queryParams] = useSearchParams()

    const page = getNum(queryParams.get('page'), 1)
    const size = getNum(queryParams.get('size'), 10)

    const queryDefault = createSearchParams({page, size}).toString()

    // 목록으로 이동
    const moveToList = (pageParam) => {
        let queryStr = ''

        if(pageParam) {
            const pageNum = getNum(pageParam.page, 1)
            const sizeNum = getNum(pageParam.size, 10)

            queryStr = createSearchParams({page:pageNum, size:sizeNum}).toString()

        } else {
            queryStr = queryDefault
        }

        setRefresh(!refresh)

        navigate({pathname:'../list', search:queryStr})
    }

    // 상품 수정 페이지로 이동
    const moveToModify = (num) => {
        navigate({
            pathname: `../modify/${num}`,
            search: queryDefault
        })
    }

    // 상품 상세 페이지 이동
    const moveToRead = (num) => {
        navigate({
            pathname: `products/read/${num}`,
            search: queryDefault
        })
    }

    return {moveToList, moveToModify, moveToRead, page, size, refresh}
}

export default useCustomMove;