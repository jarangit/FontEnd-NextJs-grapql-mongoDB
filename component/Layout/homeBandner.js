import React from 'react'
import styled from 'styled-components'


const DIV = styled.div`
    height: 500px;
    overflow: hidden;
`
const HomeBanner = () => {
    return (
        <DIV>
            <img src= "https://res.cloudinary.com/the-guitar-next/image/upload/v1597081618/the-guitar-next/pgvllapjmrh7emlmf8se.png" width = "100%"/>
        </DIV>
    )
}

export default HomeBanner
