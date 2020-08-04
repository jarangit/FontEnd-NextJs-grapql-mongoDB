import Link from 'next/link'
import React, { useContext } from 'react'
import { AuthContext } from '../../appState/authProvider'


const Menu = () => {

    const { user } = useContext(AuthContext)

    console.log(user)
    return(
        <div>
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
                        <Link href = "/" >
                            <a> Cart </a>
                        </Link>
                    </li>
                    <button> Logout </button>
                    <li>
                        <strong> {user.name} </strong>
                    </li>
                   </>
                )}
                {!user && (
                   <>
                    <li>
                        <Link href = "/signUp" >
                          <a> Sign Up </a>
                        </Link>
                    </li>
                    <li>
                        <Link href = "/signIn">
                            <a> Sign In </a>
                        </Link>
                    </li>
                   </>
                )}
            </ul>
        </div>
    )
}
export default Menu