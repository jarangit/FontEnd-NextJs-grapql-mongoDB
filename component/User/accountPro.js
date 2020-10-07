import React from "react";
import styled from "styled-components";
import Link from "next/link";
import NumberFormat from "react-number-format";
import Moment from "react-moment";

const DivGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 10px;
  div {
    border-radius: 20px;
    background: white;
    padding: 20px;
    tr {
      text-align: left;
    }
    table,
    td,
    th {
      width: 100%;
      border-bottom: 1px solid #d3d3d3;
      border-collapse: collapse;
      padding: 10px;
      a {
        color: #566068;
        text-decoration: none;
        :hover {
          color: #00b38f;
        }
      }
    }
    .accountPro_name_pro {
      /* white-space: nowrap; */
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
const AccountPro = (props) => {
  if (props.dataFav.length == 0) {
    console.log("no");
  }
  console.log(props.dataFav.length);
  return (
    <DivGrid className="container">
      <div>
        <h1> สินค้าของคุณ </h1>
        <table>
          <tr>
            <th>ชื่อ</th>
            <th>ราคา</th>
            <th>วันที่</th>
          </tr>
          {props.dataPro.map((items) => (
            <tr>
              <td>
                <Link
                  href="/user_products/[prodoctID]"
                  as={`/user_products/${items.id}`}
                >
                  <a>{items.name}</a>
                </Link>
              </td>
              <td>
                <NumberFormat
                  thousandSeparator={true}
                  housandsGroupStyle="lakh"
                  displayType="text"
                  prefix={"฿"}
                  value={items.price}
                />
              </td>
              <td>
                <Moment format="YYYY/MM/DD">{items.createdAt}</Moment>
              </td>
            </tr>
          ))}
        </table>
      </div>

      <div  >
        <h1> สินค้าที่ชื่นชอบ </h1>
        {props.dataFav.length !== 0 ? (
          <table>
            <tr>
              <th>ชื่อ</th>
              <th>ราคา</th>
              <th>วันที่</th>
            </tr>
            <>
              {props.dataFav.map((items) => (
                <tr>
                <td>
                <Link
                  href="/products/[prodoctID]"
                  as={`/products/${items.product.id}`}
                >
                  <a>{items.product.name}</a>
                </Link>
              </td>
              <td>
                <NumberFormat
                  thousandSeparator={true}
                  housandsGroupStyle="lakh"
                  displayType="text"
                  prefix={"฿"}
                  value={items.product.price}
                />
              </td>
              <td>
                <Moment format="YYYY/MM/DD">{items.product.createdAt}</Moment>
              </td>
                </tr>
              ))}
            </>
          </table>
        ) : (
          <h3 style = {{ color: "red" }} >ไม่มีสินค้า</h3>
        )}
      </div>
    </DivGrid>
  );
};

export default AccountPro;
