import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import {AuthContext} from '../../appState/authProvider'
import styled from 'styled-components'
import Router from 'next/router'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { ME } from '../User/userProducts'
import { useQuery } from '@apollo/react-hooks'


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
  const { user, setAuthUser } = useContext(AuthContext)
  const { data } = useQuery(ME)

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
      const cartProductId = user && user.carts.map(items => items.product.id)
      let buttomy

    if( user && cartProductId.includes(product.id) ){
      buttomy = <button>carted </button>
    }else if (user && user.id === product.user.id){
      buttomy = <button onClick = {() => Router.push('/myproducts')} > Your Product </button>
    }else{
      buttomy = <button style = {{background: "green"}} onClick = {() => handelAddToCart(product.id)} > add to cart </button>
    }

    useEffect(() => {
      if (data) {
        setAuthUser(data.user)
      }
    }, [data])


    return (
            <div key = {product.id} >
                        <img src = {product.imageUrl} width = "300" /> 
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
