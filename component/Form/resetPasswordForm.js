  
import React, { useState } from "react"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { useRouter } from 'next/router'


//DATA
// const REQUEST_RESET_PASSWORD = gql`
//   mutation REQUEST_RESET_PASSWORD($email: String!) {
//     requestResetPassword (email: $email) {
//         message
//     }
//   }
// `
//VIEW
const ResetPasswordForm = () => {
    const [password, setPassword] = useState("")

    const router = useRouter()
    console.log(router.query)
    // const [requestResetPassword, { loading, error }] = useMutation(
    //     REQUEST_RESET_PASSWORD,
    //     {
    //       variables: { email },
    //       onCompleted: data => {
    //         if (data) {
    //           setMessage(data.requestResetPassword.message)
    //         }
    //       }
    //     }
    //   )

      const handleChange = e => {
        setPassword(e.target.value)
        console.log(e.target.value)
      }
    // console.log(EmailUser)

    const handleSubmit = async e => {
        try {
          e.preventDefault()
          // await requestResetPassword()
        } catch (error) {
          console.log(error)
        }
      }
    
    return (
        <div>
            <form onSubmit = {handleSubmit}>
                <p> New Password </p>
                <input placeholder = "New password" onChange = {handleChange}   />     
                <button type = "submit" > Submit </button> 
                <div style = {{color: "green"}} ><strong> 123 </strong></div>
            </form>
            {/* <div>
                    {error && (
                    <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
                    )}
                </div> */}
        </div>
    )
}

export default ResetPasswordForm
