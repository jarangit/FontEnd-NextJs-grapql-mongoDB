import React from "react";
import styled from "styled-components";

const DIV = styled.div`

  height: 350px;
  display: grid;
  grid-template-columns: 75% auto;
  /* grid-gap: 20px; */
  .home_banner_box{
    -webkit-box-shadow: 10px 10px 17px -6px rgba(0, 0, 0, 0.4);
    -moz-box-shadow: 10px 10px 17px -6px rgba(0, 0, 0, 0.4);
    box-shadow: 10px 10px 17px -6px rgba(0, 0, 0, 0.4);
    border-radius: 40px;

  }
  .home_banner_item1 {
    background: red;
    margin: 20px;
    overflow: hidden;

  }
  .home_banner_item2{
    margin:20px 20px 20px 0;
    background: white;
    overflow: hidden;
    padding: 30px;
  }
`;
const HomeBanner = () => {
  return (
    <DIV>
      <div className="home_banner_box home_banner_item1">
        
        <img src= "https://image.shutterstock.com/image-vector/vector-summer-electro-music-festival-600w-1368008816.jpg" width = "100%"/>
      </div>
      <div className = "home_banner_box home_banner_item2" >
          <h1> ลงประกาศขายฟรี !! </h1>
      </div>
    </DIV>
  );
};

export default HomeBanner;
