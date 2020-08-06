  
import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useRouter } from 'next/router'


//DATA
const RESET_RESET_PASSWORD = gql`
  mutation RESET_RESET_PASSWORD($password: String!, $token: String!) {
    resetResetPassword (password: $password, token: $token) {
        message
    }
  }
`
//VIEW
const ResetPasswordForm = () => {
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const router = useRouter()
    console.log(router.query.resetToken)
    const [resetResetPassword, { loading, error }] = useMutation(
        RESET_RESET_PASSWORD,
        {
          variables: { password, token: router && router.query.resetToken},
          onCompleted: data => {
            if (data) {
              setMessage(data.resetResetPassword.message)
            }
          }
        }
      )

      const handleChange = e => {
        setPassword(e.target.value)
        console.log(e.target.value)
      }
    // console.log(EmailUser)

    const handleSubmit = async e => {
        try {
          e.preventDefault()
          setPassword('')
          await resetResetPassword()
          console.log(password)
        } catch (error) {
          console.log(error)
        }
      }
    
    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <p> New Password </p>
                <input type = "password" placeholder = "New password" onChange = {handleChange}  value = {password} />     
                <button type = "submit" > Submit </button> 
                <div style = {{color: "green"}} ><strong> {message} </strong></div>
            </form>
            <div>
                    {error && (
                    <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
                    )}
                </div>
        </div>
    )
}

export default ResetPasswordForm
