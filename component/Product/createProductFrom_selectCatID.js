import React, { useState, useEffect, useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../../appState/authProvider'
import styled from "styled-components";

const Div = styled.div`
    select{
        /* padding: 5px; */
        width: 150px;
        border-radius: 5px;
        margin: 5px 0;
    }
`
export const QUERY_PRODUCTS_CAT = gql`
  query{
        productCategories{
            id
            name
            slug
        }
    }
`
const C_ProForm_SELECTID_CAT = () => {
    const { data, loading, error } = useQuery(QUERY_PRODUCTS_CAT)
    const { ID_CatPro_FromC, setID_CatPro_FromC } = useContext(AuthContext)
    const [Click_SEL, setClick_SEL] = useState(false)

    const GetID =() => {
        let selector = document.getElementById('CAT_SELECT_ID');
        setID_CatPro_FromC(selector[selector.selectedIndex].id);
        console.log( selector[selector.selectedIndex].id)

    }
    const SetSelect = () => {
        setClick_SEL(true)
    }
    return (
        <Div>
            <div>
            <strong>เลือกหมวดหมู่สินค้า</strong>
            </div>
            {data && (
                <select id = "CAT_SELECT_ID" onChange = {GetID} onClick = {SetSelect}>
                    {data.productCategories.map(items => {
                        return(
                        <option id = {items.id} onChange = {GetID} value = {items.name} > { !Click_SEL?("เลือกหมวดหมู่สินค้า"):(items.name) } </option>
                        )
                    })}
                </select>
            )}
        </Div>
    )
}

export default C_ProForm_SELECTID_CAT
