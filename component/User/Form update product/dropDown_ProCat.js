import React, { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {QUERY_PRODUCTS_CAT} from '../../Product/createProductFrom_selectCatID'
import { AuthContext } from '../../../appState/authProvider'
import styled from "styled-components";



const Div = styled.div`
    select{
        /* padding: 5px; */
        width: 150px;
        border-radius: 5px;
        margin: 5px 0;
    }
`
const DropDown_ProCat = (props) => {
    useEffect(() => {
        if(props.dataCat){
            setID_CatPro_FromEdit(props.dataCat.id)
        }
    }, [props.dataCat])
    const { data, loading, error } = useQuery(QUERY_PRODUCTS_CAT)
    const { ID_CatPro_FromEdit, setID_CatPro_FromEdit } = useContext(AuthContext)
    const GetID =() => {
        let selector = document.getElementById('CAT_SELECT_ID');
        setID_CatPro_FromEdit(selector[selector.selectedIndex].id);
        console.log( selector[selector.selectedIndex].id)
        console.log("chenged")

    }
    const SetSelect = () => {
        setClick_SEL(true)
    }
    console.log(ID_CatPro_FromEdit)
    return (
        <Div>
            <div>เลือกหมวดหมู่สินค้า</div>
            {data && (
                <select id = "CAT_SELECT_ID" onChange = {GetID}>
                    {props.dataCat && data.productCategories.map(items => {
                        let Val_selectes 
                        if (props.dataCat.name === items.name) {
                            Val_selectes = "selected"
                        }
                        return(
                        <option id = {items.id} value = {items.name} selected= {Val_selectes} > {items.name}   </option>
                        )
                    })}
                </select>
            )}
        </Div>
    )
}

export default DropDown_ProCat
