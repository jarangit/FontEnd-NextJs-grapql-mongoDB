import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import apolloClient from "../../apollo/apolloClient";
import styled from "styled-components";
import UseProPage from "../../component/User/userProPage"

const GridSty = styled.div`
    display: grid;
    grid-template-columns: 40% 40% 20%;

    .jr_box_img_pro{
        padding: 20px;
        img{
            width: 100%;
        }
    }

    .jr_box_detail_pro{
        margin: 20px;
        padding: 20px;
        background: rgb(247, 247, 247);
    }
    .jr_box_img_pro_other{
        img{
            width: 100px;
        }
    }
`
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
  } = data.product;
  console.log(user);
  return (
    <div className = "container" >
      <GridSty>
        <div className = "jr_box_img_pro" >
          <img src={imageUrl} alt={description} />
          <div className = "jr_box_img_pro_other" >
            <h3> รูปสินค้าเพิ่มเติม </h3>
            {image_gallery &&
              image_gallery.map((items, index) => (
                <img src={items} key={index}/>
              ))}
          </div>
        </div>

        <div className = "jr_box_detail_pro">
          <h1> {name} </h1>
          <p> รายละเอียด: {description} </p>
          <p> ราคา: {price} </p>
          <p> ที่อยู่: {address} </p>
          <p> เหตุผลที่ขาย: {reason_sell} </p>
          <p> การจัดส่ง: {shipping} </p>
          <p> อายุการใช้งาน: {pd_life} เดือน</p>
          <p> สภาพสินค้า: {integrity} % </p>

          <p>ประเภทสินค้า: {productCategory.name}</p>

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

          <button className = "btn_def"> Add to cart </button>

        </div>
      <UseProPage dataUser = {user} />
      </GridSty>

    </div>
  );
};

export default apolloClient(Products);
