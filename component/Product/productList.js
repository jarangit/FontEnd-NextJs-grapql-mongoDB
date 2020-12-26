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
library.add(fas, fab, far);

///---- Sty

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

  .pro_list_box_img{
      width: 100px;
      height: 100px;
      overflow: hidden;
      img{
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

//-------

const ADDTOCART = gql`
  mutation ADDTOCART($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
      product {
        id
        name
        imageUrl
        price
        description
      }
    }
  }
`;
const ProductList = ({ product }) => {
  const { user, setAuthUser } = useContext(AuthContext);
  const { data } = useQuery(ME);

  const [addToCart, { loading, error }] = useMutation(ADDTOCART, {
    onCompleted: (data) => {
      console.log(data);
    },
    refetchQueries: [{ query: ME }],
  });

  const handelAddToCart = async (id) => {
    if (!user) {
      return Router.push("/register/signIn");
    }
    console.log(id);
    await addToCart({ variables: { id } });
  };
  const cartProductId = user && user.fav_products.map((items) => items.product.id);
  let buttomy;

  if (user && cartProductId.includes(product.id)) {
    buttomy = (
      <div className="icon_heart">
        <FontAwesomeIcon icon={["fas", "heart"]} color="#ff6d6d" />
      </div>
    );
  } else if (user && user.id === product.user.id) {
    buttomy = (
      <Link
        href="/user_products/[prodoctID]"
        as={`/user_products/${product.id}`}
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

  useEffect(() => {
    if (data) {
      setAuthUser(data.user);
    }
  }, [data]);

  // var dateCreatedAt = new DateObject(product.createdAt);

  return (
    <Div>
      <div className = "pro_list_box_img">
        <img src={product.imageUrl}/>
      </div>
      <div>
        <Link href="/products/[prodoctID]" as={`/products/${product.id}`}>
          <a className="a_pro_name">
            <strong>{product.name}</strong>
          </a>
        </Link>
        <div className="pro_list_des">{product.description}</div>
      </div>
      <div className = "jr_text_center" >
      {buttomy}

      </div>
      <div className = "jr_text_center" style={{  color: "#ff6d6d" }}>
        <p style={{ fontSize: "16px", color: "black" }}>ราคา</p>
        <strong>
        <NumberFormat
          thousandSeparator={true}
          housandsGroupStyle="lakh"
          displayType="text"
          prefix={"฿"}
          value={product.price}
        />
        </strong>
      </div>
      <div className = "jr_text_center">
        <p>วันที่ลงขาย</p>
        <Moment format="YYYY/MM/DD">{product.createdAt}</Moment>

      </div>
      {/* <div key={product.id} className="jr_card_pro">
        <div className="box_img_def">
          <img src={product.imageUrl} width="100%" />
          <FontAwesomeIcon icon={["far", "heart"]} size="1x" />
        </div>
        <div style={{ height: "50px", overflow: "hidden", margin: "10px 0" }}>
          <Link href="/products/[prodoctID]" as={`/products/${product.id}`}>
            <a className="a_pro_name">
              <strong>{product.name}</strong>
            </a>
          </Link>
        </div>
        <div style={{ fontSize: "25px", color: "#ff6d6d" }}>
          <NumberFormat
            thousandSeparator={true}
            housandsGroupStyle="lakh"
            displayType="text"
            prefix={"฿"}
            value={product.price}
          />
        </div>

        <div style={{ color: "gray" }}>
          วันที่ลงขาย: <Moment format="YYYY/MM/DD">{product.createdAt}</Moment>
        </div>

        {buttomy}
      </div> */}
    </Div>
  );
};

export default ProductList;
