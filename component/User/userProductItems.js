import React, { useState, useEffect, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import gql from 'graphql-tag'
import { QUERY_PRODUCTS } from '../Product/showAllProduct'
import { ME } from './userProducts'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../../appState/authProvider'
import Link from 'next/link'
import { useForm } from 'react-hook-form'


const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $id: ID!
    $name: String
    $description: String
    $address: String
    $reason_sell: String
    $price: Float
    $imageUrl: String
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      address: $address
      reason_sell: $reason_sell
      price: $price
      imageUrl: $imageUrl
    ) {
      id
      name
      description
      address
      reason_sell
      price
      imageUrl
      
    }
  }
`

const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($id: ID!){
    deleteProduct(
      id: $id
    ){
      id
    }
  }
`

const UserProductItems = ({products}) => {
    const [edit, setEdit] = useState(false)
    const [file, setFile] = useState(null)
    const [productData, setProductData] = useState(products)
    const { user, setAuthUser } = useContext(AuthContext)
    const { data } = useQuery(ME)
    const { handleSubmit} = useForm();

    console.log(productData)
    const [updateProduct, { loading, error }] = useMutation (UPDATE_PRODUCT, {
      onCompleted: data => {
        ClickEdit()
        console.log(data)
        setProductData(data.updateProduct)
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
    
    const handelChange = e => {
        setProductData({ ...productData, [e.target.name]: e.target.value})
    }



    const onSubmit = async () => {
      if (!file && productData === products) {
        setProductData(products)
        // ClickEdit()
        return  console.log('No change');
      }
  
      console.log(productData)
  
      try {
        if (file) {
          const url = await uploadFile()
          console.log(url)

          if (url) {
            await updateProduct({
              variables: {
                ...productData,
                imageUrl: url,
                price: +productData.price,

              }
            })
          }
        } else {
          await updateProduct({
            variables: {
              ...productData,
              imageUrl: productData.imageUrl,
              price: +productData.price,
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    const ClickEdit = () =>{
      setEdit(!edit)
    }
  
    //Del Pro

    const [deleteProduct] = useMutation (DELETE_PRODUCT, {
      onCompleted: data => {
          console.log(data)
      },
      refetchQueries: [{ query: ME, }]
    })

    const handelDelPro = async (id) => {
      console.log(id)
      await deleteProduct({ variables: { id } })
    }

    useEffect(() => {
      setFile(null)
      if (data) {
        setAuthUser(data.user)
      }
    }, [data])

    console.log(productData)
    return (
        <div>
            {!edit ? (
                <div>
                    <img src = {products.imageUrl} width = "100"/>
                    <div>
                      <Link href = "/user_products/[prodoctID]" as = {`/user_products/${productData.id}`} >
                        <a>  Name: { productData.name } </a>
                      </Link>
                    </div>
                    <p> Price: { productData.price } </p> 
                    <p> Description: { productData.description } </p>
                    <button style = {{ background: 'yellow' }} onClick={ClickEdit} > Edit </button>
                    <button style = {{ background: 'red' }}  onClick = { ()=> handelDelPro(products.id) } > Delete </button>
                </div>
            ):(
                <form  onSubmit = {handleSubmit(onSubmit)} onChange = {handelChange} >
                    <img src = {products.imageUrl} width = "100"/> <input type = "file" placeholder = "Image-URL" name = "file"  onChange = {selectFile}/>
                    <label> Name: <input type = "text" name = "name" value = {productData.name}></input> </label>
                    <label> Price: <input type = "number" name = "price" value = {productData.price}></input> </label>
                    <label> Description: <input type = "text" name = "description" value = {productData.description}></input> </label>
                    <button style = {{ background: 'red' }} onClick={ClickEdit} > Cancel </button>
                    <button type = "submit" style = {{ background: 'green' }} value = "submit" > {loading ? ('Loading'):("Confirm")}</button>
                    <input type = "submit"  value="Submit" />

                </form>
            )} 
            
            
            <hr/>
        </div>
    )
}

export default UserProductItems
