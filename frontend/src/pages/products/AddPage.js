import React from 'react'
import AddComponent from '../../components/products/AddComponent'

export default function AddPage(props) {
  return (
    <div>
      <h3 style={{textAlign:'center', marginTop:'5%'}}>상품 등록</h3>
      
      <div 
        style={{borderBottom:'1px solid lightgray', margin:'30px auto', width:'300px'}} 
        className='division-line'
      >
      </div>

      <AddComponent />
    </div>
  )
}
