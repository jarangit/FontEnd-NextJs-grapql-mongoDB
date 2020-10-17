import React from "react";
import styled from "styled-components";

const Div = styled.div`
  background: #def2f2;
  margin: 20px 0;
  padding: 20px;
  border-radius: 0.9rem;
    h1{
        color:#338E90;
    }
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 10px auto;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  }
  .jr_detail_user{
      border-bottom: 1px solid #A9CEC2;
      display: flex;
      flex-wrap: flex;
      justify-content: space-between;  
      padding: 15px 0;
      }
`;
const UseProPage = (props) => {
  const {
    id,
    name,
    tel,
    address,
    image_profile,
    line_id,
    email,
  } = props.dataUser;
  return (
    <Div>
      <h1> Seller </h1>
      <img src={image_profile} />
      <div className = "jr_detail_user" >
          <div style = {{ color: "#338E90" }} >Name</div>
          <div> {name} </div>
      </div>
      <div className = "jr_detail_user" >
          <div style = {{ color: "#338E90" }} >Email</div>
          <div> {email} </div>
      </div>
      <div className = "jr_detail_user" >
          <div style = {{ color: "#338E90" }} >Line</div>
          <div> {line_id} </div>
      </div>
      <div className = "jr_detail_user" >
          <div style = {{ color: "#338E90" }} >Tel</div>
          <div> {tel} </div>
      </div>
      
    </Div>
  );
};

export default UseProPage;
