import React, { useState, useEffect, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import fetch from "isomorphic-unfetch";
import gql from "graphql-tag";
import { QUERY_PRODUCTS } from "../Product/showAllProduct";
import { ME } from "./userProducts";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../appState/authProvider";
import Link from "next/link";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const DivGrid = styled.div`
  display: grid;
  grid-template-columns: 15% 50% 10% auto auto;
  div {
    align-self: center;
    padding: 10px;
  }
  .pro_list_des {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: gray;
  }
  label,
  input,
  textarea {
    display: block;
    width: 100%;
  }
  textarea {
    width: 100%;
    height: auto;
    resize: none;
    height: 150px;
    padding: 5px;
    border-radius: 4px;
  }
  svg {
    margin: 0 5px;
    font-size: 25px;
  }
`;
// const BtnUpload = styled.label`
//   border: 1px solid #3280c9;
//   text-align: center;
//   color: #3280c9;
//   border-radius: 10px;
//   padding: 2px;
//   margin: 10px 0;
// `
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
`;

const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const UserProductItems = ({ products }) => {
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [productData, setProductData] = useState(products);
  const { user, setAuthUser } = useContext(AuthContext);
  const { data } = useQuery(ME);
  const { handleSubmit } = useForm();

  console.log(productData);
  const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: (data) => {
      ClickEdit();
      console.log(data);
      setProductData(data.updateProduct);
    },
    refetchQueries: [{ query: QUERY_PRODUCTS }, { query: ME }],
  });

  const selectFile = (e) => {
    const files = e.target.files;
    setFile(files[0]);
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

  const handelChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (!file && productData === products) {
      setProductData(products);
      // ClickEdit()
      return console.log("No change");
    }

    console.log(productData);

    try {
      if (file) {
        const url = await uploadFile();
        console.log(url);

        if (url) {
          await updateProduct({
            variables: {
              ...productData,
              imageUrl: url,
              price: +productData.price,
            },
          });
        }
      } else {
        await updateProduct({
          variables: {
            ...productData,
            imageUrl: productData.imageUrl,
            price: +productData.price,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ClickEdit = () => {
    setEdit(!edit);
  };

  //Del Pro

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: (data) => {
      console.log(data);
    },
    refetchQueries: [{ query: ME }],
  });

  const handelDelPro = async (id) => {
    console.log(id);
    await deleteProduct({ variables: { id } });
  };

  useEffect(() => {
    setFile(null);
    if (data) {
      setAuthUser(data.user);
    }
  }, [data]);

  console.log(productData);
  return (
    <div>
      {!edit ? (
        <DivGrid>
          <div style = {{ textAlign: "center" }}>
            <img src={products.imageUrl} width="150" />
          </div>
          <div>
            <Link
              href="/user_products/[prodoctID]"
              as={`/user_products/${productData.id}`}
            >
              <a className="link_def">
                <strong> {productData.name} </strong>
              </a>
            </Link>
            <div className="pro_list_des">{productData.description}</div>
            <Link  href="/user_products/[prodoctID]" as={`/user_products/${productData.id}`} >
              <a  style = {{ padding: "0 10px", textDecoration: "none" }} className = "jr_btn_edit" > ไปที่หน้าแก้ไข </a>
            </Link>
          </div>
          <div>
            <NumberFormat
              thousandSeparator={true}
              housandsGroupStyle="lakh"
              displayType="text"
              prefix={"฿"}
              value={productData.price}
            />
          </div>
          <div>
            <Moment format="YYYY/MM/DD">{productData.createdAt}</Moment>
          </div>

          <div>
            <FontAwesomeIcon
              onClick={ClickEdit}
              icon={["fas", "edit"]}
              color="#e5b700"
            />
            <FontAwesomeIcon
              onClick={() => handelDelPro(products.id)}
              icon={["fas", "trash-alt"]}
              color="#ff6d6d"
            />
          </div>
        </DivGrid>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} onChange={handelChange}>
          <DivGrid>
            <div  style = {{ textAlign: "center" }}>
              <img src={products.imageUrl} width="100" />
              <input
                type="file"
                placeholder="Image-URL"
                name="file"
                onChange={selectFile}
                id="file"
              />
              <label className = "jr_btn_upload" for="file" name = "file">
              <FontAwesomeIcon
              icon={["fas", "cloud-upload-alt"]}
              color="#3280c9"
            />อัพโหลดรูป
              </label>

            </div>

            <div>
              <label>
                <strong> ชื่อสินค้า </strong>
                <input type="text" name="name" value={productData.name}></input>
              </label>
              <label>
                <strong> รายละเอียดสินค้า </strong>
                <textarea
                  type="text"
                  name="description"
                  value={productData.description}
                ></textarea>
              </label>
            </div>

            <div>
              <label>
                <strong> ราคา </strong>
                <input
                  type="number"
                  name="price"
                  value={productData.price}
                ></input>
              </label>
            </div>

            <div>
              <button type="submit" value="submit" className="jr_btn_success">
                {loading ? "Loading" : "บันทึก"}
              </button>
              <button className="jr_btn_cancel" onClick={ClickEdit}>
                ยกเลิก
              </button>
            </div>
          </DivGrid>
        </form>
      )}

      <hr />
    </div>
  );
};

export default UserProductItems;
