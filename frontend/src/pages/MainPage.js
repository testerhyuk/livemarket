import React from 'react'
import BasicLayout from '../layouts/BasicLayout'
import Banner from '../components/banner/Banner'
import PopularItem from '../components/PopularItem'
import NewItem from '../components/NewItem'

export default function MainPage() {
  return (
    <BasicLayout>
        <Banner />
        <PopularItem />
        <NewItem />
    </BasicLayout>
  )
}
