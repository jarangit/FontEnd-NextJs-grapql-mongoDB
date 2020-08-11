import React, { useContext } from 'react'
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import styled from 'styled-components'
import {AuthContext} from '../../appState/authProvider'
import ProductList from './productList'

const BoxPro = styled.div`
  display: flex;
  flex-wrap: wrap;
  div{
    border: 1px solid;
    margin: 10px;
    padding: 10px;
  }
`


export const QUERY_PRODUCTS = gql`
  query {
    products {
      name  
      id
      description
      price
      imageUrl
      user{
        id
      }
    }
  }
`
const ShowAllProduct = () => {
    const { data, loading, error } = useQuery(QUERY_PRODUCTS)

    const { user } = useContext(AuthContext)
    // console.log(user)

    if (error) return <p>Ooobs...something went wrong, please try again later.</p>

    if (loading) return <p>Loading...</p>

    

    return (
        <div className = "container">
            <h1 style = { {textAlign: "center"} } > PRODUCT </h1>
            <BoxPro>
            {data.products.map(items => {
                return(
                    <ProductList product = {items} />
                )
            })}
          </BoxPro>
        </div>
    )
}

export default ShowAllProduct
