import React from 'react'
import styled from 'styled-components'

const DIV = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    img{
        align-items: center;
        margin: 10px;
        width: 400px;
    }
`

const BannerPromo = () => {
    return (
        <DIV className = 'container' >
            <img src= "https://res.cloudinary.com/the-guitar-next/image/upload/v1597081618/the-guitar-next/pgvllapjmrh7emlmf8se.png" width = "100%"/>
            <img src= "https://res.cloudinary.com/the-guitar-next/image/upload/v1597081618/the-guitar-next/pgvllapjmrh7emlmf8se.png" width = "100%"/>
            <img src= "https://res.cloudinary.com/the-guitar-next/image/upload/v1597081618/the-guitar-next/pgvllapjmrh7emlmf8se.png" width = "100%"/>
        </DIV>
    )
}

export default BannerPromo
