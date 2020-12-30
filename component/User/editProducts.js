import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../appState/authProvider";
import { useMutation } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import gql from "graphql-tag";
import { QUERY_PRODUCTS } from "../Product/showAllProduct";
import { ME } from "./userProducts";
import DropDown_ProCat from "./Form update product/dropDown_ProCat";
import CheckBox_ProAtt from "./Form update product/checkBox_ProAtt";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DivGrid = styled.form`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-bottom: 50px;
  margin: 20px;
  button {
    width: 100px;
  }
  h3 {
    margin-bottom: 10px;
  }
  input {
    display: block;
    margin: 10px 0;
  }
  input,
  textarea :focus {
    outline-color: #53e9e4;
  }
  label {
    margin: 50px 0;
  }
  img {
    margin-right: 5px;
  }
  .createPro_box_uploadImg {
    margin-bottom: 50px;
    h3 {
      text-align: left;
    }
    text-align: center;
    div {
      margin: 10px 0;
    }
    label {
      padding: 0 10px;
    }
  }

  .editPro_box_uploadImgGall {
    svg {
      margin: 0 10px;
      /* text-align: end; */
      :hover {
        color: #86b0d8;
      }
    }
  }
  .createPro_form {
    button {
      width: 100px;
    }
    input[type="text"],
    [type="number"] {
      padding: 10px;
      border-radius: 5px;
      width: 500px;
      margin: 20px 0;
      border-color: #d3d3d3;
      border-style: solid;
      ::placeholder {
        color: #d3d3d3;
      }
    }
    input[type="checkbox"] {
      display: inline-block;
      margin-left: 10px;
    }
    textarea {
      padding: 10px;
      border-radius: 5px;
      width: 500px;
      height: 200px;
      border-color: #d3d3d3;
      ::placeholder {
        color: #d3d3d3;
      }
    }
  }
`;

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
`;

const EditProduct = (props) => {
  const [UTU, setUTU] = useState(false);
  const [MESS, setMESS] = useState(false);
  const [productData, setProductData] = useState(props.product);
  const { handleSubmit } = useForm();

  const {
    user,
    setAuthUser,
    ID_ATTPro_FromEdit,
    setID_ATTPro_FromEdit,
    ID_CatPro_FromEdit,
    setID_CatPro_FromEdit,
  } = useContext(AuthContext);
  const { data } = useQuery(ME);
  // const [IDShipping, setIDShipping] = useState([]);

  const {
    id,
    name,
    description,
    price,
    imageUrl,
    image_gallery,
    address,
    reason_sell,
    pd_life,
    integrity,
    productCategory,
    pd_options_attr,
  } = props.product;
  //----EDIT_PRODUCT----
  const [edit, setEdit] = useState(false);
  const [edit_img_gall, setEdit_img_gall] = useState(false);
  const [file, setFile] = useState(null);
  const [files_image_gallery, setfiles_image_gallery] = useState([]);
  const [data_img_gall, setdata_img_gall] = useState(
    props.product.image_gallery
  );

  const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: (data) => {
      ClickEdit();
      setProductData(data.updateProduct);
    },
    refetchQueries: [{ query: QUERY_PRODUCTS }, { query: ME }],
  });

  const selectFile = (e) => {
    const files = e.target.files;
    setFile(files[0]);
    console.log(files[0]);
  };
  console.log(file);
  console.log(files_image_gallery);
  const SelectMultiFiles = (e) => {
    const files = e.target.files;
    console.log(files);
    setfiles_image_gallery(files);
  };
  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "the-guitar-next");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/the-guitar-next/image/upload",
      {
        method: "post",
        body: data,
      }
    );
    const result = await res.json();
    return result.secure_url;
  };

  const Upload_image_gallery = async () => {
    let url = productData.image_gallery;
    for (let i = 0; i < files_image_gallery.length; i++) {
      const data = new FormData();
      data.append("file", files_image_gallery[i]);
      data.append("upload_preset", "the-guitar-next");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/the-guitar-next/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      const result = await res.json();

      console.log(result.secure_url);
      console.log("เสร็จ");
      let y = 1;
      url.push(result.secure_url);
      console.log(url);
      // return console.log('ออกละ')
    }

    return url;
  };

  const handelChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  // if(files_image_gallery[0] !== []){
  //   alert("have files")
  // }

  const onSubmit = async () => {
    if (!file && productData === props.product) {
      setProductData(props.product);
      ClickEdit();
      return console.log("No change");
    }

    try {
      if (file) {
        const url = await uploadFile();
        if (url) {
          await updateProduct({
            variables: {
              ...productData,
              imageUrl: url,
              price: +productData.price,
              integrity: +productData.integrity,
              pd_life: +productData.pd_life,
              pd_options_attr: ID_ATTPro_FromEdit,
              productCategory: ID_CatPro_FromEdit,
            },
          });
        }
      } else if (files_image_gallery[0] !== []) {
        alert("Have uel gallery");
        const url_image_gallery = await Upload_image_gallery();
        await updateProduct({
          variables: {
            ...productData,
            imageUrl: productData.imageUrl,
            price: +productData.price,
            integrity: +productData.integrity,
            pd_life: +productData.pd_life,
            pd_options_attr: ID_ATTPro_FromEdit,
            productCategory: ID_CatPro_FromEdit,
            image_gallery: url_image_gallery,
          },
        });
      } else {
        await updateProduct({
          variables: {
            ...productData,
            imageUrl: productData.imageUrl,
            image_gallery: productData.image_gallery,
            price: +productData.price,
            integrity: +productData.integrity,
            pd_life: +productData.pd_life,
            pd_options_attr: ID_ATTPro_FromEdit,
            productCategory: ID_CatPro_FromEdit,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
    console.log(props.product);
    setfiles_image_gallery([]);
    setFile(null);
    ClickEdit();
    location.reload();
  };
  console.log(productData);

  const ClickEdit = () => {
    setEdit(!edit);
    setfiles_image_gallery([]);
    setFile(null);
    setProductData(props.product);
  };
  const ClickEdit_ImgGall = () => {
    setEdit_img_gall(!edit_img_gall);
  };
  //----END_EDIT_PRODUCT-----

  // Get Shipping ID

  // const GetID_Shipping = () => {
  //   const findIdAtt = IDShipping.find((e) => e === event.target.id);
  //   if (findIdAtt) {
  //     setIDShipping(IDShipping.filter((e) => e !== event.target.id));
  //   } else {
  //     let idAAtt = event.target.id;
  //     setIDShipping((id) => [...id, `${idAAtt}`]);
  //   }
  // };

  /////////////////////////////////////////////

  useEffect(() => {
    // setIDShipping(productData.shipping);

    if (edit) {
      setProductData(props.product);
    }
    if (data) {
      setAuthUser(data.user);
    }
    //เช็คสินค้าว่าติ้กการจัดส่งยังไง

    // props.product.shipping.map((item, index) => {
    //   if (item === "UTU") {
    //     setUTU(true);
    //   } else if (item === "MESS") {
    //     setMESS(true);
    //   }
    // });

    //
  }, [data]);

  const GetID_Img_Del = async () => {
    let dataImgGall = productData.image_gallery;
    console.log(event.target.id);
    const findUrl = dataImgGall.find((e) => e === event.target.id);
    if (findUrl) {
      setdata_img_gall(data_img_gall.filter((e) => e !== event.target.id));
    }
    console.log(data_img_gall);
  };

  const UPDATE_IMAGE_GALLERY = async () => {
    console.log(files_image_gallery[0]);
    try {
      if (files_image_gallery[0] !== undefined) {
        alert("Have uel gallery");
        console.log("Have uel gallery");
        const url_image_gallery = await Upload_image_gallery();
        await updateProduct({
          variables: {
            ...productData,
            imageUrl: productData.imageUrl,
            price: +productData.price,
            integrity: +productData.integrity,
            pd_life: +productData.pd_life,
            pd_options_attr: ID_ATTPro_FromEdit,
            productCategory: ID_CatPro_FromEdit,
            image_gallery: url_image_gallery,
          },
        });
      } else {
        await updateProduct({
          variables: {
            ...productData,
            imageUrl: productData.imageUrl,
            image_gallery: data_img_gall,
            price: +productData.price,
            integrity: +productData.integrity,
            pd_life: +productData.pd_life,
            pd_options_attr: ID_ATTPro_FromEdit,
            productCategory: ID_CatPro_FromEdit,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }

    location.reload();
    ClickEdit_ImgGall();
  };
  const ShowGallUpload = () => {
    const url = [];
    if (files_image_gallery.length !== 0) {
      for (let i = 0; i < files_image_gallery.length; i++) {
        url.push(files_image_gallery[i]);
      }
      return (
        <div>
          {url.map((items) => (
            <img src={URL.createObjectURL(items)} width="100" />
          ))}
        </div>
      );
    }
  };

  const Refresh = () => {
    setfiles_image_gallery([]);
    setdata_img_gall(props.product.image_gallery);
  };
  return (
    <DivGrid>
      <div>
        {!edit ? (
          <div>
            <div className="createPro_box_uploadImg">
              <h3> รูปสินค้า</h3>

              <img src={imageUrl} alt={description} width="300" />
            </div>

            <div className="editPro_box_uploadImgGall">
              <h3> รูปสินค้าเพิ่มเติม </h3>
              {image_gallery &&
                props.product.image_gallery.map((items, index) => (
                  <img src={items} key={index} width="100" />
                ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="createPro_box_uploadImg">
              <h3> รูปสินค้า</h3>
              {file === null ? (
                <img src={imageUrl} alt={description} width="300" />
              ) : (
                <img src={URL.createObjectURL(file)} width="300" />
              )}
              <input
                type="file"
                placeholder="Image-URL"
                name="file"
                id="file"
                onChange={selectFile}
              />
              <label for="file" className="jr_btn_upload">
                <FontAwesomeIcon
                  icon={["fas", "cloud-upload-alt"]}
                  color="#3280c9"
                />
                อัพรูปสินค้า
              </label>
            </div>

            <div className="editPro_box_uploadImgGall">
              {!edit_img_gall ? (
                <div>
                  <h3>
                    รูปสินค้าเพิ่มเติม
                    <FontAwesomeIcon
                      onClick={ClickEdit}
                      icon={["fas", "edit"]}
                      color="#e5b700"
                      onClick={ClickEdit_ImgGall}
                    />
                  </h3>
                  {image_gallery &&
                    props.product.image_gallery.map((items, index) => (
                      <img src={items} key={index} width="100" />
                    ))}
                </div>
              ) : (
                <div>
                  <h3>
                    รูปสินค้าเพิ่มเติม
                    <FontAwesomeIcon
                      onClick={ClickEdit}
                      icon={["fas", "window-close"]}
                      color="#ff6d6d"
                      onClick={ClickEdit_ImgGall}
                    />
                  </h3>
                  {image_gallery &&
                    data_img_gall.map((items, index) => (
                      <>
                        <img src={items} key={index} id={items} width="100" />
                        <label id={items} onClick={GetID_Img_Del}>
                          X
                        </label>
                      </>
                    ))}
                  <div>
                    {files_image_gallery.length === 0 ? (
                      ""
                    ) : (
                      <div>
                        <p style={{ color: "green" }}> รูปที่เพิ่ม </p>
                        <ShowGallUpload />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    placeholder="Image-URL"
                    name="file"
                    multiple="multiple"
                    id="file_mull"
                    onChange={SelectMultiFiles}
                  />
                  <label for="file_mull">
                    <FontAwesomeIcon
                      icon={faPlusSquare}
                      color="#3280c9"
                      size="2x"
                    />
                  </label>
                  {data_img_gall !== props.product.image_gallery ||
                  files_image_gallery.length !== 0 ? (
                    <FontAwesomeIcon
                      size="2x"
                      icon={["fas", "redo-alt"]}
                      color="#3280c9"
                      onClick={Refresh}
                    />
                  ) : (
                    ""
                  )}
                  <FontAwesomeIcon
                    size="2x"
                    onClick={ClickEdit}
                    icon={["fas", "save"]}
                    color="#10b541"
                    onClick={ClickEdit_ImgGall}
                  />

                  <div style={{ color: "#ff6d6d", width: "300px" }}>
                    <p>
                      กดที่
                      <FontAwesomeIcon icon={faPlusSquare} color="#3280c9" />
                      เพื่อเพิ่มรูปภาพ จากนั้นกด
                      <FontAwesomeIcon icon={["fas", "save"]} color="#10b541" />
                      เพื่อบันทึกการแก้ไข หากต้องการกลับไปค่าเริ่มต้นให้กดที่
                      <FontAwesomeIcon
                        icon={["fas", "redo-alt"]}
                        color="#3280c9"
                      />
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div>
        {!edit ? (
          <div>
            <h1> {name} </h1>
            <p> รายละเอียด: {description} </p>
            <p> ราคา: {price} </p>
            <p> ที่อยู่: {address} </p>
            <p> เหตุผลที่ขาย: {reason_sell} </p>
            {/* <p> การจัดส่ง: {shipping} </p> */}
            <p> อายุการใช้งาน: {pd_life} เดือน</p>
            <p> สภาพสินค้า: {integrity} % </p>

            <div>ประเภทสินค้า: {productCategory.name}</div>

            <div>
              <h3> คุณสมบัติ </h3>
              {pd_options_attr.map((items, index) => {
                return (
                  <div key={index}>
                    <p>
                      {" "}
                      <strong> {items.parentName}: </strong> {items.name}
                    </p>
                  </div>
                );
              })}
            </div>
            <button onClick={ClickEdit} className="jr_btn_edit">
              {" "}
              แก้ไข{" "}
            </button>
          </div>
        ) : (
          <div>
            <form
              className="createPro_form"
              onChange={handelChange}
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3>ข้อมูลสินค้า</h3>
              <p>ชื่อสินค้า</p>
              <input
                placeholder="ชื่อสินค้า"
                type="text"
                name="name"
                value={productData.name}
              ></input>
              <p>ราคา</p>
              <input
                placeholder="ราคา"
                type="number"
                name="price"
                value={productData.price}
              ></input>{" "}
              <p>รายละเอียดสินค้า</p>
              <textarea
                placeholder="รายละเอียดสินค้า"
                type="text"
                name="description"
                value={productData.description}
              ></textarea>{" "}
              <p>ที่อยู่</p>
              <input
                type="text"
                name="address"
                value={productData.address}
              ></input>{" "}
              <p>เหตุผลที่ขาย</p>
              <input
                placeholder="เหตุผลที่ขาย"
                type="text"
                name="reason_sell"
                value={productData.reason_sell}
              ></input>{" "}
              <div>
                <p>การจัดส่ง</p>
                {/* <input
                  type="checkbox"
                  id="UTU"
                  defaultChecked={UTU}
                  onClick={GetID_Shipping}
                />
                <label> นัดรับสินค้า </label>
                <input
                  type="checkbox"
                  id="MESS"
                  defaultChecked={MESS}
                  onClick={GetID_Shipping}
                /> */}
                <label> จัดส่งสินค้าโดยระบบค้นส่ง </label>
              </div>
              <p>สภาพสินค้า (%)</p>
              <input
                placeholder="สภาพสินค้า"
                type="number"
                name="integrity"
                value={productData.integrity}
              ></input>{" "}
              <p>อายุการใช้งาน (เดือน) </p>
              <input
                placeholder="อายุการใช้งาน"
                type="number"
                name="pd_life"
                value={productData.pd_life}
              ></input>{" "}
              <p style={{ color: "rgb(255, 109, 109)" }}>
                ช่องอายุการใช่งานและสภาพสินค้า ใส่เพียงตัวเลขเท่านั้น
              </p>
              <DropDown_ProCat dataCat={productData.productCategory} />
              <CheckBox_ProAtt dataAtt={productData.pd_options_attr} />
              <button type="submit" value="submit" className="jr_btn_success">
                {loading ? "Loading" : "บันทึก"}
              </button>
              <button onClick={ClickEdit} className="jr_btn_cancel">
                ย้อนกลับ
              </button>
            </form>
          </div>
        )}
      </div>
    </DivGrid>
  );
};

export default EditProduct;
