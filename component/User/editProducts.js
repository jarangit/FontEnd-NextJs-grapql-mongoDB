import React, { useState, useEffect, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../../appState/authProvider'
import { useMutation } from '@apollo/react-hooks'
import fetch from 'isomorphic-unfetch'
import gql from 'graphql-tag'
import { QUERY_PRODUCTS } from '../Product/showAllProduct'
import { ME } from './userProducts'
import DropDown_ProCat from './Form update product/dropDown_ProCat'
import CheckBox_ProAtt from './Form update product/checkBox_ProAtt'


const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $id: ID!
    $name: String
    $description: String
    $address: String
    $reason_sell: String
    $price: Float
    $imageUrl: String
    $integrity: Float
    $pd_life: Float
    $pd_options_attr: [String]
    $productCategory: String
    $shipping: [String]
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      address: $address
      reason_sell: $reason_sell
      price: $price
      imageUrl: $imageUrl
      integrity: $integrity
      pd_life: $pd_life
      pd_options_attr: $pd_options_attr
      productCategory: $productCategory
      shipping: $shipping
    ) {
      id
      name
      description
      address
      reason_sell
      price
      imageUrl
      integrity
      pd_life
    }
  }
`


const EditProduct = (props) => {
  useEffect(() => {
    if (data) {
      setAuthUser(data.user)
      setIDShipping(shipping)
    }
  }, [data])
 


  const { user, setAuthUser,  ID_ATTPro_FromEdit, setID_ATTPro_FromEdit, ID_CatPro_FromEdit, setID_CatPro_FromEdit} = useContext(AuthContext)
  const { data } = useQuery(ME)
  const [IDShipping, setIDShipping] = useState([])
  
  console.log(ID_CatPro_FromEdit)
    const {
        id,
        name, 
        description, 
        price, 
        imageUrl, 
        image_gallery,
        address,
        reason_sell,
        shipping,
        pd_life,
        integrity,
        productCategory,
        pd_options_attr,
    } = props.product
    //----EDIT_PRODUCT----
    const [edit, setEdit] = useState(false)
    const [file, setFile] = useState(null)
    const [productData, setProductData] = useState(props.product)
  
 


    const [updateProduct, { loading, error }] = useMutation (UPDATE_PRODUCT, {
      onCompleted: data => {
        ClickEdit()
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



    const handleSubmit = async () => {
      if (!file && productData === props.product) {
        setProductData(props.product)
        // ClickEdit()
        return  console.log('No change');
      }
  

      try {
        if (file) {
          const url = await uploadFile()

          if (url) {
            await updateProduct({
              variables: {
                ...productData,
                imageUrl: url,
                price: + productData.price,
                integrity: + productData.integrity,
                pd_life: + productData.pd_life,
                pd_options_attr: ID_ATTPro_FromEdit,
                productCategory: ID_CatPro_FromEdit,
                shipping: IDShipping
              }
            })
          }
        } else {
          await updateProduct({
            variables: {
              ...productData,
              imageUrl: productData.imageUrl,
              price: +productData.price,
              integrity: + productData.integrity,
              pd_life: + productData.pd_life,
              pd_options_attr: ID_ATTPro_FromEdit,
              productCategory: ID_CatPro_FromEdit,
              shipping: IDShipping
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
    //----END_EDIT_PRODUCT-----

    useEffect(() => {

      if (data) {
        setAuthUser(data.user)
      }
    }, [data])


    //เช็คสินค้าว่าติ้กการจัดส่งยังไง
    let updateData_UTU = false;
    let updateData_MESS = false;
    productData.shipping.map((item, index) => {
      if (item === "UTU"){
        updateData_UTU = true
      } else if (item === "MESS"){
        updateData_MESS = true
      }
    });
    const [UTU, setUTU] = useState(updateData_UTU ? true : false)
    const [MESS, setMESS] = useState(updateData_MESS ? true : false)
    //
   


// Get Shipping ID

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

  /////////////////////////////////////////////


  
    return (
        <div>
            {!edit ? (
                <div>
                    <img src = {imageUrl}  alt = {description} width = "150" />
                    <div>
                        <h3> รูปสินค้าเพิ่มเติม </h3>
                        {image_gallery && (
                            image_gallery.map((items, index) => (
                                <img src = {items} key =  {index}  width = "100" />
                            ))
                        )}
                    </div>
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
                        {pd_options_attr.map((items, index)=> {
                            return(
                                <div key = {index}>
                                    <p> <strong> {items.parentName}: </strong> { items.name }</p>
                                </div>
                            )
                        })}
                    </div>
                    <button onClick = {ClickEdit} > EDIT </button>
                </div>
            ):(
                <div>
                  <form onChange = {handelChange} onSubmit = {handleSubmit} >
                    <img src = {props.product.imageUrl} width = "100"/> <input type = "file" placeholder = "Image-URL" name = "file"  onChange = {selectFile}/>
                    <p> Name: <input type = "text" name = "name" value = {productData.name}  ></input> </p>
                    <p> Price: <input type = "number" name = "price" value = {productData.price} ></input> </p>
                    <p> Description: <input type = "text" name = "description" value = {productData.description}></input> </p>
                    <p> ที่อยู่: <input type = "text" name = "address" value = {productData.address}></input> </p>
                    <p> เหตุผลที่ขาย: <input type = "text" name = "reason_sell" value = {productData.reason_sell}></input> </p>
                    <div>
                      <p> การจัดส่ง: <input type = "text" name = "shipping" value = {productData.shipping}></input> </p>
                      <input type = "checkbox" id = "UTU" defaultChecked = {UTU} onClick = {GetID_Shipping} />
                      <label> นัดรับสินค้า </label>
                      <input type = "checkbox" id = "MESS" defaultChecked = {MESS}  onClick = {GetID_Shipping} />
                      <label> นัดรับสินค้า </label>
                    </div>
                    <p> สภาพสินค้า: <input type = "number" name = "integrity" value = {productData.integrity}></input> </p>
                    <p> อายุการใช้งาน: <input type = "number" name = "pd_life" value = {productData.pd_life}></input> </p>
                    <DropDown_ProCat dataCat = {productData.productCategory} />
                    <CheckBox_ProAtt dataAtt = {productData.pd_options_attr} />
                    <button style = {{ background: 'red' }} onClick={ClickEdit} > Cancel </button>
                    <button type = "submit" style = {{ background: 'green' }}   > {loading ? ('Loading'):("Confirm")}</button>
                  </form>
                </div>
            )}
            
        </div>
    )
}

export default EditProduct
