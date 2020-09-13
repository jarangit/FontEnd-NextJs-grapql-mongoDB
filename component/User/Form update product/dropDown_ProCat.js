import React, { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import {QUERY_PRODUCTS_CAT} from '../../Product/createProductFrom_selectCatID'
import { AuthContext } from '../../../appState/authProvider'

const DropDown_ProCat = (props) => {
    useEffect(() => {
        setID_CatPro_FromEdit(props.dataCat.id)
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
        <div>
            <strong>เลือกหมวดหมู่สินค้า</strong>
            {data && (
                <select id = "CAT_SELECT_ID" onChange = {GetID}>
                    {data.productCategories.map(items => {
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
        </div>
    )
}

export default DropDown_ProCat
