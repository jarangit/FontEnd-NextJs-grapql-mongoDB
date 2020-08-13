import Link from 'next/link'
import React, { useContext } from 'react'
import { AuthContext } from '../../appState/authProvider'
import styled from 'styled-components'
import Router from 'next/router'

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
        color: white;
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
            <h1> GUITARNEX </h1>
            <ul>
                <li>
                    <a href = "/" key = "home"> Home </a>
                </li>
                <li>
                    <a href = "/products" key = "product"> Product </a>
                </li>
                {user && (
                   <>
                    <li>
                        <a href = "/cart"> Cart </a>
                    </li>
                    <li>
                        <a href = "/myproducts" >
                             My product 
                        </a>
                    </li>
                    <li className = "email-user">
                        <Link href = "/user/[userID]" as = {`/user/${user.id}`} replace >
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