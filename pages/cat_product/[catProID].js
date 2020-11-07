import React from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import Link from "next/link";
import NavBar from "../../component/Layout/navBar";
import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import CatProList from "../../component/CatPro/catProList";
const QUERY_CAT_PRO = gql`
  query QUERY_CAT_PRO($id: ID!) {
    productCategory(id: $id) {
      id
      name
      products {
        name
        id
        description
        price
        imageUrl
        createdAt
      }
    }
  }
`;
const CatProPageID = () => {
  const route = useRouter();

  const { data, loading, error } = useQuery(QUERY_CAT_PRO, {
    variables: { id: route.query.catProID },
  });

  if (error)
    return <p>Ooobs...something went wrong, please try again later.</p>;

  if (loading) return <p>Loading...</p>;

  const { id, name, products } = data.productCategory;
  return (
    <div className = 'container' >
      <h1> {name} </h1>
      <div>
        {data.productCategory.products.map((items) => {
          return <CatProList products={items} />;
        })}
      </div>
    </div>
  );
};

export default CatProPageID;
