import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import gql from 'graphql-tag'
import { QUERY_PRODUCTS } from '../Product/showAllProduct'
import { ME } from './userProducts'

const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $id: ID!
    $name: String
    $description: String
    $imageUrl: String
    $price: Float
  ) {
    updateProduct(
      name: $name
      id: $id
      description: $description
      imageUrl: $imageUrl
      price: $price
    ) {
      name
      id
      description
      price
      imageUrl
    }
  }
`



const UserProductItems = ({products}) => {

    const [edit, setEdit] = useState(false)
    const [file, setFile] = useState(null)
    const [productData, setProductData] = useState(products)

    const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT, {
        onCompleted: data => {
          console.log(data)
          setProductData(data.updateProduct)
          setEdit(false)
        },
        refetchQueries: [{ query: QUERY_PRODUCTS }, { query: ME }]
      })
    const selectFile = e => {
        const files = e.target.files
        setFile(files[0])
      }

    const uploadFile = async () => {
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'graphql-basic')
    
        const res = await fetch(
          'https://api.cloudinary.com/v1_1/aut-media/image/upload',
          {
            method: 'post',
            body: data
          }
        )
        const result = await res.json()
    
        return result.secure_url
      }
    
    const handelChange = e => {
        setProductData({ ...productData, [e.target.name]: e.target.value})
        console.log(productData)
    }
    console.log(products)
    return (
        <div>
            {!edit ? (
                <div>
                    <img src = {productData.imageUrl} width = "100"/>
                    <p> Name: { productData.name } </p>
                    <p> Price: { productData.price } </p> 
                    <p> Description: { productData.description } </p>
                    <button style = {{ background: 'yellow' }} onClick={() => setEdit(true)} > Edit </button>
                    <button style = {{ background: 'red' }} > Delete </button>
                </div>
            ):(
                <div>
                    <img src = {productData.imageUrl} width = "100"/> <input type = "file" placeholder = "Image-URL" name = "file"/>
                    <p> Name: <input type = "text" name = "name" value = {productData.name} onChange = {handelChange} ></input> </p>
                    <p> Price: <input type = "number" name = "price" value = {productData.price} onChange = {handelChange} ></input> </p>
                    <p> Description: <input type = "text" name = "description" value = {productData.description}  onChange = {handelChange} ></input> </p>
                    <button style = {{ background: 'red' }} onClick={() => setEdit(false)} > Cancel </button>
                    <button style = {{ background: 'green' }} > Confirm </button>
                </div>
            )} 
            
            
            <hr/>
        </div>
    )
}

export default UserProductItems
