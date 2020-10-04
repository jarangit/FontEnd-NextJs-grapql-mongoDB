import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import apolloClient from "../../apollo/apolloClient";
import styled from "styled-components";
import UseProPage from "../../component/User/userProPage";
import WarningBox from "../../component/Layout/warningBox";
import Link from "next/link";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import ProImageGallery from "../../component/Product/proImageGallery";
import NavBar from "../../component/Layout/navBar";

const GridSty = styled.div`
  display: grid;
  grid-template-columns: 40% 40% 20%;
  position: relative;
  a {
    color: rgb(51, 142, 144);
  }
  .jr_box_img_pro {
    padding: 20px;
    img {
      width: 100%;
    }
  }

  .jr_box_detail_pro {
    border-radius: 0.9rem;
    margin: 20px;
    padding: 20px;
    background: rgb(247, 247, 247);
  }
  .jr_box_img_pro_other {
    img {
      width: 100px;
    }
  }
  .items5 {
    grid-column: 2 / 4;
  }
  .items4,
  .items5 {
    border-top: 1px solid #e2e2e2;
  }
  .priceBox {
    display: flex;
    justify-content: space-between;
    div {
      font-size: 30px;
      color: #ff6d6d;
    }
    button {
      padding: 5px 50px;
    }
  }
`;
export const QUERY_PRODUCT = gql`
  query QUERY_PRODUCT($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      imageUrl
      image_gallery
      address
      reason_sell
      shipping
      pd_life
      integrity
      productCategory {
        id
        name
      }
      user {
        id
        name
        email
        address
        tel
        line_id
        image_profile
      }
      pd_options_attr {
        id
        name
        opVal
        parentName
      }
    }
  }
`;
const Products = () => {
  const route = useRouter();
  const { data, loading, error } = useQuery(QUERY_PRODUCT, {
    variables: { id: route.query.productID },
  });

  if (error)
    return <p>Ooobs...something went wrong, please try again later.</p>;

  if (loading) return <p>Loading...</p>;
  console.log(data.product);

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
    user,
    createdAt,
  } = data.product;
  console.log(user);
  return (
    <div className="container">
      <NavBar
        data={[
          {
            slug: "สินค้า",
            url: "products",
          },
          {
            slug: productCategory.name,
            url: "products",
          },
        ]}
      />
      <GridSty>
        <div className="jr_box_img_pro">
          <ProImageGallery imageUrl={imageUrl} image_gallery={image_gallery} />

          {/* <img src={imageUrl} alt={description} />
          <div className="jr_box_img_pro_other">
            <h3> รูปสินค้าเพิ่มเติม </h3>
            {image_gallery &&
              image_gallery.map((items, index) => (
                <img src={items} key={index} />
              ))}
          </div> */}
        </div>

        <div className="jr_box_detail_pro">
          <h1> {name} </h1>
          <p>
            {" "}
            <strong>รายละเอียด:</strong> {description}{" "}
          </p>
          <p>
            {" "}
            <strong>เหตุผลที่ขาย:</strong> {reason_sell}{" "}
          </p>
          <p>
            <strong>ประเภทสินค้า:</strong>
            <Link href="#">
              <a> {productCategory.name}</a>
            </Link>
          </p>
          <p style={{ color: "gray" }}>
            วันที่ลงขาย: <Moment format="YYYY/MM/DD">{createdAt}</Moment>
          </p>

          <div className="priceBox">
            <div>
              ราคา:
              <NumberFormat
                thousandSeparator={true}
                housandsGroupStyle="lakh"
                displayType="text"
                prefix={"฿"}
                value={price}
              />
            </div>
            <button className="btn_def"> เพิ่มไปยังรายการโปรด </button>
          </div>
          <hr></hr>
        </div>
        <UseProPage dataUser={user} />
        <div className="items4">
          <div>
            <h3>รายละเอียดสินค้า</h3>
            <p> {description} </p>
            <h3>ที่อยู่</h3>
            <p> {address} </p>
            <h3>การจัดส่ง</h3>
            <p> {shipping} </p>
            <h3>อายุการใช้งาน</h3>
            <p> {pd_life} </p>
            <h3>สภาพสินค้า</h3>
            <p> {integrity} </p>
          </div>
          <div>
            <h3> คุณสมบัติ </h3>
            {pd_options_attr.map((items) => {
              console.log(items);
              return (
                <div>
                  <p>
                    <strong> {items.parentName}: </strong> {items.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="items5">
          <WarningBox />
        </div>
      </GridSty>
    </div>
  );
};

export default apolloClient(Products);
