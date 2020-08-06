  
import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"


//DATA
const REQUEST_RESET_PASSWORD = gql`
  mutation REQUEST_RESET_PASSWORD($email: String!) {
    requestResetPassword (email: $email) {
        message
    }
  }
`
//VIEW
const RequestPasswordForm = () => {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")


    const [requestResetPassword, { loading, error }] = useMutation(
        REQUEST_RESET_PASSWORD,
        {
          variables: { email },
          onCompleted: data => {
            if (data) {
              setMessage(data.requestResetPassword.message)
            }
          }
        }
      )

      const handleChange = e => {
        setEmail(e.target.value)
        setMessage('')
      }
    // console.log(EmailUser)

    const handleSubmit = async e => {
        try {
          e.preventDefault()
          setEmail('')
          await requestResetPassword()
        } catch (error) {
          console.log(error)
        }
      }
    
    return (
        <div>
            <form onSubmit = {handleSubmit} >
                <p> Your Email </p>
                <input placeholder = "your email"  onChange = {handleChange} value = {email} />     
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

export default RequestPasswordForm
