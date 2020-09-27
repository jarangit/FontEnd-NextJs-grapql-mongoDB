import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import styled from "styled-components";
import { AuthContext } from "../../appState/authProvider";
import ProductList from "./productList";

const BoxPro = styled.div`
  .jr_card_test{
    display: grid;
    grid-template-columns: repeat(auto-fill, 300px);
    grid-gap: 1.5rem;
    justify-content: center;
    }
`;

export const QUERY_PRODUCTS = gql`
  query {
    products {
      name
      id
      description
      price
      imageUrl
      createdAt
      user {
        id
      }
    }
  }
`;
const ShowAllProduct = () => {
  const { data, loading, error } = useQuery(QUERY_PRODUCTS);

  const { user } = useContext(AuthContext);
  // console.log(user)

  if (error)
    return <p>Ooobs...something went wrong, please try again later.</p>;

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ background: "#f7f7f7", alignItems: "center" }}>
      <div className="container">
        <h1 style={{ textAlign: "center", padding: "100px 0 30px 0" }}>
          {" "}
          PRODUCT{" "}
        </h1>
        <BoxPro>
          <div className="jr_card_test">
            {data.products.map((items) => {
            return <ProductList product={items} />;
          })}
           
          </div>
        </BoxPro>
      </div>
    </div>
  );
};

export default ShowAllProduct;
