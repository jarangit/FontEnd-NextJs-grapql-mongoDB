import React, { useContext } from 'react'
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { AuthContext } from '../../appState/authProvider'


const UserData = () => {
  const { user } = useContext(AuthContext)

  console.log(user)

    return (
        <div className = "container">
           {user &&(
             <h1> Name: {user.name} </h1>
           )}
        </div>
    )
}

export default UserData
