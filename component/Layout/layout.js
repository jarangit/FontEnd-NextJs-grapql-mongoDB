import React from 'react'
import Menu from './menu'
import Footer from './footer'
import SearchBar from './searchBar'
import TopBar from './topBar'
const Layout = ({children}) => {
    return (
        <div>
            <TopBar/>
            <SearchBar/>
            <Menu/>
            {children}
            <Footer/>
        </div>
    )
}

export default Layout
