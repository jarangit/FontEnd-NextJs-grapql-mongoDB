import React, { useContext } from 'react'
import Link from 'next/link'
import {AuthContext} from '../../appState/authProvider'
import styled from 'styled-components'
import Router from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ME } from '../User/userProducts'


const ADDTOCART = gql`
  mutation ADDTOCART($id: ID!){
    addToCart(id: $id){
      id
      quantity
      product{
        id
        name
        imageUrl
        price
        description
      }
    }
  }
`
const ProductList = ({product}) => {
    const { user } = useContext(AuthContext)

    const [addToCart, { loading, error }] = useMutation (ADDTOCART, {
        onCompleted: data => {
            console.log(data)
        },
        refetchQueries: [{ query: ME }]
    })


    const handelAddToCart = async (id) => {
        if (!user){
            return Router.push('/register/signIn')
        }
        console.log(id)
        await addToCart({ variables: { id } })
      }
    let buttomy

    if(user && user.id === product.user.id){
      console.log(user)
      buttomy = <button onClick = {() => Router.push('/manageProduct')} > Your Product </button> 
    }else if( user && user.id === product.user.id ){
      buttomy = <button style = {{background: "yellow"}} onClick = {() => handelAddToCart(product.id)} > Add to cart </button>
    }else{
      buttomy = <button style = {{background: "green"}} onClick = {() => handelAddToCart(product.id)} > Add to cart </button>
    }
    // console.log(user && user.carts.user.id)
    return (
            <div key = {product.id} >
                        <img src = {product.imageUrl} width = "100" /> 
                        <Link  href = "/products/[prodoctID]" as = {`/products/${product.id}`}>
                          <a > <h3>{product.name}</h3> </a>
                        </Link>
                        <p>{product.price}</p>
                          {/* {user && user.id === product.user.id ?(
                            <button onClick = {() => Router.push('/manageProduct')} > Your Product </button>
                            ):(
                              <button style = {{background: "green"}} onClick = {() => handelAddToCart(product.id)} > Add to cart </button>
                          )} */}
                          {buttomy}
            </div>
    )
}

export default ProductList
