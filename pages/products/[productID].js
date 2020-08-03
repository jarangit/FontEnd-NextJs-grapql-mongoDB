import React from 'react'
import { useQuery } from "@apollo/react-hooks"
import { useRouter } from "next/router"
import gql from "graphql-tag"
import apolloClient from '../../apollo/apolloClient'


const QUERY_PRODUCT = gql`
    query QUERY_PRODUCT ($id: ID!){
        product(id: $id){
            name
            description
            price
            imageUrl
        }
    }
`
const Products = () => {
    const route = useRouter()

    const { data, loading, error } = useQuery(QUERY_PRODUCT, {variables: { id: route.query.productID }})

    if (error) return <p>Ooobs...something went wrong, please try again later.</p>

    if (loading) return <p>Loading...</p>
    
    const {name, description, price, imageUrl} = data.product
    return (
        <div>
            <img src = {imageUrl}  alt = {description} width = "150" />
            <h1> {name} </h1>
            <p> {description} </p>
            <p> {price} </p>
            <button> Add to cart </button>
        </div>
    )
}

export default apolloClient(Products)
