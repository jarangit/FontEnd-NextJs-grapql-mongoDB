import Link from 'next/link'
import React, { useContext } from 'react'
import { AuthContext } from '../../appState/authProvider'
import styled from 'styled-components'

const ButLogout = styled.button`
    background: none;
    color: #ff00aa;
    border: 1px solid #ff00aa;
    padding: 10px;
    border-radius: 0.7rem;
    :hover{
        background: #ff00aa;
        color: white;
    }
`

const MenuSyt = styled.div`
    background: black;
    color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: 100px;
    align-items: center;
    h1 {
        color: #72ffd4;
    }
    a {
        color: white;
        text-decoration: none;
        :hover{
            color: #ff00aa;
        }
    }
    ul{
        display: flex;
        align-items: center;
        li{
            list-style: none;
            margin: 0 15px;
        }
            .email-user{
                a{
                    color: #ff00aa;
                    :hover{
                        text-decoration: underline;
                        text-decoration-color: #ff00aa;
                        transition: 0.3s;

                    }
                }
            }
    }

`
const Menu = () => {

    const { user, Signout } = useContext(AuthContext)

    console.log(user)
    return(
        <MenuSyt>
            <h1> THE GUITAR NEXT </h1>
            <ul>
                <li>
                    <Link href = "/" key = "home">
                        <a> Home </a>
                    </Link>
                </li>
                <li>
                    <Link href = "/products" key = "product">
                        <a> Product </a>
                    </Link>
                </li>
                {user && (
                   <>
                    <li>
                        <Link href = "/cart" >
                            <a> Cart </a>
                        </Link>
                    </li>
                    <li>
                        <Link href = "/manageProduct" >
                            <a> Your product </a>
                        </Link>
                    </li>
                    <li className = "email-user">
                        <Link href = "/cart" >
                            <a> {user.email} </a>
                        </Link>
                    </li>
                    <ButLogout onClick = { Signout } > Logout </ButLogout>
                   </>
                )}
                {!user && (
                   <>
                    <li>
                        <Link href = "/register/signUp" >
                          <a> Sign Up </a>
                        </Link>
                    </li>
                    <li>
                        <Link href = "/register/signIn">
                            <a> Sign In </a>
                        </Link>
                    </li>
                   </>
                )}
            </ul>
        </MenuSyt>
    )
}
export default Menu