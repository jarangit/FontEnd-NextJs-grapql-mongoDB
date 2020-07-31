import React from 'react'
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

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
    const { data, loading, error } = useQuery(QUERY_PRODUCTS)

  if (error) return <p>Ooobs...something went wrong, please try again later.</p>

  if (loading) return <p>Loading...</p>
    console.log(data)
    return (
        <div>
            {data.products.map(items => {
                return(
                    <div key = {items.id} >
                        <h3>{items.name}</h3>
                        <p>{items.price}</p>
                        <img src = {items.imageUrl} width = "100" /> 
                    </div>
                )
            })}
        </div>
    )
}

export default ProductPage
