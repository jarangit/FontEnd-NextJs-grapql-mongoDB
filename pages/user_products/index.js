import React from "react";
import UserProducts from "../../component/User/userProducts";
import Link from "next/link";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const MyProducts = () => {
  return (
    <div className="container">
      <div style = {{ margin: "50px 0" }} >
        <Link href="/create_product">
          <a style={{ textDecoration: "none" }} className="jr_btn_add">
            <FontAwesomeIcon
              icon={["fas", "cloud-upload-alt"]}
              color="#00d8d5"
            />
            <strong style={{ margin: "0 10px" }}>เพิ่มสินค้า</strong>
          </a>
        </Link>
      </div>
      <UserProducts />
    </div>
  );
};

export default MyProducts;
