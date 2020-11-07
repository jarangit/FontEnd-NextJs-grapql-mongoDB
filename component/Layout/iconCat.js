import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeadset } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Link from "next/link";

const DIV = styled.div`
  display: grid;
  grid-template-columns: 50% 25% 25%;
  margin: 0 15px;
  .box-item {
    -webkit-box-shadow: 10px 10px 17px -6px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 10px 10px 17px -6px rgba(0, 0, 0, 0.4);
    box-shadow: 10px 10px 17px -6px rgba(0, 0, 0, 0.4);
    background-color: white;
    height: auto;
    margin: 5px;
    height: 300px;
    overflow: hidden;
  }
  .item1 {
    padding: 30px;
    border-radius: 40px;
    h3 {
      color: #268386;
    }
    .box-icon {
      text-align: center;
      display: grid;
      grid-template-columns: repeat(auto-fill, 200px);
      justify-content: space-around;
      div {
        /* width: 120px; */
        margin: 20px;
      }
      img {
        width: 50px;
      }
    }
  }

  .item2 {
    border-radius: 40px;
    img {
      width: 100%;
      display: inline-block;
    }
  }

  .item3 {
    border-radius: 40px;
    img {
      width: 100%;
      display: inline-block;
    }
  }
`;

const QUERY_CAT = gql`
  query {
    productCategories {
      id
      name
    }
  }
`;

const IconCat = () => {
  const { data, loading, error } = useQuery(QUERY_CAT);
  console.log(data);

  if (error)
    return <p>Ooobs...something went wrong, please try again later.</p>;

  if (loading) return <p>Loading...</p>;
  return (
    <DIV>
      <div className="box-item item1">
        <h2> หมวดหมู่สินค้า </h2>
        <div className="box-icon">
          <div>
            {data.productCategories.map((items) => (
              <div>
                <Link
                  href={"/cat_product/[catProID]"}
                  as={`/cat_product/${items.id}`}
                >
                  <a> {items.name} </a>
                </Link>
              </div>
            ))}
          </div>
          {/* <div>
            <img src="https://image.shutterstock.com/image-vector/guitar-vector-icon-600w-632693819.jpg" />
          </div>
          <div>
            <img src="https://image.shutterstock.com/image-vector/guitar-vector-icon-600w-632693819.jpg" />
          </div>
          <div>
            <img src="https://image.shutterstock.com/image-vector/guitar-vector-icon-600w-632693819.jpg" />
          </div>
          <div>
            <img src="https://image.shutterstock.com/image-vector/guitar-vector-icon-600w-632693819.jpg" />
          </div>
          <div>
            <img src="https://image.shutterstock.com/image-vector/guitar-vector-icon-600w-632693819.jpg" />
          </div>
          <div>
            <img src="https://image.shutterstock.com/image-vector/guitar-vector-icon-600w-632693819.jpg" />
          </div> */}
        </div>
      </div>
      <div className="box-item item2">
        <img src="https://www.crushpixel.com/static12/preview2/stock-photo-vector-illustration-party-night-dance-music-poster-template-electro-style-concert-disco-club-festival-event-flyer-invitation-1004328.jpg" />
      </div>
      <div className="box-item item3">
        <img src="https://image.shutterstock.com/image-vector/black-friday-sale-banner-design-600w-1563216475.jpg" />
      </div>
    </DIV>
  );
};

export default IconCat;
