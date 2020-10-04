import Link from 'next/link'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import React, { useContext } from 'react'
import { AuthContext } from '../../appState/authProvider'
const DIV = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    color: white;
    a{
        padding: 0 10px;
        text-decoration: none;
        color: black;

    }
    #topBar-gmail{
        color: #566068;
    }
    div{
        button{
            border-color: #566068;
            border-radius: 0.3rem;
            background: none;   
            color: white;
            padding: 5px;
            :focus {
                outline: none;
                box-shadow: none;
            }
            :hover{
                color: black;
                background: #DDEEEF;
            }
        }
    }
    `
const TopBar = () => {
    const { user, Signout } = useContext(AuthContext)

    return (
        <div>
            <DIV className = "container">
            <div id = "topBar-gmail" >
                {/* <strong>theguitarnext@gmail.com</strong> */}
                
            </div>
            <div>
                {!user? (
                    <>
                        <span style = {{ color: "#999999" }}><FontAwesomeIcon icon={faUser} /> My account </span>
                        <Link href = "/register/signIn" >
                            <a> <FontAwesomeIcon icon={faSignInAlt} /> Login </a>
                        </Link>
                    </>
                ):(
                    <>
                        <Link href = "/user/[userID]" as = {`/user/${user.id}`}>
                            <a><FontAwesomeIcon icon={faUser} color = "#5EBA7D"/> My account </a>
                        </Link>
                        <button onClick = {Signout} > <FontAwesomeIcon icon={faSignInAlt} /> Logout </button>
                    </>
                )}
            </div>
        </DIV>
        </div>
    )
}

export default TopBar
