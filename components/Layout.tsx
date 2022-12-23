import React from 'react'
import Navbar from './Nav'

function Layout(props: any) {
  return (
    <div>
        <Navbar />
        {props.children}
    </div>
  )
}

export default Layout