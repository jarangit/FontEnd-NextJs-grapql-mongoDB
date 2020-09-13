import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { QUERY_PRODUCTS } from './showAllProduct'
import fetch from 'isomorphic-unfetch'
import { useQuery } from '@apollo/react-hooks'
import { ME } from '../User/userProducts'
import { AuthContext } from '../../appState/authProvider'
import C_ProForm_SELECTID_CAT from './createProductFrom_selectCatID'
import C_ProForm_SELECTID_ATT from './createProductFrom_selectAtt'
import Router from 'next/router'

const FormSty = styled.form`
    display: inline-block;
`



const CREATE_PRODUCT = gql`
  mutation CREATE_PRODUCT(
    $name: String!
    $description: String!
    $address: String!
    $reason_sell: String
    $shipping: [String]!
    $price: Float!
    $pd_life: Float!
    $integrity: Float!
    $imageUrl: String!
    $image_gallery: [String]
    $productCategory: String!
    $pd_options_attr: [String]
  ) {
    createProduct(
        name: $name
        description: $description
        address: $address
        reason_sell: $reason_sell
        shipping: $shipping
        price: $price
        pd_life: $pd_life
        integrity: $integrity
        imageUrl: $imageUrl
        image_gallery: $image_gallery
        productCategory: $productCategory
        pd_options_attr: $pd_options_attr
    ){
        id
        name
    }
  }
`


const CreateProductForm = () => {
    const { user, setAuthUser } = useContext(AuthContext)
    const { ID_CatPro_FromC, setID_CatPro_FromC,  ID_ATTPro_FromC, setID_ATTPro_FromC} = useContext(AuthContext)
    const [IDShipping, setIDShipping] = useState([])
    const [OB_IMG_S, setOB_IMG_S] = useState([])

    const { data } = useQuery(ME)
    //https://api.cloudinary.com/v1_1/the-guitar-next/image/upload
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        imageUrl: "",
        image_gallery: "",
        price: "",
        address: "",
        pd_options_attr: ID_ATTPro_FromC,
        shipping: IDShipping,
        pd_life: "",
        integrity: "",
        productCategory: ID_CatPro_FromC,
        reason_sell: ""
      })
    const [success, setSuccess] = useState('')
    const [file, setFiles] = useState(null)
    const [files_image_gallery, setfiles_image_gallery] = useState([])
    
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
    const SelectMultiFiles = e => {
        const files = e.target.files
        console.log(files)
        setfiles_image_gallery(files)
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
    const Upload_image_gallery = async () => {
        let url = []
        for (let i = 0; i < files_image_gallery.length; i++) {
            const data = new FormData()
            data.append('file', files_image_gallery[i])
            data.append('upload_preset', 'the-guitar-next')

            const res = await fetch(
                'https://api.cloudinary.com/v1_1/the-guitar-next/image/upload',
                {
                    method: 'post',
                    body: data
                }
            )


            const result = await res.json()

            console.log(result.secure_url);
            console.log('เสร็จ');
            let y = 1
            url.push(result.secure_url)
            console.log(url)
            // return console.log('ออกละ')
        }  

        return url

    }

    const handleSubmit = async e => {   
        try{
            e.preventDefault()
            console.log(productData)
            // const urlImg = await UploadFiles()
            const url_img_multi = await Upload_image_gallery()
            const urlImg = "https://res.cloudinary.com/the-guitar-next/image/upload/v1598983747/the-guitar-next/uxzu7fbvladtszcvvdcm.jpg"
            console.log(url_img_multi)
            if (url_img_multi) {
                const result = await createProduct({
                    variables: { 
                        ...productData, 
                        price: +productData.price,
                        pd_life: +productData.pd_life,
                        integrity: +productData.integrity,
                        imageUrl: urlImg,
                        image_gallery: url_img_multi,
                        productCategory: ID_CatPro_FromC,
                        pd_options_attr: ID_ATTPro_FromC,
                        shipping: IDShipping
                    }
                })
                console.log(result)
            }

            setSuccess("เรียบร้อย")
            setProductData({
                name: '',
                description: '',
                imageUrl: '',
                image_gallery: '',
                price: '',
                address: '',
                pd_options_attr: '',
                shipping: '',
                pd_life: '',
                integrity: '',
                productCategory: '',
                reason_sell: ''
              })
              setID_ATTPro_FromC([])
              setID_CatPro_FromC('')
              document.getElementById("Sel_Pro_Att").reset();


        } catch (error) {
            console.log(error)
        }
    }

    const GetID_Shipping = () => {
        const findIdAtt =  IDShipping.find(e => e === event.target.id)
        console.log(findIdAtt)
       if(findIdAtt){
        setIDShipping(IDShipping.filter((e)=>(e !== event.target.id)))

       }else {
           let idAAtt = event.target.id
           setIDShipping(id => [...id, `${idAAtt}`])
       }
        console.log(IDShipping)
       

    }

    useEffect(() => {
        if (data) {
          setAuthUser(data.user)
        }
      }, [data])

    // console.log(productData)
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
                    {/* <strong> ProductCategory </strong><input type = "text" placeholder = "หมวดหมู่" name = "productCategory" value = {productData.productCategory} onChange = {handleChange}/> */}
                    <C_ProForm_SELECTID_CAT/>
                </div>
                <div>
                    <C_ProForm_SELECTID_ATT />
                </div>
                <div>
                    <strong> การจัดส่ง </strong><input type = "text" placeholder = "การจัดส่ง" name = "shipping" value = {productData.shipping} onChange = {handleChange}/>
                    <form>
                        <input id = 'UTU'type = 'checkbox' onClick = {GetID_Shipping}/>
                        <label> นัดรับสินค้า </label>
                        <input id = "MESS" type = 'checkbox' onClick = {GetID_Shipping}/>
                        <label> จัดส่งสินค้าโดยระบบขนส่ง </label>
                    </form>
                </div>
                <div>
                    <strong> อายุการใช้งาน </strong><input type = "number" placeholder = "อายุการใช้งาน" name = "pd_life" value = {productData.pd_life} onChange = {handleChange}/>
                </div>
                <div>
                    <strong> สภาพสินค้า </strong><input type = "number" placeholder = "สภาพสินค้า" name = "integrity" value = {productData.integrity} onChange = {handleChange}/>
                </div>
                <div>
                    <strong> รูปหบักสินค้า </strong><input type = "file" placeholder = "Image-URL" name = "file" onChange = {SelectFiles}/>
                </div>
                <div>
                    <strong> รูปสินค้าเพิ่มเติม </strong><input type = "file" placeholder = "Image-URL" name = "file" multiple="multiple" onChange = {SelectMultiFiles}/>
                </div>
                <button onClick = {Upload_image_gallery} > Test Upload_image_gallery </button>
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
