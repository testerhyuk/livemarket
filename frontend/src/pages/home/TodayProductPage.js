import React, { useEffect } from 'react'
import TodayProductComponent from '../../components/products/TodayProductComponent'
import { useDispatch, useSelector } from 'react-redux'
import { todayProduct } from '../../api/ProductsApi'
import { todayProducts } from '../../slices/productSlice'

export default function TodayProductPage() {
  const today = useSelector(state => state.productSlice)

  const dispatch = useDispatch()

  useEffect(() => {
    todayProduct().then(data => {
      dispatch(todayProducts(data))
    })
  }, [])

  return (
    <div>
        <h4 style={{marginLeft:'20px', marginTop:'20px'}}>오늘의 상품</h4>
        <div style={{borderBottom:'1px solid lightgray', width:'150px', marginLeft:'20px'}}></div>
        <div>
            <TodayProductComponent product={today}/>
        </div>
    </div>
  )
}
