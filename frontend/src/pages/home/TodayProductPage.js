import React, { useEffect, useState } from 'react'
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
        <h2>새로운 상품</h2>
        <div>
            <TodayProductComponent product={today}/>
        </div>
    </div>
  )
}
