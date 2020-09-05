import React, { useState, useEffect, useContext } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { AuthContext } from '../../appState/authProvider'


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
const C_ProForm_SELECTID_ATT = (props) => {
    const { data, loading, error } = useQuery(QUERY_PRODUCTS_ATT)
    const { ID_ATTPro_FromC, setID_ATTPro_FromC } = useContext(AuthContext)
    const [Click_SEL, setClick_SEL] = useState(false)
    // console.log(ID_ATTPro_FromC)


    const GetID =() => {
       const findIdAtt =  ID_ATTPro_FromC.find(e => e === event.target.id )
       if(findIdAtt){
        setID_ATTPro_FromC(ID_ATTPro_FromC.filter((e)=>(e !== event.target.id)))

       }else {
           let idAAtt = event.target.id
           setID_ATTPro_FromC(id => [...id, `${idAAtt}`])
       }
        console.log(ID_ATTPro_FromC)
    }
   
    return (
        <div style = {{ border: "1px solid red" }}>
            <strong> เลือกคุณสมบัติ </strong>
            {data && (
                <form id = "Sel_Pro_Att" onSubmit = "return false">
                    {data.productAttributes.map(items => (
                        <div>
                            <h3> {items.name} </h3>
                                {items.pd_options_attrs.map(subItems => (
                                    <div>
                                        <input id = {subItems.id} type="checkbox" name="vehicle1" onClick = {GetID}/>
                                        <label> {subItems.opVal} </label>
                                    </div>
                                ))}
                        </div>
                    ))}
                </form>
            )}
        </div>
    )
}

export default C_ProForm_SELECTID_ATT
