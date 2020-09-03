import React, { useState, useEffect, useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../../appState/authProvider'


export const QUERY_PRODUCTS_CAT = gql`
  query{
        productCategories{
            id
            name
            slug
        }
    }
`
const CreateProductFrom_selectCatID = () => {
    const { data, loading, error } = useQuery(QUERY_PRODUCTS_CAT)
    const { ID_CatPro_FromC, setID_CatPro_FromC } = useContext(AuthContext)
    const [Click_SEL, setClick_SEL] = useState(false)
    console.log(ID_CatPro_FromC)


    const GetID =() => {
        let selector = document.getElementById('CAT_SELECT_ID');
        setID_CatPro_FromC(selector[selector.selectedIndex].id);
        console.log( selector[selector.selectedIndex].id)

    }
    const SetSelect = () => {
        setClick_SEL(true)
    }
    return (
        <div>
            {data && (
                <select id = "CAT_SELECT_ID"onChange = {GetID} onClick = {SetSelect}>
                    {data.productCategories.map(items => {
                        return(
                        <option id = {items.id} onChange = {GetID} value = {items.name} > { !Click_SEL?("เลือกหมวดหมู่สินค้า"):(items.name) } </option>
                        )
                    })}
                </select>
            )}
            ID : {ID_CatPro_FromC}
        </div>
    )
}

export default CreateProductFrom_selectCatID
