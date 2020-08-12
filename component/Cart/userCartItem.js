import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../appState/authProvider'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ME } from '../User/userProducts'
import { useQuery } from '@apollo/react-hooks'



const DELETE_CART = gql`
  mutation DELETE_CART($id: ID!){
    deleteCart(id: $id){
        id
    }
  }
`

const UserCartItem = () => {
    const { user, setAuthUser } = useContext(AuthContext)
    const { data } = useQuery(ME)
  
    useEffect(() => {
      if (data) {
        setAuthUser(data.user)
      }
    }, [data])


    const [deleteCart, { loading, error }] = useMutation (DELETE_CART, {
        onCompleted: data => {
            console.log(data)
        },
        refetchQueries: [{ query: ME, }]
    })


    const handelAddToCart = async (id) => {
        console.log(id)
        await deleteCart({ variables: { id } })
      }



    return (
        <div className = "container" >
            {user &&(
                user.carts.map(items => (
                    <div key = {items.id} >
                        <img src = {items.product.imageUrl} width ="100"/>
                        <p> { items.product.name } </p>
                        <p> { items.product.description } </p>
                        <p> { items.product.price } </p>
                        <button onClick = {() => handelAddToCart(items.id)}> Delete </button>
                    </div>
                ))
            )}
        </div>
    )
}

export default UserCartItem
