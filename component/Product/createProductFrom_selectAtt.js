import React, { useState, useEffect, useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../appState/authProvider";
import styled from "styled-components";

const Div = styled.div`
  form {
      margin: 10px 0;
    input,
    label {
      display: inline-block;
    }
    input {
      margin: 0 5px 0 0;
    }
    label {
      margin: 0 15px 0 0;
    }
  }
`;

export const QUERY_PRODUCTS_ATT = gql`
  query {
    productAttributes {
      id
      name
      pd_options_attrs {
        id
        opVal
        parentName
      }
    }
  }
`;
const C_ProForm_SELECTID_ATT = (props) => {
  const { data, loading, error } = useQuery(QUERY_PRODUCTS_ATT);
  const { ID_ATTPro_FromC, setID_ATTPro_FromC } = useContext(AuthContext);
  const [Click_SEL, setClick_SEL] = useState(false);
  // console.log(ID_ATTPro_FromC)

  const GetID = () => {
    const findIdAtt = ID_ATTPro_FromC.find((e) => e === event.target.id);
    if (findIdAtt) {
      setID_ATTPro_FromC(ID_ATTPro_FromC.filter((e) => e !== event.target.id));
    } else {
      let idAAtt = event.target.id;
      setID_ATTPro_FromC((id) => [...id, `${idAAtt}`]);
    }
    console.log(ID_ATTPro_FromC);
  };

  return (
    <Div>
      {data && (
        <form id="Sel_Pro_Att" onSubmit="return false">
          <strong> เลือกคุณสมบัติ </strong>
          {data.productAttributes.map((items) => (
            <div style={{ marginLeft: "10px" }}>
              <div>
                <strong>{items.name}</strong>
              </div>
              {items.pd_options_attrs.map((subItems) => (
                <>
                  <input
                    id={subItems.id}
                    type="checkbox"
                    name="vehicle1"
                    onClick={GetID}
                  />
                  <label> {subItems.opVal} </label>
                </>
              ))}
            </div>
          ))}
        </form>
      )}
    </Div>
  );
};

export default C_ProForm_SELECTID_ATT;
