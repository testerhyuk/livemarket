import React from 'react'
import BasicMenu from '../components/menus/BasicMenu'

export default function BasicLayout({children}) {
  return (
    <div>
        <header>
            <BasicMenu />
        </header>
        <main>
            {children}
        </main>
    </div>
  )
}
