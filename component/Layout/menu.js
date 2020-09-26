import Link from 'next/link'
import React, { useContext } from 'react'
import { AuthContext } from '../../appState/authProvider'
import styled from 'styled-components'
import Router from 'next/router'

const ButLogout = styled.button`
    background: none;
    color: #8E69D0;
    border: 1px solid #8E69D0;
    padding: 10px;
    border-radius: 0.7rem;
    :hover{
        background: #8E69D0;
        color: white;
    }
`

const MenuSyt = styled.div`
    background: #232323;
    color: white;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    /* height: 100px; */
    align-items: center;
    h1 {
        color: white;
    }
    a {
        color: #87A9A8;
        text-decoration: none;
        :hover{
            color: #DDEEEF;
        }
    }
    ul{
        padding: 0px;
        display: flex;
        align-items: center;
        li{
            list-style: none;
            margin: 0 15px;
        }
            .email-user{
                a{
                    color: #8E69D0;
                    :hover{
                        text-decoration: underline;
                        text-decoration-color: #8E69D0;
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
        <div style = {{ background: '#232323' }}>
            <MenuSyt className = 'container'>
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
                        <a href = "/cart_items"> Cart </a>
                    </li>
                    <li>
                        <a href = "/user_products" >
                             My product 
                        </a>
                    </li>
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
        </div>
    )
}
export default Menu