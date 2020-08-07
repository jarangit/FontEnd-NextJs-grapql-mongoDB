import React, { useContext } from 'react'
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"


export const ME = gql`
  query ME {
    user {
      id
      name
      email
      products {
        id
        description
        imageUrl
        price
      }
    }
  }
`

const UserData = () => {

    const { data, loading, error } = useQuery(ME)

    return (
        <div className = "container">
            <div>
                {data && (
                    <div>
                        <h1> Name: {data.user.name} </h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserData
