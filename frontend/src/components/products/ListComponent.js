import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { API_SERVER_HOST, getList } from '../../api/ProductsApi'
import useCustomMove from '../../hooks/useCustomMove'
import FetchingModal from '../common/FetchingModal'
import PageComponent from '../common/PageComponent'

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

export default function ListComponent() {
    const [serverData, setServerData] = useState(initState)

    const {moveToList, moveToRead, page, size, refresh} = useCustomMove()

    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        setFetching(true)

        getList({page, size}).then(data => {
            setFetching(false)
            setServerData(data)
        })
    }, [page, size, refresh])

  return (
    <div>
        {fetching ? <FetchingModal /> : <></>}

        <Row lg={3} style={{margin : "2%"}}>
            {serverData.dtoList.map(product =>
                <Col key={product.pno} style={{marginBottom:"1%", cursor:'pointer'}}>
                    <Card style={{ width: '18rem'}} onClick={() => moveToRead(product.pno)}>
                        <Card.Img variant="top" src={`${host}/api/products/view/Thumb_${product.uploadedFileNames[0]}`} />
                        <Card.Body>
                        <Card.Title>{product.pname}</Card.Title>
                        <Card.Text>{product.price}원</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </Row>

        <PageComponent serverData={serverData} movePage={moveToList} />
    </div>
  )
}