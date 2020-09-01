import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { QUERY_PRODUCTS } from './showAllProduct'
import fetch from 'isomorphic-unfetch'
import { useQuery } from '@apollo/react-hooks'
import { ME } from '../User/userProducts'
import { AuthContext } from '../../appState/authProvider'



const FormSty = styled.form`
    display: inline-block;
`



const CREATE_PRODUCT = gql`
  mutation CREATE_PRODUCT(
    $name: String!
    $description: String!
    $address: String!
    $reason_sell: String
    $shipping: String!
    $price: Float!
    $pd_life: Float!
    $integrity: Float!
    $imageUrl: String
    $productCategory: String!
    $pd_options_attr: [String]
  ) {
    createProduct(
        name:$name
        description: $description
        price: $price
        address: $address
        imageUrl: $imageUrl
        pd_options_attr: $pd_options_attr
        shipping: $shipping
        pd_life: $pd_life
        integrity: $integrity
        productCategory: $productCategory
        reason_sell: $reason_sell
    ){
        id
        name
    }
  }
`


const CreateProductForm = () => {
    const { user, setAuthUser } = useContext(AuthContext)
    const { data } = useQuery(ME)
    //https://api.cloudinary.com/v1_1/the-guitar-next/image/upload
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        imageUrl: "",
        price: "",
        address: "",
        pd_options_attr: "",
        shipping: "",
        pd_life: "",
        integrity: "",
        productCategory: "",
        reason_sell: ""
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
            // const urlImg = await UploadFiles()
            const urlImg = "https://res.cloudinary.com/the-guitar-next/image/upload/v1598983747/the-guitar-next/uxzu7fbvladtszcvvdcm.jpg"
            console.log(urlImg)
            if (urlImg) {
                const result = await createProduct({
                    variables: { 
                        ...productData, 
                        price: +productData.price,
                        pd_life: +productData.pd_life,
                        integrity: +productData.integrity,
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
                price: '',
                address: '',
                pd_options_attr: '',
                shipping: '',
                pd_life: '',
                integrity: '',
                productCategory: '',
                reason_sell: ''
              })
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (data) {
          setAuthUser(data.user)
        }
      }, [data])

    console.log(productData)
    return (
        <div className = "container">
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
                    <strong> Address </strong><input type = "text" placeholder = "ที่อยู่" name = "address" value = {productData.address} onChange = {handleChange}/>
                </div>
                <div>
                    <strong> ProductCategory </strong><input type = "text" placeholder = "หมวดหมู่" name = "productCategory" value = {productData.productCategory} onChange = {handleChange}/>
                </div>
                <div>
                    <strong> คุณสมบัตร </strong><input type = "text" placeholder = "คุณสมบัตร" name = "pd_options_attr" value = {productData.pd_options_attr} onChange = {handleChange}/>
                </div>
                <div>
                    <strong> การจัดส่ง </strong><input type = "text" placeholder = "การจัดส่ง" name = "shipping" value = {productData.shipping} onChange = {handleChange}/>
                </div>
                <div>
                    <strong> อายุการใช้งาน </strong><input type = "number" placeholder = "อายุการใช้งาน" name = "pd_life" value = {productData.pd_life} onChange = {handleChange}/>
                </div>
                <div>
                    <strong> สภาพสินค้า </strong><input type = "number" placeholder = "สภาพสินค้า" name = "integrity" value = {productData.integrity} onChange = {handleChange}/>
                </div>
                {/* <div>
                    <strong> Image </strong><input type = "file" placeholder = "Image-URL" name = "file" onChange = {SelectFiles}/>
                </div> */}
                <button 
                type = "submit" 
                // disabled={
                //     !productData.description || !file || !productData.price || loading
                //   }
                > {loading? ('loading'):('update')}</button>
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
