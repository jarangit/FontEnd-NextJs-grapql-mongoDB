import React from 'react'
import Menu from './menu'

const Layout = ({children}) => {
    return (
        <div>
            <Menu/>
            {children}
        </div>
    )
}

export default Layout
