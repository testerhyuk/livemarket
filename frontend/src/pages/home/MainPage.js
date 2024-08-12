import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import Banner from '../../components/banner/Banner'
import TodayProductPage from './TodayProductPage'
import PopularItemPage from './PopularItemPage'

export default function MainPage() {
  return (
    <BasicLayout>
        <Banner />
        <PopularItemPage />
        <TodayProductPage />
    </BasicLayout>
  )
}
