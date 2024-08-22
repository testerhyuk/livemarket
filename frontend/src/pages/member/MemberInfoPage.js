import React from 'react'
import MemberInfoComponent from '../../components/member/MemberInfoComponent'
import BasicMenu from '../../components/menus/BasicMenu'

export default function MemberInfoPage() {
  return (
    <div>
        <BasicMenu />

        <div style={{textAlign:'center', marginRight:'5%', marginTop:'5%', marginBottom:'4%'}}>
            <h3>MY PAGE</h3>
        </div>

        <MemberInfoComponent />
    </div>
  )
}
