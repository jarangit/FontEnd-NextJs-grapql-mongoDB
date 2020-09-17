import React from 'react'
import { useQuery } from "@apollo/react-hooks"
import { useRouter } from "next/router"
import gql from "graphql-tag"
import apolloClient from '../../apollo/apolloClient'
import EditProduct from '../../component/User/editProducts'
import {QUERY_PRODUCT} from '../products/[productID]'

const UserProducts = () => {
    const route = useRouter()
    const { data, loading, error } = useQuery(QUERY_PRODUCT, {variables: { id: route.query.productID }})
    if (error) return <p>Ooobs...something went wrong, please try again later.</p>

    if (loading) return <p>Loading...</p>

    return (
        <div>
            <EditProduct product = {data.product} />
        </div>
    )
}

export default apolloClient(UserProducts)
