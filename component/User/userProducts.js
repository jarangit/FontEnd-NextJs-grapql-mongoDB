import React,{ useContext, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import UserProductItems from './userProductItems'
import {AuthContext} from '../../appState/authProvider'

export const ME = gql`
  query ME {
    user {
      id
      name
      email
      address
      tel
      line_id
      image_profile
      products {
        id
        name
        description
        imageUrl
        price
      }
      carts{
        id
        product{
          id
          name
          price
          description
          imageUrl
        }
      }
    }
  }
`
const UserProducts = () => {

    const { data, loading, error } = useQuery(ME)
    const { user, setAuthUser } = useContext(AuthContext)
    console.log(user)
    useEffect(() => {
      if (data) {
        setAuthUser(data.user)
      }
    }, [data])

    console.log(data)
    return (
        <div className = "container" >
          <h1> Your Product </h1>
            { user && 
                user.products.map(items => (
                    <UserProductItems  key = {items.id} products = {items} />
                ))
            }
        </div>
    )
}

export default UserProducts
