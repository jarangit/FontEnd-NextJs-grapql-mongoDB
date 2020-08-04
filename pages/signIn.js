import React, {useState} from 'react'
import styled from 'styled-components'
import SignInForm from '../component/signInForm'
import apolloClient from '../apollo/apolloClient'


const FormSty = styled.form`
    width: 200px;
    margin: 0 auto;
    align-items: center;
`
const SignIn = () => {
    return (
        <div>
           <SignInForm/>
        </div>
    )
}

export default SignIn
