import React from 'react'
import { useParams } from 'react-router-dom'
import ModifyComponent from '../../components/products/ModifyComponent'

export default function ModifyPage() {
    const {pno} = useParams()
  return (
    <div>
        <ModifyComponent pno={pno} />
    </div>
  )
}
