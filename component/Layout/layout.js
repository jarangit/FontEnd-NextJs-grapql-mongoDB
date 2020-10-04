import React from 'react'
import Menu from './menu'
import Footer from './footer'
import SearchBar from './searchBar'
import TopBar from './topBar'
import styled from 'styled-components'

const Div = styled.div`
    display:grid;
    grid-template-columns: 15% auto;
`
const Layout = ({children}) => {
    return (
        <Div>
            <Menu/>
            <div></div>
            <div>
            <TopBar/>
            <SearchBar/>
                {children}
            {/* <Footer/> */}
            </div>
        </Div>
    )
}

export default Layout
