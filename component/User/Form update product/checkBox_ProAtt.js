import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export const QUERY_PRODUCTS_ATT = gql`
  query{
  productAttributes{
    id
    name
    pd_options_attrs{
      id
      opVal
      parentName
    }
  }
}
`
const CheckBox_ProAtt = (props) => {
    const { data, loading, error } = useQuery(QUERY_PRODUCTS_ATT)

    const ob_to_arr = Object.values(props.dataAtt)
    console.log(ob_to_arr);

    return (
        <div style = {{ border: "1px solid red" }}>
            <strong> เลือกคุณสมบัติ </strong>
            {data && (
                <form id = "Sel_Pro_Att" onSubmit = "return false">
                    {data.productAttributes.map(items => (
                        <div>
                            <h3> {items.name} </h3>
                                {items.pd_options_attrs.map(subItems => {
                                    let CheckID = false
                                            {props.dataAtt.map(itemsMain => {
                                                if ( itemsMain.id === subItems.id ){
                                                    CheckID = true
                                                }
                                            })}  
                                    return(
                                        <div>
                                            <input id = {subItems.id} type="checkbox" name="vehicle1" defaultChecked = {CheckID} />
                                            <label> {subItems.opVal} </label>
                                        </div>
                                    )
                
                                })}
                        </div>
                    ))}
                </form>
            )}
        </div>
    )
}

export default CheckBox_ProAtt
