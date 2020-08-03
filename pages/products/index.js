import React from 'react'
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import styled from 'styled-components'
import apolloClient from '../../apollo/apolloClient'
const BoxPro = styled.div`
  display: flex;
  div{
    border: 1px solid;
    margin: 10px;
    padding: 10px;
  }
`


const QUERY_PRODUCTS = gql`
  query {
    products {
      name  
      id
      description
      price
      imageUrl
    }
  }
`
const ProductPage = () => {
    const { data, loading, error } = useQuery(QUERY_PRODUCTS, {pollInterval: 3000})

  if (error) return <p>Ooobs...something went wrong, please try again later.</p>

  if (loading) return <p>Loading...</p>
    console.log(data)
    return (
        <BoxPro>
            {data.products.map(items => {
                return(
                    <div key = {items.id} >
                        <h3>{items.name}</h3>
                        <p>{items.price}</p>
                        <img src = {items.imageUrl} width = "100" /> 
                    </div>
                )
            })}
        </BoxPro>
    )
}

export default apolloClient(ProductPage)
