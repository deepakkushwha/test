import React from 'react'
import Header from './Header'
import MenuSidebar from './MenuSidebar'
import ReferenceDataTable from './ReferenceDataTable'
import RefData from './refData'

export default function Dashboard() {
  return (
    <div className='inner-wrapper'>
      <Header/>
      <div className='content-wrapper'>
        <div className='sidebar-menu'>
      <MenuSidebar/>
      </div>
      <div className='main-content'>
      {/* <ReferenceDataTable/> */}
      <RefData></RefData>
      </div>
      </div>
    </div>
  )
}
