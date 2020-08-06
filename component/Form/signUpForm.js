import React, {useState} from 'react'
import styled from 'styled-components'
import { useMutation  } from '@apollo/react-hooks'
import gql from "graphql-tag"
import Link from "next/link"

//Sty
const FormSty = styled.form`
    width: 200px;
    margin: 0 auto;
    /* align-items: center; */
`
//END STY


//DATA

const SIGN_UP = gql`
    mutation SIGN_UP ($name: String!, $email: String!, $password: String!) {
        signup ( name: $name, email: $email, password: $password ) { 
            name
            email	
        }
    }
`

//END DATA

const SignUpForm = () => {

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [success, setSuccess] = useState(false)

    const [signup, { loading, error }] = useMutation (SIGN_UP, {
        variables: { ...userInfo },
        onCompleted: data => {
            if (data) {
                console.log(data)
                setSuccess(true)
                setUserInfo({
                    name: " ",
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
        try{
            e.preventDefault()
            await signup()
        } catch (error) {
            console.log(error)
        }
    }
    console.log(success)

    //VIEW
    return (
        <div>
            <FormSty onSubmit={handleSubmit}>
                <h3>Sign up</h3>
                <input type = "text" name = "name" placeholder = "Username" onChange = {handleChange} value = { userInfo.name }/>
                <input type = "text" name = "email" placeholder = "Email"  onChange = {handleChange} value = { userInfo.email } />
                <input type = "text" name = "password" placeholder = "Password"  onChange = {handleChange} value = { userInfo.password } />
                <button type = "submit"> Sign Up </button>

                <div style={{color: "green"}}>
                    {success && (
                        <p>
                            You successfully signed up, please{" "}
                            <Link href="/register/signIn">
                            <a>sign in</a>
                            </Link>
                            .
                        </p>
                    )}
                    {error && (
                    <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
                    )}
                </div>
            </FormSty>
        </div>

    )
}

export default SignUpForm
