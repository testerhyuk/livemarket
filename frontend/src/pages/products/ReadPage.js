import React from 'react'
import ReadComponent from '../../components/products/ReadComponent'
import { useParams } from 'react-router-dom'

export default function ReadPage() {
    const {pno} = useParams()
    
  return (
    <div>
        <ReadComponent pno={pno} />
    </div>
  )
}
