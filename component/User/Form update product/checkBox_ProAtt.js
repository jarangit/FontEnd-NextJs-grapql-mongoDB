import React, { useState, useContext, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { QUERY_PRODUCTS_ATT } from '../../Product/createProductFrom_selectAtt'
import { AuthContext } from '../../../appState/authProvider'
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
const CheckBox_ProAtt = (props) => {
    const { data, loading, error } = useQuery(QUERY_PRODUCTS_ATT)
    const { ID_ATTPro_FromEdit, setID_ATTPro_FromEdit } = useContext(AuthContext)
    const [IDAtt, setIDAtt] = useState([])


    useEffect(() => {
        //เซ็คค่า attt เดิมให้ state ใช้เผื่อ เวลาไม่มีการเปลี่ยนแปลงค่า att ก็ใช่ค่าเพิ่ม ทำการ updata product
        if(props.dataAtt){
            setID_ATTPro_FromEdit(props.dataAtt.filter(item => !!item.id).map(e => `${e.id}`));
        }
        }, [props.dataAtt])



        const GetID =() => {
            const findIdAtt =  ID_ATTPro_FromEdit.find(e => e === event.target.id )
            if(findIdAtt){
                setID_ATTPro_FromEdit(ID_ATTPro_FromEdit.filter((e)=>(e !== event.target.id)))
    
            }else {
                let idAAtt = event.target.id
                setID_ATTPro_FromEdit(id => [...id, `${idAAtt}`])
            }
        }

    return (
        <Div>
            <strong> เลือกคุณสมบัติ </strong>
            {data && (
                <form id = "Sel_Pro_Att" onSubmit = "return false">
                    {data.productAttributes.map(items => (
                        <div>
                            <h3> {items.name} </h3>
                                {items && items.pd_options_attrs.map((subItems, index) => {
                                    let CheckID = false
                                            {props.dataAtt && props.dataAtt.map(itemsMain => {
                                                if ( itemsMain.id === subItems.id ){
                                                    CheckID = true
                                                }
                                            })}  
                                    return(
                                        <>
                                            <input id = {subItems.id} type="checkbox" name="vehicle1" defaultChecked = {CheckID} onClick = {GetID}/>
                                            <label> {subItems.opVal} </label>
                                        </>
                                    )
                
                                })}
                        </div>
                    ))}
                </form>
            )}
        </Div>
    )
}

export default CheckBox_ProAtt
