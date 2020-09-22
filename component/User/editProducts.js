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
    $image_gallery: [String]
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
      image_gallery: $image_gallery
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
  const [UTU, setUTU] = useState(false)
  const [MESS, setMESS] = useState(false)
  const [productData, setProductData] = useState(props.product)
  const { handleSubmit} = useForm();


 


  const { user, setAuthUser,  ID_ATTPro_FromEdit, setID_ATTPro_FromEdit, ID_CatPro_FromEdit, setID_CatPro_FromEdit} = useContext(AuthContext)
  const { data } = useQuery(ME)
  const [IDShipping, setIDShipping] = useState([])

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
    const [edit, setEdit,] = useState(false)
    const [edit_img_gall, setEdit_img_gall,] = useState(false)
    const [file, setFile] = useState(null)
    const [files_image_gallery, setfiles_image_gallery] = useState([])
    const [data_img_gall, setdata_img_gall] = useState(props.product.image_gallery)
 


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
        console.log(files[0]);
      }
      console.log(file);
      console.log(files_image_gallery)
    const SelectMultiFiles = e => {
        const files = e.target.files
        console.log(files)
        setfiles_image_gallery(files)
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
    
      const Upload_image_gallery = async () => {
        let url = productData.image_gallery
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
    
    const handelChange = e => {
        setProductData({ ...productData, [e.target.name]: e.target.value})
    }

    // if(files_image_gallery[0] !== []){
    //   alert("have files")
    // }

    const onSubmit = async () => {
      if (!file && productData === props.product) {
        setProductData(props.product)
        ClickEdit()
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
                shipping: IDShipping,
              }
            })
          }
        } else if(files_image_gallery[0] !== []){
          alert("Have uel gallery")
          const url_image_gallery = await Upload_image_gallery()
          await updateProduct({
            variables: {
              ...productData,
              imageUrl: productData.imageUrl,
              price: + productData.price,
              integrity: + productData.integrity,
              pd_life: + productData.pd_life,
              pd_options_attr: ID_ATTPro_FromEdit,
              productCategory: ID_CatPro_FromEdit,
              shipping: IDShipping,
              image_gallery: url_image_gallery
            }
          })
        } else {
          await updateProduct({
            variables: {
              ...productData,
              imageUrl: productData.imageUrl,
              image_gallery: productData.image_gallery,
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
      console.log(props.product)
      setfiles_image_gallery([])
      setFile(null)
      ClickEdit()
      location.reload();

    }
    console.log(productData)

    const ClickEdit = () =>{
      setEdit(!edit)
      setfiles_image_gallery([])
      setFile(null)
      setProductData(props.product)
      console.log(IDShipping);
    }
    const ClickEdit_ImgGall = () =>{
      setEdit_img_gall(!edit_img_gall)
    }
    //----END_EDIT_PRODUCT-----



    
   


// Get Shipping ID

    const GetID_Shipping = () => {
      const findIdAtt =  IDShipping.find(e => e === event.target.id)
     if(findIdAtt){
      setIDShipping(IDShipping.filter((e)=>(e !== event.target.id)))

     }else {
         let idAAtt = event.target.id
         setIDShipping(id => [...id, `${idAAtt}`])
     }
  }

  /////////////////////////////////////////////


  useEffect(() => {
    setIDShipping(productData.shipping)

    if(edit){
      setProductData(props.product)
    }
    if (data) {
      setAuthUser(data.user)
    }
    //เช็คสินค้าว่าติ้กการจัดส่งยังไง

    props.product.shipping.map((item, index) => {
      if (item === "UTU"){
        setUTU(true)
      } else if (item === "MESS"){
        setMESS(true)
      }
    });
   
    //
  }, [data])
  
  
  const GetID_Img_Del = async () => {
    let dataImgGall = productData.image_gallery
    console.log(event.target.id)
    const findUrl =  dataImgGall.find(e => e === event.target.id )
    if(findUrl){
        setdata_img_gall(data_img_gall.filter((e)=>(e !== event.target.id)))
      }
      console.log(data_img_gall);
    }

    const UPDATE_IMAGE_GALLERY = async () => {
      console.log(files_image_gallery[0]);
    try {
      if(files_image_gallery[0] !== undefined){
        alert("Have uel gallery")
        console.log("Have uel gallery")
        const url_image_gallery = await Upload_image_gallery()
        await updateProduct({
          variables: {
            ...productData,
            imageUrl: productData.imageUrl,
            price: + productData.price,
            integrity: + productData.integrity,
            pd_life: + productData.pd_life,
            pd_options_attr: ID_ATTPro_FromEdit,
            productCategory: ID_CatPro_FromEdit,
            shipping: IDShipping,
            image_gallery: url_image_gallery
          }
        })
      } else {
        await updateProduct({
          variables: {
            ...productData,
            imageUrl: productData.imageUrl,
            image_gallery: data_img_gall,
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
      console.log(error);
    }
      
      location.reload();
      ClickEdit_ImgGall()      
    }

    return (
        <div>
            {!edit ? (
                <div>
                    <img src = {imageUrl}  alt = {description} width = "150" />
                    <div>
                        <h3> รูปสินค้าเพิ่มเติม </h3>
                        {image_gallery && (
                            props.product.image_gallery.map((items, index) => (
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
                  <form onChange = {handelChange} onSubmit = {handleSubmit(onSubmit)} >
                    <img src = {imageUrl} width = "100"/> <input type = "file" placeholder = "Image-URL" name = "file"  onChange = {selectFile}/>
                    <div>
                      {!edit_img_gall? (
                        <div>
                          <h3> รูปสินค้าเพิ่มเติม </h3>
                          {image_gallery && (
                              props.product.image_gallery.map((items, index) => (
                                  <img src = {items} key =  {index}  width = "100" />
                              ))
                          )}
                            <button onClick = {ClickEdit_ImgGall} > EDIT IMAGE GALLERY </button>
                        </div>
                      ):(
                        <div>
                            <h3> รูปสินค้าเพิ่มเติม </h3>
                            {image_gallery && (
                                data_img_gall.map((items, index) => (
                                    <>
                                        <img src = {items} key = {index} id = {items}  width = "100" />
                                        <label id = {items}  onClick = {GetID_Img_Del} > X </label>
                                    </>
                                ))
                            )}
                            <div>
                              <input type = "file" placeholder = "Image-URL" name = "file" multiple="multiple"  onChange = {SelectMultiFiles}/>   
                            </div>
                            <div>
                              <label style = {{border: "1px solid red" ,backgroundColor: "yellow"}}  onClick = {ClickEdit_ImgGall} > CANCEL </label>
                              <label style = {{border: "1px solid green" ,backgroundColor: "green"}} onClick = {UPDATE_IMAGE_GALLERY} > UPDATE </label>
                            </div>
                        </div>
                      )}
                    </div>
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
                      <label> จัดส่งสินค้า </label>
                    </div>
                    <p> สภาพสินค้า: <input type = "number" name = "integrity" value = {productData.integrity}></input> </p>
                    <p> อายุการใช้งาน: <input type = "number" name = "pd_life" value = {productData.pd_life}></input> </p>
                        <DropDown_ProCat dataCat = {productData.productCategory} />
                        <CheckBox_ProAtt dataAtt = {productData.pd_options_attr} />
                    <button style = {{ background: 'red' }} onClick={ClickEdit} > Cancel </button>
                    <button type = "submit" style = {{ background: 'green' }} value = 'submit'  > {loading ? ('Loading'):("Confirm")}</button>
                  </form>
                </div>
            )}
        </div>
    )
}

export default EditProduct
