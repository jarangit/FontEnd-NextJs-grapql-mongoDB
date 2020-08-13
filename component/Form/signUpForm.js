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

const LoginSty = styled.div`
    display: flex;
    width: 100%;
    #jr-from-login{
        width: 50%;
        form{
            padding: 20px;
            margin: 100px auto;
            width: 500px;
            border-radius: 1em;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
            h2{
                text-align: center;
            }
            input{
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
                height: 35px;
                width: 100%;
            }
            button{
                color: white;
                background: black;
                border-color: black;
                padding: 5px;
                margin: 10px 0;
                width: 50%;

            }
        }
    }
    #jr-banner-login{
        width: 50%;
        img{
            width: 100%;
        }
    }
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
        <LoginSty>
            <div id = "jr-from-login" >
                <form onSubmit={handleSubmit}>
                        <h2>Sign up</h2>
                        <label> Username </label>
                        <input type = "text" name = "name" placeholder = "Username" onChange = {handleChange} value = { userInfo.name }/>

                        <label> Email </label>
                        <input type = "text" name = "email" placeholder = "Email"  onChange = {handleChange} value = { userInfo.email } />

                        <label> Password </label>
                        <input type = "password" name = "password" placeholder = "Password"  onChange = {handleChange} value = { userInfo.password } />
                        <button type = "submit"> Sign Up </button>
                        <div>
                            <ul>
                                <li> <a href = 'http://localhost:4444/auth/facebook' > FACEBOOK </a></li>
                                <li> <a href = '/' > GOOGLE </a></li>
                            </ul>
                        </div>
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
                </form>
            </div>
            <div id = 'jr-banner-login'>
                <img src="https://res.cloudinary.com/the-guitar-next/image/upload/v1597081618/the-guitar-next/pgvllapjmrh7emlmf8se.png" />
            </div>
        </LoginSty>

    )
}

export default SignUpForm
