import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { QUERY_PRODUCTS } from './showAllProduct'




const FormSty = styled.form`
    display: inline-block;
`



const CREATE_PRODUCT = gql`
  mutation CREATE_PRODUCT(
    $name: String!
    $description: String!
    $imageUrl: String!
    $price: Float!
  ) {
    createProduct(
      name: $name
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


const CreateProductForm = () => {

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        price: ''
      })

    const [success, setSuccess] = useState('')

    const [createProduct, { loading, error }] = useMutation (CREATE_PRODUCT, {
        variables: { ...productData, price: +productData.price },
        refetchQueries: [{ query: QUERY_PRODUCTS }]
    })


    const handleChange = e => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async e => {
        try{
            e.preventDefault()
            console.log(productData)
            const result = await createProduct()
            setSuccess("เรียบร้อย")
            setProductData({
                name: '',
                description: '',
                imageUrl: '',
                price: ''
              })
        } catch (error) {
            console.log(error)
        }
    }
    console.log(productData)
    return (
        <div className = "container">
            <h1> Product Name  </h1>
            <form onSubmit = {handleSubmit} >
                <div>
                    <strong> Name </strong><input type = "text" placeholder = "Name" name = "name" value = {productData.name} onChange = {handleChange}/>
                </div>
                <div>
                    <strong> Description </strong><input type = "text" placeholder = "Description" name = "description" value = {productData.description} onChange = {handleChange} />
                </div>
                <div>
                    <strong> Price </strong><input type = "number" placeholder = "Price" name = "price" value = {productData.price} onChange = {handleChange}/>
                </div>
                <div>
                    <strong> Image </strong><input type = "text" placeholder = "Image-URL" name = "imageUrl" value = {productData.imageUrl} onChange = {handleChange}/>
                </div>
                <button type = "submit"> Update </button>
            </form>
            <strong> {success} </strong>
            <p>https://www.loveyouflower.com/wp-content/uploads/2014/02/A084.jpg</p>
            <div style={{ width: '30%', margin: 'auto' }}>
                {error && (
                <p style={{ color: 'red' }}>{error.graphQLErrors[0].message}</p>
                )}
             </div>
        </div>
    )
}

export default CreateProductForm
