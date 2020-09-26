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

///---- Sty

const Div = styled.div`
  width: 300px;
  display: flex;
  flex-wrap: wrap;
  .jr_card_pro{
    border: solid 2px rgba(109, 132, 138,0.3); ;
    /* border-color: #566068; */
    margin: 15px 10px;
    padding-bottom: 20px;
  }
  div {
    /* background: white; */
    text-align: center;
    .a_pro_name {
      color: #566068;
      text-decoration: none;
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
  const cartProductId = user && user.carts.map((items) => items.product.id);
  let buttomy;
  console.log(cartProductId);

  if (user && cartProductId.includes(product.id)) {
    buttomy = <button>carted </button>;
  } else if (user && user.id === product.user.id) {
    buttomy = (
      <button onClick={() => Router.push("/myproducts")}> Your Product </button>
    );
  } else {
    buttomy = (
      <button
        style={{ background: "green" }}
        onClick={() => handelAddToCart(product.id)}
      >
        {" "}
        add to cart{" "}
      </button>
    );
  }

  console.log(user);
  useEffect(() => {
    if (data) {
      setAuthUser(data.user);
    }
  }, [data]);

  // var dateCreatedAt = new DateObject(product.createdAt);

  return (
    <Div>
      <div key={product.id } className = "jr_card_pro">
        <div className="box_img_def">
          <img src={product.imageUrl} width="100%" />
        </div>
        <Link href="/products/[prodoctID]" as={`/products/${product.id}`}>
          <a className="a_pro_name">
            <h3>{product.name}</h3>
          </a>
        </Link>
        <p>
          ราคา:
          <NumberFormat
            thousandSeparator={true}
            housandsGroupStyle="lakh"
            displayType="text"
            prefix={"฿"}
            value={product.price}
          />
        </p>

        <p>
          วันที่ลงขาย: <Moment format="YYYY/MM/DD">{product.crea}</Moment>
        </p>

        <div>
          <Link href="/products/[prodoctID]" as={`/products/${product.id}`}>
            <a className="btn_def">ข้อมูลเพิ่มเติม</a>
          </Link>
        </div>
      </div>
    </Div>
  );
};

export default ProductList;
