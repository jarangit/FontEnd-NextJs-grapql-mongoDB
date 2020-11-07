import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { AuthContext } from "../../appState/authProvider";
import styled from "styled-components";
import Router from "next/router";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { ME } from "../User/userProducts";
import { useQuery } from "@apollo/react-hooks";
import NumberFormat from "react-number-format";
import Moment from "react-moment";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Div = styled.div`
  display: grid;
  grid-template-columns: 10% 60% 10% 10% 10%;
  border-bottom: 1px solid #d3d3d3;
  padding: 20px;
  .pro_list_des {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: gray;
  }

  .pro_list_box_img {
    width: 100px;
    height: 100px;
    overflow: hidden;
    img {
      width: 100px;
    }
  }

  table {
    width: 100%;
  }
  table,
  th,
  td {
    border-collapse: collapse;
    border: 1px solid black;
  }
  .jr_card_pro {
    border: solid 2px rgba(109, 132, 138, 0.3);
    margin: 15px 10px;
    padding-bottom: 20px;
  }
  div {
    align-self: center;
    .a_pro_name {
      color: #566068;
      text-decoration: none;
      :hover {
        color: #a9cec2;
      }
    }
  }
  .icon_heart {
    font-size: 20px;
    svg:hover {
      color: #ff6d6d;
    }
  }
`;

const CatProList = (props) => {
  console.log(props.data);
  const { user, setAuthUser } = useContext(AuthContext);

  const { id, name, description, price, imageUrl, createdAt } = props.products;


  let buttomy;

  if (user && cartProductId.includes(id)) {
    buttomy = (
      <div className="icon_heart">
        <FontAwesomeIcon icon={["fas", "heart"]} color="#ff6d6d" />
      </div>
    );
  } else if (user && user.id === product.user.id) {
    buttomy = (
      <Link
        href="/user_products/[productID]"
        as={`/user_products/${id}`}
      >
        <a className="a_blue">สินค้าของคุณ</a>
      </Link>
    );
  } else {
    buttomy = (
      <div className="icon_heart" onClick={() => handelAddToCart(product.id)}>
        <FontAwesomeIcon icon={["far", "heart"]} color="gray" />
      </div>
    );
  }
  return (
    <Div>
      <div className="pro_list_box_img">
        <img src={imageUrl} />
      </div>
      <div>
        <Link href="/products/[prodoctID]" as={`/products/${id}`}>
          <a className="a_pro_name">
            <strong>{name}</strong>
          </a>
        </Link>
        <div className="pro_list_des">{description}</div>
      </div>
      <div className="jr_text_center">{buttomy}</div>
      <div className="jr_text_center" style={{ color: "#ff6d6d" }}>
        <p style={{ fontSize: "16px", color: "black" }}>ราคา</p>
        <strong>
          <NumberFormat
            thousandSeparator={true}
            housandsGroupStyle="lakh"
            displayType="text"
            prefix={"฿"}
            value={price}
          />
        </strong>
      </div>
      <div className="jr_text_center">
        <p>วันที่ลงขาย</p>
        <Moment format="YYYY/MM/DD">{createdAt}</Moment>
      </div>
    </Div>
  );
};

export default CatProList;
