import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='App'>
      <Nav />
      <div className='gradient'></div>
      <div className='outlet'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout