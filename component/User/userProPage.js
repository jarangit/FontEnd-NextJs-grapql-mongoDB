import React from 'react'
import styled from "styled-components";

const Div = styled.div`
    background: #DEF2F2;
    margin: 20px 0;
    padding: 20px;
`
const UseProPage = (props) => {
    const { id, name, tel, address, image_profile, line_id, email } = props.dataUser
    return (
        <Div>
            <h3> ผู้ขาย </h3>
            <img  src = {image_profile} width = "100px" />
            <p>Name: {name} </p>
            <p>Email: {email} </p>
            <p>Line: {line_id} </p>
            <p>Tel: {tel} </p>
        </Div>
    )
}

export default UseProPage
