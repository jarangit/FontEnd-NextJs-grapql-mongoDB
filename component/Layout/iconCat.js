import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faHeadset } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const DIV = styled.div`
  display: grid;
  /* grid-gap: 10px; */
  grid-template-columns: 50% 25% 25%;
  margin: 0 15px;
  .box-item {
    -webkit-box-shadow: 10px 10px 17px -6px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 10px 10px 17px -6px rgba(0, 0, 0, 0.4);
    box-shadow: 10px 10px 17px -6px rgba(0, 0, 0, 0.4);
    background-color: white;
    padding: 30px;
    height: auto;
    margin: 5px;

  }
  .item1 {
    border-radius: 40px;
    .box-icon{
        text-align: center;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        div{
            width: 120px;
            margin: 20px;
        }
    }
  }

  .item2 {
    border-radius: 40px;
    img{
        width: 100%;
    }
  }

  .item3 {
    border-radius: 40px;
  }
`;
const IconCat = () => {
  return (
    <DIV>
      <div className="box-item item1">
        <h3> หมวดหมู่สินค้า </h3>
        <div className = "box-icon" >
          <div>
            <FontAwesomeIcon icon={faHeadset} size="3x" color="#ff00aa" />
          </div>
          <div>
            <FontAwesomeIcon icon={faHeadset} size="3x" color="#ff00aa" />
          </div>
          <div>
            <FontAwesomeIcon icon={faHeadset} size="3x" color="#ff00aa" />
          </div>
          <div>
            <FontAwesomeIcon icon={faHeadset} size="3x" color="#ff00aa" />
          </div>
          <div>
            <FontAwesomeIcon icon={faHeadset} size="3x" color="#ff00aa" />
          </div>
          <div>
            <FontAwesomeIcon icon={faHeadset} size="3x" color="#ff00aa" />
          </div>
        </div>
      </div>
      <div className="box-item item2">
          <img src = "https://res.cloudinary.com/the-guitar-next/image/upload/v1601388092/the-guitar-next/rbgwoc2wcfcue1b0mmlj.jpg" />
      </div>
      <div className="box-item item3">โฆษณา</div>
    </DIV>
  );
};

export default IconCat;
