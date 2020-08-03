import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from "graphql-tag"
import Link from "next/link"
import React, {useState} from 'react'


//Sty
const FormSty = styled.form`
    width: 200px;
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

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const [login, { loading, error }] = useMutation(LOG_IN, {
        variables: { ...userInfo },
        onCompleted: data => {
            if (data) {
                console.log(data)
                setUserInfo({
                    email: " ",
                    password: " "
                })
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

    //VIEW
    return (
        <div>
            <FormSty onSubmit={handleSubmit}>
                <h3>Sign up</h3>
                <input type="text" name="email" placeholder="Email" onChange = {handleChange}/>
                <input type="text" name="password" placeholder="Password" onChange = {handleChange} />
                <button type="submit"> Sign Up </button>
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

