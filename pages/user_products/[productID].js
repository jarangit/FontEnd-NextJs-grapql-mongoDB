import React from 'react'
import { useQuery } from "@apollo/react-hooks"
import { useRouter } from "next/router"
import gql from "graphql-tag"
import apolloClient from '../../apollo/apolloClient'
import EditProduct from '../../component/User/editProducts'

const QUERY_PRODUCT = gql`
    query QUERY_PRODUCT ($id: ID!){
        product(id: $id){
            id
            name
            description
            price
            imageUrl
            address
            reason_sell
            shipping
            pd_life
            integrity
            productCategory{
                name
            }
            user{
                id
                name
            }
            pd_options_attr{
                id
                name
                opVal
                parentName
            }
        }
    }
`
const UserProducts = () => {
    const route = useRouter()
    const { data, loading, error } = useQuery(QUERY_PRODUCT, {variables: { id: route.query.productID }})

    if (error) return <p>Ooobs...something went wrong, please try again later.</p>

    if (loading) return <p>Loading...</p>

    const {
        id,
        name, 
        description, 
        price, 
        imageUrl, 
        address,
        reason_sell,
        shipping,
        pd_life,
        integrity,
        productCategory,
        pd_options_attr,
        user
    } = data.product

    return (
        <div>
            <EditProduct product = {data.product} />
        </div>
    )
}

export default apolloClient(UserProducts)
