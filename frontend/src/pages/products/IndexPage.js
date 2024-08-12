import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { Outlet } from 'react-router-dom'

export default function IndexPage() {
  return (
    <BasicLayout>
        <div>
            <Outlet />
        </div>
    </BasicLayout>
  )
}
