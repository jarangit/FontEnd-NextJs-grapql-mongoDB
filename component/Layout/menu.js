import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "../../appState/authProvider";
import styled from "styled-components";
import Router from "next/router";

const MenuSyt = styled.div`
  width: 15%;
  background: white;
  /* justify-content: space-between; */
  /* height: 100px; */
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;

  padding: 20px;
  h1 {
    color: #268386;
    text-align: center;
    margin: 30px 0;
  }
  a {
    color: #566068;
    text-decoration: none;
    :hover {
      color: #00b38f;
    }
  }
  ul {
    padding: 0px;
    /* padding: 0 0 0 20px; */
    align-items: center;
    li {
      margin: 20px 0;
      list-style: none;
    }
    .email-user {
      a {
        color: #8e69d0;
        :hover {
          text-decoration: underline;
          text-decoration-color: #8e69d0;
          transition: 0.3s;
        }
      }
    }
  }
`;
const Menu = () => {
  const { user, Signout } = useContext(AuthContext);

  console.log(user);
  return (
    <MenuSyt>
      <Link href="/">
        <a>
          {" "}
          <h1>GUITAR NEXT</h1>{" "}
        </a>
      </Link>
      <ul>
        <li>
          <a href="/" key="home">
            หน้าแรก
          </a>
        </li>
        <li>
          <a href="/products" key="product">
            {" "}
            สินค้า{" "}
          </a>
        </li>
        {user && (
          <>
            <li>
              <a href="/cart_items"> รายการที่ชื่นชอบ </a>
            </li>
            <li>
              <a href="/user_products">สินค้าของคุณ</a>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <Link href="/register/signUp">
                <a> สมัครสมาชิก </a>
              </Link>
            </li>
            <li>
              <Link href="/register/signIn">
                <a> เข้าสู่ระบบ </a>
              </Link>
            </li>
          </>
        )}
      </ul>
      <div>
        text bottom
      </div>
    </MenuSyt>
  );
};
export default Menu;
