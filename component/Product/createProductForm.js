import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { QUERY_PRODUCTS } from './showAllProduct'
import fetch from 'isomorphic-unfetch'



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
    //https://api.cloudinary.com/v1_1/the-guitar-next/image/upload
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        price: ''
      })

    const [success, setSuccess] = useState('')
    const [file, setFiles] = useState(null)
    
    const [createProduct, { loading, error }] = useMutation (CREATE_PRODUCT, {
        refetchQueries: [{ query: QUERY_PRODUCTS }]
    })


    const handleChange = e => {
        setProductData({ ...productData, [e.target.name]: e.target.value })
    }

    const SelectFiles = e => {
        const files = e.target.files
        setFiles(files[0])
    }


    const UploadFiles = async () => {
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'the-guitar-next')

        const res = await fetch(
            'https://api.cloudinary.com/v1_1/the-guitar-next/image/upload',
            {
                method: 'post',
                body: data
            }
        )

        const result = await res.json()
        
        return result.secure_url
         
    }

    const handleSubmit = async e => {
        try{
            e.preventDefault()
            console.log(productData)
            const urlImg = await UploadFiles()
            if (urlImg) {
                const result = await createProduct({
                    variables: { 
                        ...productData, 
                        price: +productData.price,
                        imageUrl: urlImg
                    }
                })
                console.log(result)
            }

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
                    <strong> Image </strong><input type = "file" placeholder = "Image-URL" name = "file" onChange = {SelectFiles}/>
                </div>
                <button 
                type = "submit" 
                disabled={
                    !productData.description || !file || !productData.price || loading
                  }
                > Update </button>
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
