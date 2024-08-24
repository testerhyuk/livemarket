import React, { useEffect, useState } from 'react'
import { API_SERVER_HOST } from '../../api/MemberApi'
import useCustomMove from '../../hooks/useCustomMove'
import { salesProduct } from '../../api/ProductsApi'
import { useSelector } from 'react-redux'
import { Card, Col, Row } from 'react-bootstrap'

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

export default function MySellListComponent() {
    const loginState = useSelector(state => state.loginSlice)

    const [serverData, setServerData] = useState(initState)

    const {page, size, refresh, moveToRead} = useCustomMove()

    useEffect(() => {
        salesProduct({page:page, size:size}, loginState.email).then(res => {
            setServerData(res.data)
        })
    }, [page, size, refresh])


  return (
    <div>
        <div style={{textAlign:'center', marginRight:'5%', marginTop:'5%', marginBottom:'4%'}}>
            <h3>{loginState.nickname}님의 판매 상품</h3>
        </div>
        
        <Row lg={3} style={{margin : "2%"}}>
            {serverData.dtoList.map(product =>
                <Col key={product.pno} style={{marginBottom:"1%", cursor:'pointer'}}>
                    <Card style={{ width: '18rem'}} onClick={() => moveToRead(`../../products/read/${product.pno}`)}>
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
