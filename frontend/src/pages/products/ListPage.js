import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ListComponent from '../../components/products/ListComponent'

export default function ListPage() {
    const navigate = useNavigate()

  return (
    <div>
        <Button 
            style={{backgroundColor:'#6667AB', border:'white', color:'white', marginLeft:'3%'}}
            onClick={() => navigate('../add')}
        >
            상품 등록
        </Button>

        <div>
            <ListComponent />
        </div>
    </div>
  )
}
