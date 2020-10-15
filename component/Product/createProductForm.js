import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { QUERY_PRODUCTS } from "./showAllProduct";
import fetch from "isomorphic-unfetch";
import { useQuery } from "@apollo/react-hooks";
import { ME } from "../User/userProducts";
import { AuthContext } from "../../appState/authProvider";
import C_ProForm_SELECTID_CAT from "./createProductFrom_selectCatID";
import C_ProForm_SELECTID_ATT from "./createProductFrom_selectAtt";
import Router from "next/router";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const DivGrid = styled.form`
  display: grid;
  grid-template-columns: 50% 50%;
  margin-bottom: 50px;
  margin: 20px;
  input {
    display: block;
    margin: 10px 0;
  }
  input,textarea :focus {
    outline-color:#53e9e4;
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
  .createPro_box_uploadImgGall {
    svg {
      :hover {
        color: #86b0d8;
      }
      div {
      }
    }
  }
  .createPro_form {
    input[type="text"],
    [type="number"] {
      padding: 10px;
      border-radius: 5px;
      width: 500px;
      margin: 20px 0;
      border-color: #d3d3d3;
      border-style: solid;
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
    }
  }
`;

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
    ) {
      id
      name
    }
  }
`;

const CreateProductForm = () => {
  const { user, setAuthUser } = useContext(AuthContext);
  const {
    ID_CatPro_FromC,
    setID_CatPro_FromC,
    ID_ATTPro_FromC,
    setID_ATTPro_FromC,
  } = useContext(AuthContext);
  const [IDShipping, setIDShipping] = useState([]);
  const [OB_IMG_S, setOB_IMG_S] = useState([]);

  const { data } = useQuery(ME);
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
    reason_sell: "",
  });
  const [success, setSuccess] = useState("");
  const [file, setFiles] = useState(null);
  const [files_image_gallery, setfiles_image_gallery] = useState([]);

  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT, {
    refetchQueries: [{ query: QUERY_PRODUCTS }],
  });

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const SelectFiles = (e) => {
    const files = e.target.files;
    setFiles(files[0]);
  };
  const SelectMultiFiles = (e) => {
    const files = e.target.files;
    console.log(files);
    setfiles_image_gallery(files);
  };

  const UploadFiles = async () => {
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
    let url = [];
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(productData);
      // const urlImg = await UploadFiles()
      const url_img_multi = await Upload_image_gallery();
      const urlImg =
        "https://res.cloudinary.com/the-guitar-next/image/upload/v1598983747/the-guitar-next/uxzu7fbvladtszcvvdcm.jpg";
      console.log(url_img_multi);
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
            shipping: IDShipping,
          },
        });
        console.log(result);
      }

      setSuccess("เรียบร้อย");
      setProductData({
        name: "",
        description: "",
        imageUrl: "",
        image_gallery: "",
        price: "",
        address: "",
        pd_options_attr: "",
        shipping: "",
        pd_life: "",
        integrity: "",
        productCategory: "",
        reason_sell: "",
      });
      setID_ATTPro_FromC([]);
      setID_CatPro_FromC("");
      document.getElementById("Sel_Pro_Att").reset();
    } catch (error) {
      console.log(error);
    }
  };

  const GetID_Shipping = () => {
    const findIdAtt = IDShipping.find((e) => e === event.target.id);
    console.log(findIdAtt);
    if (findIdAtt) {
      setIDShipping(IDShipping.filter((e) => e !== event.target.id));
    } else {
      let idAAtt = event.target.id;
      setIDShipping((id) => [...id, `${idAAtt}`]);
    }
    console.log(IDShipping);
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
  useEffect(() => {
    if (data) {
      setAuthUser(data.user);
    }
  }, [data]);
  console.log();
  return (
    <DivGrid>
      <div>
        <div className="createPro_box_uploadImg">
          <h3> รูปสินค้า</h3>
          <input
            type="file"
            placeholder="Image-URL"
            name="file"
            onChange={SelectFiles}
            id="file"
          />
          {file !== null ? (
            <img src={URL.createObjectURL(file)} width="300" />
          ) : (
            <img
              src="https://image.freepik.com/free-vector/image-upload-concept-landing-page_23-2148298503.jpg"
              width="300"
            />
          )}
          <div>
            <label for="file" className="jr_btn_upload">
              <FontAwesomeIcon
                icon={["fas", "cloud-upload-alt"]}
                color="#3280c9"
              />{" "}
              อัพรูปสินค้า
            </label>
          </div>
        </div>
        <div className="createPro_box_uploadImgGall">
          <h3> รูปสินค้าเพิ่มเติม </h3>
          <input
            type="file"
            placeholder="Image-URL"
            name="file"
            multiple="multiple"
            onChange={SelectMultiFiles}
            id="fileGallery"
          />
          {files_image_gallery.length !== 0 ? (
            <div>
              <ShowGallUpload />
            </div>
          ) : (
            ""
          )}
          {/* <div> */}
          <label for="fileGallery">
            <FontAwesomeIcon icon={faPlusSquare} color="#3280c9" size="2x" />
          </label>
          {/* </div> */}
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="createPro_form">
          <h3>ข้อมูลสินค้า</h3>
          <input
            type="text"
            placeholder="ชื่อสินค้า"
            name="name"
            value={productData.name}
            onChange={handleChange}
          />
          <textarea
            type="text"
            placeholder="รายละเอียดสินค้า"
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="ราคา"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="ที่อยู่"
            name="address"
            value={productData.address}
            onChange={handleChange}
          />
          <C_ProForm_SELECTID_CAT />
          <C_ProForm_SELECTID_ATT />
          <hr style={{ width: "500px", margin: "0" }} />
          <div className="createPro_box_shipment">
            <div>
              <strong>เลือกการจัดส่ง</strong>
            </div>
            <input id="UTU" type="checkbox" onClick={GetID_Shipping} />
            <label> นัดรับสินค้า </label>
            <br />
            <input id="MESS" type="checkbox" onClick={GetID_Shipping} />
            <label> จัดส่งสินค้าโดยระบบขนส่ง </label>
          </div>

          <div>
            <input
              type="number"
              placeholder="อายุการใช้งาน(เดือน) ตัวอน่าง 3 เดือน"
              name="pd_life"
              value={productData.pd_life}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="สภาพสินค้า(%) ตัวอย่าง 90%"
              name="integrity"
              value={productData.integrity}
              onChange={handleChange}
            />
          </div>
          <p style={{ color: "rgb(255, 109, 109)" }}>
            ช่องอายุการใช่งานและสภาพสินค้า ใส่เพียงตัวเลขเท่านั้น
          </p>
          <button type="submit" className="jr_btn_success">
            {loading ? "loading" : "เพิ่มสินค้า"}
          </button>
        </form>
        <strong> {success} </strong>
        <div style={{ width: "30%", margin: "auto" }}>
          {error && (
            <p style={{ color: "red" }}>{error.graphQLErrors[0].message}</p>
          )}
        </div>
      </div>
    </DivGrid>
  );
};

export default CreateProductForm;
