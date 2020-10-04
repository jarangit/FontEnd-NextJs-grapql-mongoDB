import React from 'react'
import styled from 'styled-components'


const DIV = styled.div`
    height: 500px;
    overflow: hidden;
    margin: 20px;
    border-radius: 40px;
    -webkit-box-shadow: 10px 10px 17px -6px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 10px 10px 17px -6px rgba(0, 0, 0, 0.4);
    box-shadow: 10px 10px 17px -6px rgba(0, 0, 0, 0.4);
    height: 350px;
`
const HomeBanner = () => {
    return (
        <DIV>
            <img src= "https://res.cloudinary.com/the-guitar-next/image/upload/v1597081618/the-guitar-next/pgvllapjmrh7emlmf8se.png" width = "100%"/>
        </DIV>
    )
}

export default HomeBanner
