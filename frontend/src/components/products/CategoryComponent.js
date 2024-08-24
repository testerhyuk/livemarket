import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useCustomMove from '../../hooks/useCustomMove'
import { Card, Col, Row } from 'react-bootstrap'
import { searchCategory } from '../../api/ProductsApi'
import { API_SERVER_HOST } from '../../api/MemberApi'

const categoryString = {
    0 : '음식',
    1 : '의류',
    2 : '가전제품',
    3 : '신발',
    4 : '기타 상품',
}
const initState = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: null,
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 0
}

const host = API_SERVER_HOST

export default function CategoryComponent() {
    const categoryIdx = useParams()

    const [serverData, setServerData] = useState(initState)

    const {moveToRead, page, size, refresh} = useCustomMove()

    useEffect(() => {
        searchCategory({page, size}, categoryIdx.category_idx).then(res => {
            setServerData(res.data)
        })
    }, [page, size, refresh, categoryIdx.category_idx])

  return (
    <div>
        <div style={{textAlign:'center', marginRight:'5%', marginTop:'5%', marginBottom:'4%'}}>
            <h3>{categoryString[categoryIdx.category_idx]}</h3>
        </div>

        <Row lg={3} style={{margin : "2%"}}>
            {serverData.dtoList.map(product =>
                <Col key={product.pno} style={{marginBottom:"1%", cursor:'pointer'}}>
                    <Card style={{ width: '18rem'}} onClick={() => moveToRead(product.pno)}>
                        <Card.Img variant="top" src={`${host}/api/products/view/Thumb_${product.uploadedFileNames[0]}`} />
                        <Card.Body>
                        <Card.Title>{product.pname}</Card.Title>
                        <Card.Text>{product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </Row>
    </div>
  )
}
