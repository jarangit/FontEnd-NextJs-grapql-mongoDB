import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from "graphql-tag"
import Link from "next/link"
import Cookies from 'js-cookie'
import Router from 'next/router'
import { AuthContext } from '../../appState/authProvider'


//Sty
const FormSty = styled.form`
    width: 300px;
    margin: 0 auto;
    align-items: center;
`
//END STY


//DATA

const LOG_IN = gql`
    mutation LOG_IN ($email: String!, $password: String!) {
        login ( email: $email, password: $password ){
            jwt
            user {
                id
                name
                email
                products {
                    id
                    name
                }
                carts {
                    id
                    quantity
                    product { 
                        id
                        name
                        description
                        price
                        imageUrl
                    }
                }
            }
        }
    }
`

//END DATA

const SignInForm = () => {

    //HOOK
    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    //useContext from  appState for change menu when user login
    const { setAuthUser } = useContext(AuthContext)


    //END HOOK

    //FUNC
    const [login, { loading, error }] = useMutation(LOG_IN, {
        variables: { ...userInfo },
        onCompleted: data => {
            if (data) {
                Cookies.set('jwt', data.login.jwt)
                console.log(data)
                setUserInfo({
                    email: " ",
                    password: " "
                })
                setAuthUser(data.login.user)
                Router.push('/products')
            }
        }
    })

    const handleChange = e => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            await login()
        } catch (error) {
            console.log(error)
        }
    }

    //END FUNC

    //VIEW
    return (
        <div>
            <FormSty onSubmit={handleSubmit}>
                <h3>Sign up</h3>
                <input type="text" name="email" placeholder="Email" onChange = {handleChange}/>
                <input type="text" name="password" placeholder="Password" onChange = {handleChange} />
                <div>
                <button type="submit"> Sign Up </button>
                    <p> 
                        Forgot password ? <Link href="/register/requestPassword"><a>Click here</a></Link> 
                    </p>
                </div>
                <div>
                    {error && (
                    <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
                    )}
                </div>
            </FormSty>
        
                
        </div>
    )
}

export default SignInForm

