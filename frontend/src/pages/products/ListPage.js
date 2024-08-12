import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function ListPage() {
    const navigate = useNavigate()

  return (
    <div>
        <Button 
            style={{backgroundColor:'#6667AB', border:'white', color:'white'}}
            onClick={() => navigate('../add')}
        >
            상품 등록
        </Button>
        {/* <div className="d-flex justify-content-around">
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                <Card.Title>Card Title</Card.Title>
                </Card.Body>
            </Card>
        </div> */}
    </div>
  )
}
