import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import {QUERY_PRODUCTS_CAT} from '../../Product/createProductFrom_selectCatID'
const DropDown_ProCat = (props) => {
    const { data, loading, error } = useQuery(QUERY_PRODUCTS_CAT)
    console.log(props.dataCat.name)
    return (
        <div>
            <strong>เลือกหมวดหมู่สินค้า</strong>
            {data && (
                <select id = "CAT_SELECT_ID">
                    {data.productCategories.map(items => {
                        let Val_selectes 
                        if (props.dataCat.name === items.name) {
                            Val_selectes = "selected"
                        }
                        return(
                        <option id = {items.id} value = {items.name} selected= {Val_selectes}> {items.name} </option>
                        )
                    })}
                </select>
            )}
        </div>
    )
}

export default DropDown_ProCat
