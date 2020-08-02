import React from 'react'
import Menu from './menu'
import Footer from './footer'

const Layout = ({children}) => {
    return (
        <div>
            <Menu/>
            {children}
            <Footer/>
        </div>
    )
}

export default Layout
