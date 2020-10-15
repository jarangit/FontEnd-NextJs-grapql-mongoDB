import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../appState/authProvider";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { ME } from "../User/userProducts";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import Link from "next/link";

const DivGrid = styled.div`
  display: grid;
  grid-template-columns: 10% 60% 15% 15%;
  margin: 20px;
  border-bottom: 1px solid #d3d3d3;
  div {
    align-self: center;
  }
  .pro_list_des {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: gray;
  }
  button{
    width: 100px;
  }
`;

const DELETE_CART = gql`
  mutation DELETE_CART($id: ID!) {
    deleteCart(id: $id) {
      id
    }
  }
`;

const UserCartItem = () => {
  const { user, setAuthUser } = useContext(AuthContext);
  const { data } = useQuery(ME);

  useEffect(() => {
    if (data) {
      setAuthUser(data.user);
    }
  }, [data]);

  const [deleteCart, { loading, error }] = useMutation(DELETE_CART, {
    onCompleted: (data) => {
      console.log(data);
    },
    refetchQueries: [{ query: ME }],
  });

  const handelAddToCart = async (id) => {
    console.log(id);
    await deleteCart({ variables: { id } });
  };

  return (
    <div className="container">
      {user &&
        user.carts.map((items) => (
          <DivGrid key={items.id}>
            <div>
              <img src={items.product.imageUrl} width="100" />
            </div>
            <div>
              <Link
                href="/products/[prodoctID]"
                as={`/products/${items.product.id}`}
              >
                <a className="link_def">
                  <strong> {items.product.name} </strong>
                </a>
              </Link>
              <div className="pro_list_des">{items.product.description}</div>
            </div>
            <div>
              <p>
                <NumberFormat
                  thousandSeparator={true}
                  housandsGroupStyle="lakh"
                  displayType="text"
                  prefix={"฿"}
                  value={items.product.price}
                />
              </p>
            </div>
            <div>
              <button
                className="jr_btn_cancel"
                onClick={() => handelAddToCart(items.id)}
              >
                ลบ
              </button>
            </div>
          </DivGrid>
        ))}
    </div>
  );
};

export default UserCartItem;
