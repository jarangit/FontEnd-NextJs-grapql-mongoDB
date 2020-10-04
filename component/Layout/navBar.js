import Link from 'next/link';
import React from 'react'
import styled from "styled-components";

const Div = styled.div`
margin: 10px;
padding: 10px 30px;
background: #f2f2f2;
border-radius: 1em;
    a {
        text-decoration: none;
        color: black;
        span{
            margin: 0 10px;
        }
        :hover{
            color: #338E90;
        }
    }
`
const NavBar = (props) => {
    console.log(props.data);
    return (
        <Div>
            {props.data.map(items =>(
                <>
                    <Link href = {`/${items.url}`} >
                        <a> {items.slug} <span> | </span></a>
                    </Link>
                </>
            ))}
        </Div>
    )
}

export default NavBar
