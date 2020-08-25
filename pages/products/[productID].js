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
            }
        }
    }
`
const Products = () => {
    const route = useRouter()
    const { data, loading, error } = useQuery(QUERY_PRODUCT, {variables: { id: route.query.productID }})

    if (error) return <p>Ooobs...something went wrong, please try again later.</p>

    if (loading) return <p>Loading...</p>
    console.log(data.product)

    const {
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
            <img src = {imageUrl}  alt = {description} width = "150" />
            <h1> {name} </h1>
            <p> รายละเอียด: {description} </p>
            <p> ราคา: {price} </p>
            <p> ที่อยู่: {address} </p>
            <p> เหตุผลที่ขาย: {reason_sell} </p>
            <p> การจัดส่ง: {shipping} </p>
            <p> อายุการใช้งาน: {pd_life} เดือน</p>
            <p> สภาพสินค้า: {integrity} % </p>

            <div>
                ประเภทสินค้า: {productCategory.name}
            </div>         

            <div>
                <h3> คุณสมบัติ </h3>
                {pd_options_attr.map(items => {
                    console.log(items)
                    return(
                        <div>
                            <p>{ items.name }</p>
                        </div>
                    )
                })}
            </div>
            
            <button> Add to cart </button>
        </div>
    )
}

export default apolloClient(Products)
