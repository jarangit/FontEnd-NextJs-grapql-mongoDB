import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'


export const ME = gql`
  query ME {
    user {
      id
      name
      email
      products {
        id
        name
        description
        imageUrl
        price
      }
    }
  }
`
const UserProducts = () => {

    const { data, loading, error } = useQuery(ME)
    console.log(data)
    return (
        <div>
            { data && 
                data.user.products.map(items => (
                    <div>name:  {items.name} </div>
                ))
            }
        </div>
    )
}

export default UserProducts
